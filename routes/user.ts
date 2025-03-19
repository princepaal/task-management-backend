import express from "express";
import user from "../controller/user";

const router = express.Router();

router.post("/signup", user.createUser);
router.post("/login", user.loginUser);

export default router;
