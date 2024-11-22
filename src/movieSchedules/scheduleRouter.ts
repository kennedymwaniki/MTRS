import { Hono } from "hono";
import {
  getSchedules,
  createSchedule,
  deleteSchedule,
  getSchedule,
  updateSchedule,
} from "./scheduleController";

export const scheduleRouter = new Hono();

scheduleRouter.get("/schedules", getSchedules);
scheduleRouter.post("/schedules", createSchedule);
scheduleRouter.get("/schedules/:id", getSchedule);
scheduleRouter.put("/schedules/:id", updateSchedule);
scheduleRouter.delete("/schedules/:id", deleteSchedule);
