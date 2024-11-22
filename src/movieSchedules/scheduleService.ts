import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {
  TIMovieSchedule,
  TSMovieSChedule,
  movieSchedules,
} from "../drizzle/schema";

export const getSChedulesService = async (): Promise<TSMovieSChedule[]> => {
  const schedules = await db.query.movieSchedules.findMany();
  return schedules;
};

export const getScheduleByIdService = async (
  id: number
): Promise<TSMovieSChedule | undefined> => {
  const schedule = await db.query.movieSchedules.findFirst({
    where: eq(movieSchedules.id, id),
  });
  return schedule;
};

export const createScheduleService = async (
  schedule: TIMovieSchedule
): Promise<TSMovieSChedule> => {
  const Schedule = await db.insert(movieSchedules).values(schedule).returning();
  return Schedule[0];
};

export const updateScheduleService = async (
  id: number,
  schedule: TIMovieSchedule
): Promise<TSMovieSChedule> => {
  const updateSchedule = await db
    .update(movieSchedules)
    .set(schedule)
    .where(eq(movieSchedules.id, id))
    .returning();
  return updateSchedule[0];
};

export const deleteScheduleService = async (id: number) => {
  await db.delete(movieSchedules).where(eq(movieSchedules.id, id));
};
