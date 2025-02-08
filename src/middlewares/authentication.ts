import { NextFunction, Request, Response } from "express";
import { errorRes } from "../utils/response";
import * as jwt from "jsonwebtoken"
import { JWT_PASS } from "../secret";

export function jwtAuth(req: Request, res: Response, next: NextFunction): any {
    try {
        const token = req.headers.authorization?.replace("Bearer ", "")
        if (!token) {
            return res.status(401).json(errorRes(401, "INVALID_TOKEN", "Invalid or not found token"))
        }
        jwt.verify(token, JWT_PASS, (err, decode) => {
            if (err) {
                return res.status(401).json(errorRes(401, err.name, err.message))
            }

            (req as any).auth = decode
            next()
        })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}