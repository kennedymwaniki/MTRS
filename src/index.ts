import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { userRouter } from "./users/userRoutes";
import { cors } from "hono/cors";
import { movieRouter } from "./movies/movieRouter";
import { reservationRouter } from "./reservations/reservationRouter";
import { ticketRouter } from "./tickets/ticketRouter";
import { seatsRouter } from "./seats/seatsRouter";
import { scheduleRouter } from "./movieSchedules/scheduleRouter";
import { createMany } from "drizzle-orm";

const app = new Hono();

app.use(cors());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.route("/api", userRouter);
app.route("/api", movieRouter);
app.route("/api", reservationRouter);
app.route("/api", ticketRouter);
app.route("/api", seatsRouter);
app.route("/api", scheduleRouter);

const port = 9000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
