import express from "express";
import { signup,login } from "../controller/user.controller.js";
const router=express.Router()
router.post("/signup_jobseeker",signup)
router.post("/login_jobseeker",login)
export default router;