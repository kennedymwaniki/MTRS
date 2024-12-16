import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TSUsers, TIUsers, users } from "../drizzle/schema";

export const registerUserservice = async (user: TSUsers) => {
  try {
    //    check if the email exists
    const { email } = user;
    const foundUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (foundUser) {
      throw new Error("User with the provided email already exists");
    }
    const newUser = await db.insert(users).values(user).returning();
    return newUser;
  } catch (error: any) {
    throw new Error(error?.message || "Registration failed");
  }
};

export const loginService = async (user: any) => {
  try {
    const { email } = user;
    const foundUser = await db.query.users.findFirst({
      where: eq(users.email, email),
      columns: {
        email: true,
        name: true,
        id: true,
        role: true,
        password: true,
        phoneNumber: true,
      },
    });
    if (!foundUser) {
      throw new Error("No user with the provided email can be found");
    }
    return foundUser;
  } catch (error: any) {
    throw new Error(error?.message || "Login failed");
  }
};
