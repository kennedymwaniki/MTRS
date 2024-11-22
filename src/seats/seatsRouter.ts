import { Hono } from "hono";
import {
  getSeats,
  createSeat,
  deleteSeat,
  getSeat,
  updateSeat,
} from "./seatsController";

export const seatsRouter = new Hono();

seatsRouter.get("/seats", getSeats);
seatsRouter.post("/seats", createSeat);
seatsRouter.get("/seats/:id", getSeat);
seatsRouter.put("/seats/:id", updateSeat);
seatsRouter.delete("/seats/:id", deleteSeat);
