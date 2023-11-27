import { NextFunction } from "express";
import express from "express";
import jwt from "jsonwebtoken";
require("dotenv");

interface UserRequest extends express.Request {
    user?: string;
}

export function authenticateToken(
    req: UserRequest,
    res: express.Response,
    next: NextFunction
) {
    const authHeader = req.headers["authorization"];
    const token = authHeader;

    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "Token not provided" });
    }

    jwt.verify(token, "3a7f69bfb570e498d6e2f4775af5c98c8e7e94c9b0a1a3a39e0df5f394b127e82"!, (err, decoded) => {
        if (err) {
            return res
                .status(403)
                .json({ success: false, message: "Invalid token" });
        }
        req.user = decoded?.toString();
        next();
    });
}
