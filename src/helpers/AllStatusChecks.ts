import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { movieSchedules } from "../drizzle/schema";
import { getMovieByIdService } from "../movies/movieService";

export const getMovieStatus = async (movieId: number) => {
  const movie = await getMovieByIdService(movieId);
  if (!movie) {
    return { msg: "We could not find such a movie" };
  }

  const scheduleStatus = await db.query.movieSchedules.findFirst({
    where: eq(movieSchedules.movieId, movieId),
  });
  return { movie, scheduleStatus };
};
