import { Context } from "hono";
import {
  createSeatService,
  deleteSeatService,
  getSeatByIdService,
  getSeatsService,
  updateSeatService,
} from "./seatsServices";

export const getSeats = async (c: Context) => {
  const seats = await getSeatsService();
  return c.json(seats);
};

export const getSeat = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const seat = await getSeatByIdService(id);
  if (!seat) {
    return c.json({ msg: "Seat not found" }, 404);
  }
  return c.json(seat);
};

export const createSeat = async (c: Context) => {
  try {
    const seat = await c.req.json();
    const createdSeat = await createSeatService(seat);
    if (!createdSeat) {
      return c.text("Seat could not be created", 404);
    }
    return c.json({ msg: createdSeat }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const updateSeat = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const seat = await c.req.json();

    const existingSeat = await getSeatByIdService(id);
    if (!existingSeat) {
      return c.json({ msg: "Seat not found" }, 404);
    }

    const updatedSeat = await updateSeatService(id, seat);
    return c.json({ msg: updatedSeat }, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const deleteSeat = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const seat = await getSeatByIdService(id);
    if (!seat) return c.text("Seat not found", 404);

    const res = await deleteSeatService(id);
    if (!res) return c.text("Seat not deleted", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
