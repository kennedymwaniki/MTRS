import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TISeats, TSSeats, seats } from "../drizzle/schema";

export const getSeatsService = async (): Promise<TSSeats[]> => {
  const seatsList = await db.query.seats.findMany();
  return seatsList;
};

export const getSeatByIdService = async (
  id: number
): Promise<TSSeats | undefined> => {
  const seat = await db.query.seats.findFirst({
    where: eq(seats.id, id),
  });
  return seat;
};

export const createSeatService = async (seat: TISeats): Promise<TSSeats> => {
  const createdSeat = await db.insert(seats).values(seat).returning();
  return createdSeat[0];
};

export const updateSeatService = async (
  id: number,
  seat: TISeats
): Promise<TSSeats> => {
  const updatedSeat = await db
    .update(seats)
    .set(seat)
    .where(eq(seats.id, id))
    .returning();
  return updatedSeat[0];
};

export const deleteSeatService = async (id: number): Promise<string> => {
  await db.delete(seats).where(eq(seats.id, id));
  return "Seat deleted successfully";
};
