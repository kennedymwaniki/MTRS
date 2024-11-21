import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIUsers, TSUsers, users } from "../drizzle/schema";

export const getUsersService = async (): Promise<TSUsers[] | []> => {
  const users = await db.query.users.findMany();
  return users;
};

export const getUserByIdService = async (
  id: number
): Promise<TSUsers | undefined> => {
  const user = await db.query.users.findFirst({
    where: eq(users.id, id),
  });
  return user;
};

export const createUserService = async (user: TIUsers) => {
  await db.insert(users).values(user);
  return user;
};

export const deleteUserService = async (id: number) => {
  await db.delete(users).where(eq(users.id, id));
  return "user deleted successfully";
};

export const updateUserService = async (id: number, user: TIUsers) => {
  await db.update(users).set(user).where(eq(users.id, id));
  return user;
};
