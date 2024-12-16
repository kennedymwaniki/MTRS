import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { movieSchedules } from "../drizzle/schema";
import { getMovieByIdService } from "../movies/movieService";

export const getMovieStatus = async (scheduleId: number) => {
  const scheduleStatus = await db.query.movieSchedules.findFirst({
    where: eq(movieSchedules.id, scheduleId),
  });
  if (!scheduleStatus) {
    return { msg: "We could not find such a schedule" };
  }

  const movie = await getMovieByIdService(scheduleStatus.movieId);
  if (!movie) {
    return { msg: "We could not find such a movie" };
  }

  return { movie, scheduleStatus };
};
