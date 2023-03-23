import express from "express";
import {
  createVgaCard,
  deleteVgaCard,
  getVga,
  getVgaById,
  updateVgaCard,
} from "../controllers/VgaCardController.js";

const router = express.Router();

router.get("/api/v1/vga", getVga);
router.get("/api/v1/vga/:id", getVgaById);
router.post("/api/v1/vga", createVgaCard);
router.patch("/api/v1/vga/:id", updateVgaCard);
router.delete("/api/v1/vga/:id", deleteVgaCard);

export default router;
