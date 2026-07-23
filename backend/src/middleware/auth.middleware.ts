import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma";

export interface AuthRequest extends Request {
  userId?: number;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Invalid authorization format",
      });
    }

    // Check whether token is logged out/revoked
    const revokedToken = await prisma.revokedToken.findUnique({
      where: {
        token,
      },
    });

    if (revokedToken) {
      return res.status(401).json({
        message: "Session expired. Please login again.",
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(
      token,

      process.env.JWT_SECRET as string,
    ) as {
      userId: number;
    };

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error(error);

    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
