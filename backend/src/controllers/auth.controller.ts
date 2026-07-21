import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../config/prisma";
import { generateToken } from "../utils/jwt";

export const login = async (req: Request, res:Response) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const validPassword = await bcrypt.compare(
            password,
            user.password
        );

        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user.id);

        res.json({
            message: "Login Successfull",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    }

    catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
};