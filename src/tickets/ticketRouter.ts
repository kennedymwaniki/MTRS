import { Hono } from "hono";
import {
  getTickets,
  createTicket,
  deleteTicket,
  getTicketById,
} from "./ticketController";

export const ticketRouter = new Hono();

ticketRouter.get("/tickets", getTickets);
ticketRouter.get("/tickets/:id", getTicketById);
ticketRouter.post("/tickets", createTicket);
ticketRouter.delete("/tickets/:id", deleteTicket);
