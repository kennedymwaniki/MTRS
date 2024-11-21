import { Context } from "hono";
import {
  createReservationService,
  deleteReservationService,
  getRerservationByIdService,
  getReservationsService,
  updateReservationService,
} from "./reservationService";

export const getReservations = async (c: Context) => {
  const reservations = await getReservationsService();
  return c.json(reservations);
};

export const getReservation = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const reservation = await getRerservationByIdService(id);
  if (!reservation) {
    return c.json({ msg: "We could not find such a reservation" }, 404);
  }
  return c.json(reservation);
};

export const createReservation = async (c: Context) => {
  try {
    const reservation = await c.req.json();
    const createdReservation = await createReservationService(reservation);
    if (!createdReservation) {
      return c.text("Reservation could not be created", 404);
    }
    return c.json({ msg: createdReservation }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const deleteReservation = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const reservation = await getRerservationByIdService(id);
    if (reservation == undefined)
      return c.json({ msg: "Such a reservation does not exist" }, 404);

    const res = await deleteReservationService(id);
    if (!res) return c.text("Reservation not deleted", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const updateReservation = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const reservation = await c.req.json();

    const existingReservation = await getRerservationByIdService(id);
    if (!existingReservation) {
      return c.json({ msg: "Reservation not found" }, 404);
    }

    const updatedReservation = await updateReservationService(id, reservation);
    return c.json({ msg: updatedReservation }, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
