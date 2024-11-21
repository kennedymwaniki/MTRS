import { Hono } from "hono";
import {
  getReservations,
  createReservation,
  deleteReservation,
  getReservation,
  updateReservation,
} from "./reservationController";

export const reservationRouter = new Hono();

reservationRouter.get("/reservations", getReservations);
reservationRouter.post("/reservations", createReservation);
reservationRouter.get("/reservations/:id", getReservation);
reservationRouter.put("/reservations/:id", updateReservation);
reservationRouter.delete("/reservations/:id", deleteReservation);
