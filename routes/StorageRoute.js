import express from "express";
import {
  getStorage,
  getStorageById,
  getStorageBySlot,
  createStorage,
  updateStorage,
  deleteStorage,
} from "../controllers/StorageController.js";

const router = express.Router();

router.get("/api/v1/storage", getStorage);
router.get("/api/v1/storage/:id", getStorageById);
router.get("/api/v1/storage/slotType/:slotType", getStorageBySlot);
router.post("/api/v1/storage", createStorage);
router.patch("/api/v1/storage/:id", updateStorage);
router.delete("/api/v1/storage/:id", deleteStorage);

export default router;
