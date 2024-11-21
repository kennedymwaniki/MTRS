import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TSReservation, TIReservation, reservations } from "../drizzle/schema";

export const getReservationsService = async (): Promise<
  TSReservation[] | undefined
> => {
  const reservations = await db.query.reservations.findMany({
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          email: true,
          phoneNumber: true,
        },
      },
      movie: {
        columns: {
          title: true,
          genre: true,
          duration: true,
          poster: true,
          id: true,
        },
        with: {
          schedules: {
            columns: {
              startTime: true,
              endTime: true,
              status: true,
              id: true,
            },
          },
        },
      },

      seat: {
        columns: {
          seatNumber: true,
          category: true,
          price: true,
          id: true,
        },
      },
    },
  });
  return reservations;
};

export const getRerservationByIdService = async (
  id: number
): Promise<TSReservation | undefined> => {
  const reservation = await db.query.reservations.findFirst({
    where: eq(reservations.id, id),
    with: {
      user: {
        columns: {
          name: true,
          email: true,
          phoneNumber: true,
        },
      },
      movie: {
        columns: {
          title: true,
          genre: true,
          duration: true,
          poster: true,
          id: true,
        },
        with: {
          schedules: {
            columns: {
              startTime: true,
              endTime: true,
              status: true,
              id: true,
            },
          },
        },
      },
      seat: {
        columns: {
          seatNumber: true,
          category: true,
        },
      },
      ticket: {
        columns: {
          ticketNumber: true,
          isUsed: true,
          qrCode: true,
        },
      },
    },
  });
  return reservation;
};

export const createReservationService = async (
  reservation: TIReservation
): Promise<TSReservation> => {
  const createdReservation = await db
    .insert(reservations)
    .values(reservation)
    .returning();
  return createdReservation[0];
};

export const updateReservationService = async (
  id: number,
  reservation: TIReservation
): Promise<TSReservation> => {
  const updatedReservation = await db
    .update(reservations)
    .set(reservation)
    .where(eq(reservations.id, id))
    .returning();
  return updatedReservation[0];
};

export const deleteReservationService = async (id: number) => {
  await db.delete(reservations).where(eq(reservations.id, id));
  return "Reservation deleted successfully";
};
