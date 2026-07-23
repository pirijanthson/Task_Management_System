"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

Object.defineProperty(exports, "__esModule", { value: true });

exports.logout = exports.login = void 0;

const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../config/prisma"));
const jwt_1 = require("../utils/jwt");

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }
        const user = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const validPassword = await bcryptjs_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const token = (0, jwt_1.generateToken)(user.id);
        res.json({
            message: "Login Successfull",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: "Server Error",
        });
    }
};

exports.login = login;

const logout = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: "No token provided",
            });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.decode(token);
        await prisma_1.default.revokedToken.create({
            data: {
                token,
                expiresAt: new Date(decoded.exp * 1000),
            },
        });
        return res.json({
            success: true,
            message: "Logout successful",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Logout failed",
        });
    }
};

exports.logout = logout;
