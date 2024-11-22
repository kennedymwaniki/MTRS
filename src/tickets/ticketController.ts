import { Context } from "hono";
import {
  createTicketService,
  getTicketByIdService,
  deletTicketService,
  getTicketsService,
} from "./ticketsService";

export const getTickets = async (c: Context) => {
  const tickets = await getTicketsService();
  return c.json(tickets);
};

export const createTicket = async (c: Context) => {
  try {
    const ticket = await c.req.json();
    const createdTicket = await createTicketService(ticket);
    if (!createdTicket) {
      return c.text("Ticket could not be created", 404);
    }
    return c.json({ msg: createdTicket }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const getTicketById = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const ticket = await getTicketByIdService(id);
  if (!ticket) {
    return c.json({ msg: "Ticket not found" }, 404);
  }
  return c.json(ticket);
};

export const deleteTicket = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const ticket = await getTicketByIdService(id);
    if (!ticket) return c.text("Ticket not found", 404);

    const res = await deletTicketService(id);
    if (!res) return c.text("Ticket not deleted", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
