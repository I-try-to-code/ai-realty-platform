import { Router, Response } from "express";
import { prisma } from "../db";
import { authenticateToken, authorizeRoles, AuthRequest } from "../middlewares/auth";
import { PropertyStatus, PropertyType, ListingType } from "@prisma/client";

const router = Router();

/**
 * GET /api/properties
 * Retrieve all properties (public access) with optional filters
 */
router.get("/", async (req, res) => {
  const { status, type, city } = req.query;

  try {
    const filter: any = {};

    // Filter by listing status
    if (status) {
      filter.status = status as PropertyStatus;
    } else {
      // By default, public search only shows ACTIVE properties
      filter.status = PropertyStatus.ACTIVE;
    }

    // Filter by type (APARTMENT, VILLA, etc.)
    if (type) {
      filter.propertyType = type as PropertyType;
    }

    // Filter by city (using Locality join)
    if (city) {
      filter.locality = {
        city: {
          contains: city as string,
          mode: "insensitive"
        }
      };
    }

    const properties = await prisma.property.findMany({
      where: filter,
      include: {
        locality: true,
        media: true,
        amenities: {
          include: {
            amenity: true
          }
        },
        agents: {
          include: {
            subagent: {
              select: { id: true, name: true, email: true, phone: true }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    return res.json(properties);
  } catch (error) {
    console.error("[properties get error]", error);
    return res.status(500).json({ error: "Failed to retrieve properties." });
  }
});

/**
 * GET /api/properties/:id
 * Retrieve details for a single property
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const property = await prisma.property.findUnique({
      where: { id },
      include: {
        locality: true,
        media: true,
        amenities: {
          include: {
            amenity: true
          }
        },
        agents: {
          include: {
            subagent: {
              select: { id: true, name: true, email: true, phone: true }
            }
          }
        }
      }
    });

    if (!property) {
      return res.status(404).json({ error: "Property not found." });
    }

    return res.json(property);
  } catch (error) {
    console.error("[property get id error]", error);
    return res.status(500).json({ error: "Failed to retrieve property details." });
  }
});

/**
 * POST /api/properties
 * Add a new property (Restricted to SUBAGENT)
 */
router.post("/", authenticateToken, authorizeRoles("SUBAGENT"), async (req: AuthRequest, res: Response) => {
  const {
    title,
    description,
    price,
    address,
    localityId,
    propertyType,
    listingType,
    mediaUrls,
    amenityIds
  } = req.body;

  const agentId = req.user!.id;

  if (!title || !price || !propertyType || !listingType) {
    return res.status(400).json({ error: "Title, price, propertyType, and listingType are required fields." });
  }

  try {
    // 1. Create the Property
    const property = await prisma.property.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        address,
        localityId,
        status: PropertyStatus.PENDING_APPROVAL, // Default status for moderation
        propertyType: propertyType as PropertyType,
        listingType: listingType as ListingType,
        isVerified: false,
        // Map agents (many-to-many) in the same call
        agents: {
          create: {
            subagentId: agentId,
            primaryAgent: true
          }
        },
        // Map media files
        media: mediaUrls ? {
          createMany: {
            data: mediaUrls.map((url: string, index: number) => ({
              fileName: `media_${index + 1}.jpg`,
              fileType: "image/jpeg",
              url
            }))
          }
        } : undefined,
        // Map amenities
        amenities: amenityIds ? {
          createMany: {
            data: amenityIds.map((id: string) => ({
              amenityId: id
            }))
          }
        } : undefined
      }
    });

    return res.status(201).json({
      message: "Property created successfully and sent for approval!",
      property
    });
  } catch (error) {
    console.error("[property create error]", error);
    return res.status(500).json({ error: "Failed to create property." });
  }
});

/**
 * PUT /api/properties/:id/status
 * Moderate a property (Restricted to ADMIN)
 */
router.put("/:id/status", authenticateToken, authorizeRoles("ADMIN"), async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status } = req.body; // e.g. ACTIVE or REJECTED

  if (!status || !Object.values(PropertyStatus).includes(status)) {
    return res.status(400).json({ error: "Invalid status value." });
  }

    try {
      const updatedProperty = await prisma.property.update({
        where: { id },
        data: {
          status: status as PropertyStatus,
          approvedBy: req.user!.email,
          approvedAt: status === PropertyStatus.ACTIVE ? new Date() : null
        }
      });

    return res.json({
      message: `Property status updated to ${status}!`,
      property: updatedProperty
    });
  } catch (error) {
    console.error("[property moderate error]", error);
    return res.status(500).json({ error: "Failed to moderate property." });
  }
});

export default router;
