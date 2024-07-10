import express from "express";
import { login2 } from "../controller/admin.controller.js";
const router=express.Router()
router.post("/login_admin",login2)
//router.post("/login_jobseeker",login)
export default router;