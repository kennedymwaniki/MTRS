import { Context } from "hono";
import bcrypt from "bcrypt";

import { registerUserservice, loginService } from "./authService";
import { sign } from "hono/jwt";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const registerUser = async (c: Context) => {
  try {
    const user = await c.req.json();
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = await registerUserservice(user);
    return c.json({ msg: "User registered successfully", user: newUser }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message || "Registration failed" }, 400);
  }
};

export const loginUser = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();
    const foundUser = await loginService({ email });
    if (!foundUser) return c.json({ error: "User not found" }, 404);
    const isPasswordValid = await bcrypt.compare(
      password,
      foundUser.password as string
    );
    if (!isPasswordValid) {
      return c.json({ error: "Invalid email or password" }, 401);
    }
    // Create a payload
    let payload = {
      sub: foundUser?.email,
      role: foundUser?.role,
      // Session to expire after 3 hours
      exp: Math.floor(Date.now() / 1000) + 60 * 180,
    };
    const token = await sign(payload, JWT_SECRET);

    return c.json(
      {
        token,
        foundUser,
      },
      200
    );
  } catch (error: any) {
    return c.json({ error: error?.message || "Login failed" }, 400);
  }
};
