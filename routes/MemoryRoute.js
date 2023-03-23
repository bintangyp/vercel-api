import {
  getMemory,
  getMemoryById,
  getMemoryByType,
  createMemory,
  updateMemory,
  deleteMemory,
} from "../controllers/MemoryController.js";
import express from "express";

const router = express.Router();
router.get("/api/v1/memory", getMemory);
router.get("/api/v1/memory/:id", getMemoryById);
router.get("/api/v1/memory/type/:type", getMemoryByType);
router.post("/api/v1/memory", createMemory);
router.patch("/api/v1/memory/:id", updateMemory);
router.delete("/api/v1/memory/:id", deleteMemory);

export default router;
