import { PrismaClient, Role, PropertyStatus, PropertyType, ListingType, LeadStatus, MessageSenderType, KYCStatus } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding production database...");

  // Clean existing data in reverse order of dependencies
  await prisma.refreshToken.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.kYCVerification.deleteMany();
  await prisma.propertyRecommendation.deleteMany();
  await prisma.customerPreference.deleteMany();
  await prisma.aIReport.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.visitSchedule.deleteMany();
  await prisma.savedProperty.deleteMany();
  await prisma.message.deleteMany();
  await prisma.chatParticipant.deleteMany();
  await prisma.chatSession.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.propertyAmenity.deleteMany();
  await prisma.amenity.deleteMany();
  await prisma.propertyMedia.deleteMany();
  await prisma.propertyAgent.deleteMany();
  await prisma.property.deleteMany();
  await prisma.locality.deleteMany();
  await prisma.user.deleteMany();

  console.log("Database cleaned.");

  // Create hashed password for mock users
  const passwordHash = await bcrypt.hash("password123", 10);

  // 1. Create Users
  const customer = await prisma.user.create({
    data: {
      email: "sarah@example.com",
      name: "Sarah Johnson",
      phone: "+15550199",
      passwordHash,
      role: Role.CUSTOMER,
      emailVerified: true
    }
  });

  const subagent = await prisma.user.create({
    data: {
      email: "john@example.com",
      name: "John Doe",
      phone: "+15550288",
      passwordHash,
      role: Role.SUBAGENT,
      emailVerified: true
    }
  });

  const admin = await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "System Admin",
      phone: "+15550300",
      passwordHash,
      role: Role.ADMIN,
      emailVerified: true
    }
  });

  const agentTesting = await prisma.user.create({
    data: {
      email: "agent_testing@example.com",
      name: "Agent Testing",
      phone: "+15559999",
      passwordHash,
      role: Role.SUBAGENT,
      emailVerified: true
    }
  });

  console.log("Created users:", {
    customer: customer.email,
    subagent: subagent.email,
    admin: admin.email,
    agentTesting: agentTesting.email
  });

  // 2. Create KYC Verification for Subagent
  await prisma.kYCVerification.create({
    data: {
      userId: subagent.id,
      documents: {
        license_number: "DL-9988221",
        verified_country: "US"
      },
      status: KYCStatus.APPROVED
    }
  });

  await prisma.kYCVerification.create({
    data: {
      userId: agentTesting.id,
      documents: {
        license_number: "DL-1234567",
        verified_country: "US"
      },
      status: KYCStatus.PENDING
    }
  });

  // 3. Create Localities
  const locality1 = await prisma.locality.create({
    data: {
      name: "Andheri West",
      city: "Mumbai",
      state: "MH",
      country: "IN",
      latitude: 19.1363,
      longitude: 72.8293,
      poi: {
        schools: ["Andheri High School", "Rajhans Vidyalaya"],
        parks: ["Nana Nani Park"],
        transport: ["Andheri Metro Station", "Andheri Railway Station"]
      },
      intelligence: {
        market_sentiment: "High Demand",
        price_trend: "Increasing",
        average_price_sqft: 22000
      }
    }
  });

  const locality2 = await prisma.locality.create({
    data: {
      name: "Bandra West",
      city: "Mumbai",
      state: "MH",
      country: "IN",
      latitude: 19.0596,
      longitude: 72.8295,
      poi: {
        shopping: ["Linking Road", "Hill Road"],
        parks: ["Bandstand Promenade", "Carter Road Promenade"]
      },
      intelligence: {
        market_sentiment: "Very High Demand",
        price_trend: "Increasing",
        average_price_sqft: 45000
      }
    }
  });

  const locality3 = await prisma.locality.create({
    data: {
      name: "Goregaon East",
      city: "Mumbai",
      state: "MH",
      country: "IN",
      latitude: 19.1634,
      longitude: 72.8560,
      poi: {
        dining: ["Oberoi Mall Food Court", "Local Diners"]
      },
      intelligence: {
        market_sentiment: "Expanding",
        price_trend: "Increasing",
        average_price_sqft: 18000
      }
    }
  });

  const locality4 = await prisma.locality.create({
    data: {
      name: "Airoli",
      city: "Navi Mumbai",
      state: "MH",
      country: "IN",
      latitude: 19.1579,
      longitude: 72.9935
    }
  });

  console.log("Created localities.");

  // 4. Create Properties
  const prop1 = await prisma.property.create({
    data: {
      title: "Modern Luxury Villa",
      description: "Matches your preference for premium architecture and central family-friendly neighborhoods. Built in 2020 with modular kitchen, smart home integrations, and private terrace gardens.",
      price: 85000000.00, // INR 8.5 Crore
      address: "Juhu Versova Link Road, Andheri West, Mumbai, MH, India",
      latitude: 19.1363,
      longitude: 72.8293,
      localityId: locality1.id,
      status: PropertyStatus.ACTIVE,
      propertyType: PropertyType.VILLA,
      listingType: ListingType.SALE,
      isVerified: true,
      beds: 4,
      baths: 3,
      sqft: 2500,
      yearBuilt: 2020
    }
  });

  const prop2 = await prisma.property.create({
    data: {
      title: "Sea Facing Premium Apartment",
      description: "Breathtaking Arabian sea views and proximity to Bandstand match your luxury lifestyle. Full-service concierge, backup power, and dedicated basement parking spaces.",
      price: 120000000.00, // INR 12 Crore
      address: "Carter Road Promenade, Bandra West, Mumbai, MH, India",
      latitude: 19.0596,
      longitude: 72.8295,
      localityId: locality2.id,
      status: PropertyStatus.ACTIVE,
      propertyType: PropertyType.APARTMENT,
      listingType: ListingType.SALE,
      isVerified: true,
      beds: 3,
      baths: 2,
      sqft: 1800,
      yearBuilt: 2018
    }
  });

  const prop3 = await prisma.property.create({
    data: {
      title: "Suburban Heights Penthouse",
      description: "Quiet luxury penthouse overlooking Aarey Colony greens. Proximity to Western Express Highway and Oberoi Mall.",
      price: 65000000.00, // INR 6.5 Crore
      address: "Gokuldham, Goregaon East, Mumbai, MH, India",
      latitude: 19.1634,
      longitude: 72.8560,
      localityId: locality3.id,
      status: PropertyStatus.PENDING_APPROVAL,
      propertyType: PropertyType.VILLA,
      listingType: ListingType.SALE,
      isVerified: false,
      beds: 3,
      baths: 2,
      sqft: 2200,
      yearBuilt: 2021
    }
  });

  const propCoastal = await prisma.property.create({
    data: {
      title: "Sea Breeze Condo",
      description: "Beautiful creek view with modern amenities, large balcony, and direct access to dynamic IT hubs and railway link.",
      price: 15000000.00, // INR 1.5 Crore
      address: "Sector 15, Ghansoli, Navi Mumbai, MH, India",
      latitude: 19.1254,
      longitude: 73.0163,
      status: PropertyStatus.ACTIVE,
      propertyType: PropertyType.APARTMENT,
      listingType: ListingType.SALE,
      isVerified: true,
      beds: 2,
      baths: 2,
      sqft: 1100,
      yearBuilt: 2015
    }
  });

  const propTesting = await prisma.property.create({
    data: {
      title: "Brand New Testing Villa",
      description: "Beautiful testing villa with dynamic autocomplete geocoded details.",
      price: 32000000.00, // INR 3.2 Crore
      address: "Sector 5, Airoli, Navi Mumbai, MH, India",
      latitude: 19.1579,
      longitude: 72.9935,
      localityId: locality4.id,
      status: PropertyStatus.PENDING_APPROVAL,
      propertyType: PropertyType.VILLA,
      listingType: ListingType.SALE,
      isVerified: false,
      beds: 3,
      baths: 2,
      sqft: 1850,
      yearBuilt: 2022
    }
  });

  const propLoft = await prisma.property.create({
    data: {
      title: "Industrial Studio Loft",
      description: "Stunning industrial design studio loft located in the heart of Andheri East commercial hub. Features high ceilings, modern aesthetics, and modular fixtures.",
      price: 25000000.00, // INR 2.5 Crore
      address: "JB Nagar, Andheri East, Mumbai, MH, India",
      latitude: 19.1176,
      longitude: 72.8631,
      status: PropertyStatus.ACTIVE,
      propertyType: PropertyType.APARTMENT,
      listingType: ListingType.SALE,
      isVerified: true,
      beds: 2,
      baths: 2,
      sqft: 1450,
      yearBuilt: 2019
    }
  });

  console.log("Created properties.");

  // 5. Map Properties to Subagents
  await prisma.propertyAgent.createMany({
    data: [
      {
        propertyId: prop1.id,
        subagentId: subagent.id,
        primaryAgent: true,
        commissionPercentage: 2.5
      },
      {
        propertyId: prop2.id,
        subagentId: subagent.id,
        primaryAgent: true,
        commissionPercentage: 3.0
      },
      {
        propertyId: prop3.id,
        subagentId: subagent.id,
        primaryAgent: true,
        commissionPercentage: 2.5
      },
      {
        propertyId: propCoastal.id,
        subagentId: subagent.id,
        primaryAgent: true,
        commissionPercentage: null
      },
      {
        propertyId: propTesting.id,
        subagentId: agentTesting.id,
        primaryAgent: true,
        commissionPercentage: null
      },
      {
        propertyId: propLoft.id,
        subagentId: subagent.id,
        primaryAgent: true,
        commissionPercentage: null
      }
    ]
  });

  // 6. Create Property Media
  await prisma.propertyMedia.createMany({
    data: [
      {
        propertyId: prop1.id,
        fileName: "home_exterior.jpg",
        fileType: "image/jpeg",
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        size: 204857
      },
      {
        propertyId: prop2.id,
        fileName: "penthouse_interior.jpg",
        fileType: "image/jpeg",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
        size: 198421
      },
      {
        propertyId: prop3.id,
        fileName: "suburban_garden.jpg",
        fileType: "image/jpeg",
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
        size: 345091
      },
      {
        propertyId: propCoastal.id,
        fileName: "coastal_condo.jpg",
        fileType: "image/jpeg",
        url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
        size: 145000
      },
      {
        propertyId: propTesting.id,
        fileName: "media_1.jpg",
        fileType: "image/jpeg",
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
        size: 12345
      },
      {
        propertyId: propLoft.id,
        fileName: "urban_loft.jpg",
        fileType: "image/jpeg",
        url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
        size: 185000
      }
    ]
  });

  // 7. Create Amenities
  const pool = await prisma.amenity.create({ data: { name: "Swimming Pool", description: "Outdoor luxury swimming pool" } });
  const gym = await prisma.amenity.create({ data: { name: "Fitness Center", description: "Fully equipped gym" } });
  const park = await prisma.amenity.create({ data: { name: "Garage Parking", description: "Indoor secure parking garage" } });

  // Map Amenities to Properties
  await prisma.propertyAmenity.createMany({
    data: [
      { propertyId: prop1.id, amenityId: pool.id },
      { propertyId: prop1.id, amenityId: park.id },
      { propertyId: prop2.id, amenityId: pool.id },
      { propertyId: prop2.id, amenityId: gym.id },
      { propertyId: prop3.id, amenityId: park.id }
    ]
  });

  console.log("Created media and amenities.");

  // 8. Create Customer Preferences & AI Recommendations
  await prisma.customerPreference.create({
    data: {
      userId: customer.id,
      preferences: {
        budget: 90000000,
        beds: 4,
        features: ["Modern Architecture", "Bandra West"]
      }
    }
  });

  await prisma.propertyRecommendation.createMany({
    data: [
      {
        userId: customer.id,
        propertyId: prop1.id,
        score: 0.95,
        explanation: "Matches your preference for modern architecture and Andheri West proximity"
      },
      {
        userId: customer.id,
        propertyId: prop2.id,
        score: 0.88,
        explanation: "Matches your budget and preference for Bandra West sea facing layouts"
      }
    ]
  });

  // 9. Create Leads
  const lead1 = await prisma.lead.create({
    data: {
      customerId: customer.id,
      propertyId: prop1.id,
      subagentId: subagent.id,
      status: LeadStatus.CONTACTED,
      isUnlocked: true,
      notes: "Customer is very interested in the kitchen utilities."
    }
  });

  const lead2 = await prisma.lead.create({
    data: {
      customerId: customer.id,
      propertyId: prop2.id,
      subagentId: subagent.id,
      status: LeadStatus.NEW,
      isUnlocked: false,
      notes: "Lead requested via AI Search Assistant."
    }
  });

  console.log("Created leads.");

  // 10. Create Chat Sessions and Messages
  const chatSession1 = await prisma.chatSession.create({
    data: {
      subject: "Discussion: Modern Family Home",
      isAI: false
    }
  });

  await prisma.chatParticipant.createMany({
    data: [
      { sessionId: chatSession1.id, userId: customer.id, role: "customer" },
      { sessionId: chatSession1.id, userId: subagent.id, role: "subagent" }
    ]
  });

  await prisma.message.createMany({
    data: [
      {
        sessionId: chatSession1.id,
        senderId: subagent.id,
        senderType: MessageSenderType.SUBAGENT,
        content: "Hi Sarah! Thanks for showing interest in the Modern Family Home. Let me know if you have any questions."
      },
      {
        sessionId: chatSession1.id,
        senderId: customer.id,
        senderType: MessageSenderType.USER,
        content: "Hello John, thank you. The listing looks gorgeous! Is the price negotiable at all?"
      },
      {
        sessionId: chatSession1.id,
        senderId: subagent.id,
        senderType: MessageSenderType.SUBAGENT,
        content: "The seller is open to negotiations for buyers who can make an all-cash offer or quick close."
      }
    ]
  });

  console.log("Created chat sessions and messages.");
  console.log("Production schema seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
