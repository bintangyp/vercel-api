import express from "express";
import {
  createGamingChair,
  deleteGamingChair,
  getGamingChair,
  getGamingChairById,
  updateGamingChair,
} from "../controllers/GamingChairController.js";
import {
  createGamingDesk,
  deleteGamingDesk,
  getGamingDesk,
  getGamingDeskById,
  updateGamingDesk,
} from "../controllers/GamingDeskController.js";
import {
  createHeadset,
  deleteHeadset,
  getHeadset,
  getHeadsetById,
  updateHeadset,
} from "../controllers/HeadsetController.js";
import {
  createKeyboard,
  deleteKeyboard,
  getKeyboardById,
  getKeyboards,
  updateKeyboard,
} from "../controllers/KeyboardController.js";
import {
  createMonitor,
  deleteMonitor,
  getMonitor,
  getMonitorById,
  updateMonitor,
} from "../controllers/MonitorController.js";
import {
  createMouse,
  deleteMouse,
  getMouse,
  getMouseById,
  updateMouse,
} from "../controllers/MouseController.js";
import {
  createMousepad,
  deleteMousepad,
  getMousepad,
  getMousepadById,
  updateMousepad,
} from "../controllers/MousepadController.js";
import {
  createSpeaker,
  deleteSpeaker,
  getSpeaker,
  getSpeakerById,
  updateSpeaker,
} from "../controllers/SpeakerController.js";

const router = express.Router();

// gaming chair routing
router.get("/api/v1/gamingChair", getGamingChair);
router.get("/api/v1/gamingChair/:id", getGamingChairById);
router.post("/api/v1/gamingChair", createGamingChair);
router.patch("/api/v1/gamingChair/:id", updateGamingChair);
router.delete("/api/v1/gamingChair/:id", deleteGamingChair);

// gaming desk routung
router.get("/api/v1/gamingDesk", getGamingDesk);
router.get("/api/v1/gamingDesk/:id", getGamingDeskById);
router.post("/api/v1/gamingDesk", createGamingDesk);
router.patch("/api/v1/gamingDesk/:id", updateGamingDesk);
router.delete("/api/v1/gamingDesk/:id", deleteGamingDesk);

// headset routing
router.get("/api/v1/headset", getHeadset);
router.get("/api/v1/headset/:id", getHeadsetById);
router.post("/api/v1/headset", createHeadset);
router.patch("/api/v1/headset/:id", updateHeadset);
router.delete("/api/v1/headset/:id", deleteHeadset);

// keyboard routing
router.get("/api/v1/keyboard", getKeyboards);
router.get("/api/v1/keyboard/:id", getKeyboardById);
router.post("/api/v1/keyboard", createKeyboard);
router.patch("/api/v1/keyboard/:id", updateKeyboard);
router.delete("/api/v1/keyboard/:id", deleteKeyboard);

// monitor routing
router.get("/api/v1/monitor", getMonitor);
router.get("/api/v1/monitor/:id", getMonitorById);
router.post("/api/v1/monitor", createMonitor);
router.patch("/api/v1/monitor/:id", updateMonitor);
router.delete("/api/v1/monitor/:id", deleteMonitor);

// mouse routing
router.get("/api/v1/mouse", getMouse);
router.get("/api/v1/mouse/:id", getMouseById);
router.post("/api/v1/mouse", createMouse);
router.patch("/api/v1/mouse/:id", updateMouse);
router.delete("/api/v1/mouse/:id", deleteMouse);

// mousepad routing
router.get("/api/v1/mousepad", getMousepad);
router.get("/api/v1/mousepad/:id", getMousepadById);
router.post("/api/v1/mousepad", createMousepad);
router.patch("/api/v1/mousepad/:id", updateMousepad);
router.delete("/api/v1/mousepad/:id", deleteMousepad);

// speaker routing
router.get("/api/v1/speaker", getSpeaker);
router.get("/api/v1/speaker/:id", getSpeakerById);
router.post("/api/v1/speaker", createSpeaker);
router.patch("/api/v1/speaker/:id", updateSpeaker);
router.delete("/api/v1/speaker/:id", deleteSpeaker);

export default router;
