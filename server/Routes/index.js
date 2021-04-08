import express from "express";
const router = express.Router();
import { getUser, createUser, LogIn } from "../Controllers/index.js";
import auth from "../MiddleWare/index.js";

// router.get("/create", getRoutes);
// router.post("/create", auth, createUser);
router.post("/create", createUser);
router.get("/getPost", getUser);
router.post("/login", LogIn);

export default router;
