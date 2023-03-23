import express from "express";
import {
  getCassing,
  getCasingByFormFactor,
  createCassing,
  updateCassing,
  deleteCassing,
} from "../controllers/CassingController.js";

const router = express.Router();

router.get("/api/v1/cassing", getCassing);
router.get("/api/v1/cassing/formFactor/:formFactor", getCasingByFormFactor);
router.post("/api/v1/cassing", createCassing);
router.patch("/api/v1/cassing/:id", updateCassing);
router.delete("/api/v1/cassing/:id", deleteCassing);

export default router;
