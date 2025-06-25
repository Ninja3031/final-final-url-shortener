import express from "express"
import { getUserShortUrls, deleteUserShortUrl } from "../controller/user.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import wrapAsync from "../utils/tryCatchWrapper.js"

const router = express.Router()

router.get("/urls", wrapAsync(authMiddleware), getUserShortUrls)
router.delete("/urls/:id", wrapAsync(authMiddleware), deleteUserShortUrl)

export default router
