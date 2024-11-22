import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIMovies, TSMovies, movies } from "../drizzle/schema";

export const getMoviesService = async (): Promise<TSMovies[] | []> => {
  const movies = await db.query.movies.findMany({
    with: {
      schedules: {
        columns: {
          id: true,
          startTime: true,
          endTime: true,
          status: true,
          availableSeats: true,
        },
      },
      reservations: {
        columns: {
          userId: true,
          paymentStatus: true,
          status: true,
          createdAt: true,
          totalAmount: true,
        },
      },
    },
  });
  return movies;
};

export const getMovieByIdService = async (
  id: number
): Promise<TSMovies | undefined> => {
  const movie = await db.query.movies.findFirst({
    where: eq(movies.id, id),
    with: {
      schedules: {
        columns: {
          id: true,
          startTime: true,
          endTime: true,
          status: true,
          availableSeats: true,
        },
      },
      reservations: {
        columns: {
          userId: true,
          paymentStatus: true,
          status: true,
          createdAt: true,
          totalAmount: true,
        },
      },
    },
  });
  return movie;
};

export const createMovieService = async (
  movie: TIMovies
): Promise<TSMovies> => {
  const Movie = await db.insert(movies).values(movie).returning();
  return Movie[0];
};

export const updateMovieService = async (
  id: number,
  movie: TIMovies
): Promise<TSMovies> => {
  const updatedMovie = await db
    .update(movies)
    .set(movie)
    .where(eq(movies.id, id))
    .returning();
  return updatedMovie[0];
};

export const deleteMovieService = async (id: number) => {
  await db.delete(movies).where(eq(movies.id, id));
  return "Movie deleted successfullly";
};

export const getMoviesSchedules = async (id: number) => {
  const Movie = await db.query.movies.findFirst({
    where: eq(movies.id, id),
    with: {
      schedules: {
        columns: {
          availableSeats: true,
          startTime: true,
          endTime: true,
          status: true,
          id: true,
        },
      },
    },
  });
};
