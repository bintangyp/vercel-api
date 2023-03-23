import express from "express";
import {
  createPsu,
  deletePsu,
  getPsu,
  getPsuById,
  updatePsu,
} from "../controllers/PsuController.js";

const router = express.Router();

router.get("/api/v1/psu", getPsu);
router.get("/api/v1/psu/:id", getPsuById);
router.post("/api/v1/psu", createPsu);
router.patch("/api/v1/psu/:id", updatePsu);
router.delete("/api/v1/psu/:id", deletePsu);

export default router;
