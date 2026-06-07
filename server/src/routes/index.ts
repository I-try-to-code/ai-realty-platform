import { Router } from "express";
import authRoutes from "./auth";
import propertiesRoutes from "./properties";
import leadsRoutes from "./leads";
import messagesRoutes from "./messages";
import kycRoutes from "./kyc";

const router = Router();

// Mount individual domain sub-routers
router.use("/auth", authRoutes);
router.use("/properties", propertiesRoutes);
router.use("/leads", leadsRoutes);
router.use("/messages", messagesRoutes);
router.use("/kyc", kycRoutes);

export default router;
