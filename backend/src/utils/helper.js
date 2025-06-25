import { nanoid } from "nanoid";
import jwt from "jsonwebtoken";

export const generateNanoId = (length = 7) => {
    return nanoid(length);
};

export const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
