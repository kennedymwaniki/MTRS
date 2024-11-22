import { Context } from "hono";
import {
  createScheduleService,
  deleteScheduleService,
  getScheduleByIdService,
  getSChedulesService,
  updateScheduleService,
} from "./scheduleService";

export const getSchedules = async (c: Context) => {
  const schedules = await getSChedulesService();
  return c.json(schedules);
};

export const getSchedule = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const schedule = await getScheduleByIdService(id);
  if (!schedule) {
    return c.json({ msg: "We could not find such a schedule" }, 404);
  }
  return c.json(schedule);
};

export const createSchedule = async (c: Context) => {
  try {
    const schedule = await c.req.json();
    const createdSchedule = await createScheduleService(schedule);
    if (!createdSchedule) {
      return c.text("Schedule could not be created", 404);
    }
    return c.json({ msg: createdSchedule }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const updateSchedule = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const schedule = await c.req.json();

    const existingSchedule = await getScheduleByIdService(id);
    if (!existingSchedule) {
      return c.json({ msg: "Schedule not found" }, 404);
    }

    const updatedSchedule = await updateScheduleService(id, schedule);
    return c.json({ msg: updatedSchedule }, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const deleteSchedule = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const schedule = await getScheduleByIdService(id);
    if (schedule == undefined)
      return c.json({ msg: "Such a schedule does not exist" }, 404);

    await deleteScheduleService(id);
    return c.json({ msg: "Schedule deleted successfully" }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
