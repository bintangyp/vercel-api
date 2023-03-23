import express from "express";
import {
  createMotherboard,
  getMotherboard,
  getMotherboards,
  deleteMotherboard,
  updateMotherboard,
  getMotherboardById,
} from "../controllers/MotherboardController.js";

const router = express.Router();

router.get("/api/v1/motherboard/socket/:processorSocket", getMotherboard);
router.get("/api/v1/motherboard/:id", getMotherboardById);

router.get("/api/v1/motherboard", getMotherboards);
router.post("/api/v1/motherboard", createMotherboard);
router.patch("/api/v1/motherboard/:id", updateMotherboard);
router.delete("/api/v1/motherboard/:id", deleteMotherboard);

export default router;
