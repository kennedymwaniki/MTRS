import { tickets, TITickets, TSTickets } from "./../drizzle/schema";
import db from "../drizzle/db";
import { eq } from "drizzle-orm";

export const getTicketsService = async (): Promise<TSTickets[]> => {
  const tickets = await db.query.tickets.findMany();
  return tickets;
};

export const getTicketByIdService = async (
  id: number
): Promise<TSTickets | undefined> => {
  const ticket = await db.query.tickets.findFirst({
    where: eq(tickets.id, id),
  });
  return ticket;
};

export const createTicketService = async (
  ticket: TITickets
): Promise<TSTickets> => {
  const Ticket = await db.insert(tickets).values(ticket).returning();
  return Ticket[0];
};

export const deletTicketService = async (id: number) => {
  await db.delete(tickets).where(eq(tickets.id, id));
  return "Ticket successflully deleted";
};
