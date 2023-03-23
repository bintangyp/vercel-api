import express from "express";
import {
  getUsers,
  getUserByid,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/UsersController.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/api/v1/user", verifyUser, adminOnly, getUsers);
router.get("/api/v1/user/:id", verifyUser, adminOnly, getUserByid);
router.post("/api/v1/user", verifyUser, adminOnly, createUser);
router.patch("/api/v1/user/:id", verifyUser, adminOnly, updateUser);
router.delete("/api/v1/user/:id", verifyUser, adminOnly, deleteUser);

export default router;
