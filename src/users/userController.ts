import { Context } from "hono";
import {
  createUserService,
  deleteUserService,
  getUserByIdService,
  getUsersService,
  updateUserService,
} from "./userService";
import { TSUsers } from "../drizzle/schema";
import bcrypt from "bcrypt";

export const getUsers = async (c: Context) => {
  const users = await getUsersService();
  return c.json(users);
};

export const getUser = async (c: Context) => {
  const id = Number(c.req.param("id"));
  const user = await getUserByIdService(id);
  if (!user) {
    return c.json({ error: "No such user found" }, 404);
  }
  return c.json(user, 200);
};

export const createUser = async (c: Context) => {
  try {
    const user = await c.req.json();
    const createdUser = await createUserService(user);
    if (!createdUser) {
      return c.text("no user created");
    }
    return c.json({ msg: createdUser }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const deleteUser = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await getUserByIdService(id);
    if (user == undefined) return c.text("User not found", 404);

    const res = await deleteUserService(id);
    if (!res) return c.text("User not deleted", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const updateUser = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    console.log("controller:", id);
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const user = await c.req.json();
    // search for the user
    const searchedUser = await getUserByIdService(id);
    if (searchedUser == undefined) return c.text("User not found", 404);

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    // get the data and update it
    const res = await updateUserService(id, user);
    // return a success message
    if (!res) return c.text("User not updated", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
