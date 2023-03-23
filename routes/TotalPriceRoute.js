import express from "express";
import {
  getTotal,
  createTotal,
  deleteAllTotal,
  deleteByType,
} from "../controllers/TotalPriceController.js";

const router = express.Router();
router.get("/api/v1/totalPrice", getTotal);
router.post("/api/v1/totalPrice/:type", createTotal);
router.delete("/api/v1/totalPrice", deleteAllTotal);
router.delete("/api/v1/totalPrice/:type", deleteByType);

export default router;
