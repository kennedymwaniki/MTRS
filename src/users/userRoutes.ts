import { Hono } from "hono";
import {
  getUsers,
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "./userController";

export const userRouter = new Hono();
//update a user
userRouter.get("/users", getUsers);
userRouter.put("/users/:id", updateUser);
userRouter.get("/users/:id", getUser);
// delete user
userRouter.delete("/users/:id", deleteUser);
userRouter.post("/users", createUser);
