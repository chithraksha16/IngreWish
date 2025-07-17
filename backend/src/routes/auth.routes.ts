import express from 'express'
import { signup,login,logout,checkAuth } from '../controllers/auth.controller'
import { authenticate } from '../middlewares/auth.middleware'
const router=express.Router()

router.post("/signup",signup)

router.post("/login",login)

router.post("/logout",authenticate,logout)

router.get("/check",authenticate,checkAuth)

export default router