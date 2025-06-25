import { findUserById } from "../dao/user.dao.js"
import { verifyToken } from "../utils/helper.js"
import { UnauthorizedError } from "../utils/errorHandler.js"

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.accessToken
    if(!token) throw new UnauthorizedError("Access token required")
    
    try {
        const decoded = verifyToken(token)
        const user = await findUserById(decoded.userId)
        if(!user) throw new UnauthorizedError("Invalid token")
        req.user = user
        next()
    } catch (error) {
        throw new UnauthorizedError("Invalid token")
    }
}
