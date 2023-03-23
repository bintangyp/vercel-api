import experss from "express";
import { Login, LogOut, Me } from "../controllers/AuthController.js";

const router = experss.Router();

router.post("/login", Login);
router.get("/me", Me);
router.delete("/logout", LogOut);

export default router;
