import express from "express";
import {
  getProcessorByVendor,
  getProcessorById,
  getProcessors,
  createProcessor,
  updateProcessor,
  deleteProcessor,
} from "../controllers/ProcessorController.js";
import {
  createProcessorList,
  deleteProcessorList,
  getProcessorByType,
  getProcessorLists,
  updateProcessorList,
} from "../controllers/ProcessorListController.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();
router.get("/api/v1/processor/vendor", getProcessors);
router.get("/api/v1/processor/vendor/:vendor", getProcessorByVendor);
router.post("/api/v1/processor/vendor", createProcessor);
router.patch("/api/v1/processor/vendor/:id", updateProcessor);
router.delete("/api/v1/processor/vendor/:id");

router.get("/api/v1/processorList/type/:processorType", getProcessorByType);
router.get("/api/v1/processor", verifyUser, getProcessorLists);
router.get("/api/v1/processor/:id", verifyUser, getProcessorById);
router.post("/api/v1/processor", verifyUser, createProcessorList);
router.patch("/api/v1/processor/:id", verifyUser, updateProcessorList);
router.delete("/api/v1/processor/:id", verifyUser, deleteProcessorList);

export default router;
