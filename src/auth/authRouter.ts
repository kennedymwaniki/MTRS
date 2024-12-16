import { Hono } from "hono";
import { registerUser, loginUser } from "./authController";

export const authRouter = new Hono();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
