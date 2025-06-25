import express from "express"
import { register_user, login_user, logout_user, get_current_user } from "../controller/auth.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

const router = express.Router()

router.post("/register", register_user)
router.post("/login", login_user)
router.post("/logout", logout_user)
router.get("/me", wrapAsync(authMiddleware), get_current_user)

export default router
