import { Router } from "express";
import authRoutes from "./auth";
import propertiesRoutes from "./properties";
import leadsRoutes from "./leads";
import messagesRoutes from "./messages";
import kycRoutes from "./kyc";
import adminRoutes from "./admin";

const router = Router();

// Mount individual domain sub-routers
router.use("/auth", authRoutes);
router.use("/properties", propertiesRoutes);
router.use("/leads", leadsRoutes);
router.use("/messages", messagesRoutes);
router.use("/kyc", kycRoutes);
router.use("/admin", adminRoutes);

export default router;
