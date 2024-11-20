import { relations } from "drizzle-orm";
import {
  integer,
  pgTable,
  varchar,
  pgEnum,
  serial,
  timestamp,
  boolean,
  decimal,
  text,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["admin", "user"]);
export const movieStatusEnum = pgEnum("movie_status", [
  "airing",
  "not_aired",
  "aired",
]);

export const seatCategoryEnum = pgEnum("seat_category", [
  "regular",
  "vip",
  "vvip",
]);

export const paymentStatusEnum = pgEnum("payment_status", [
  "pending",
  "completed",
  "failed",
]);
export const reservationStatusEnum = pgEnum("reservation_status", [
  "pending",
  "confirmed",
  "cancelled",
]);

export const users = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  role: userRoleEnum("role").default("user").notNull(),
  password: varchar({ length: 12 }).notNull(),
});

export const movies = pgTable("movies", {
  id: serial("id").primaryKey(),
  tite: varchar("title").notNull(),
  duration: integer("duartion").notNull(),
  genre: varchar("genre").notNull(),
  poster: varchar("poster").notNull(),
  phoneNumber: varchar("phone_number", { length: 20 }),
  trailer: varchar("trailer").notNull(),
});

export const movieSchedules = pgTable("schedules", {
  id: serial("id").primaryKey(),
  movieId: integer("movie_id").references(() => movies.id),
  status: movieStatusEnum("status").default("not_aired").notNull(),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("start_time").notNull(),
  availableSeats: integer("available_seats").default(300).notNull(),
});

export const seats = pgTable("seats", {
  id: serial("id").primaryKey(),
  seatNumber: varchar("seat_number", { length: 10 }).notNull().unique(),
  category: seatCategoryEnum("category").notNull(),
  price: integer("price").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  movieScheduleId: integer("movie_schedule_id")
    .references(() => movieSchedules.id)
    .notNull(),
  seatId: integer("seat_id")
    .references(() => seats.id)
    .notNull(),
  status: reservationStatusEnum("status").default("pending").notNull(),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  paymentStatus: paymentStatusEnum("payment_status")
    .default("pending")
    .notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Tickets Table
export const tickets = pgTable("tickets", {
  id: serial("id").primaryKey(),
  reservationId: integer("reservation_id")
    .references(() => reservations.id)
    .notNull(),
  ticketNumber: varchar("ticket_number", { length: 50 }).notNull().unique(),
  qrCode: text("qr_code"),
  isUsed: boolean("is_used").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  reservations: many(reservations),
}));

export const moviesRelations = relations(movies, ({ many }) => ({
  schedules: many(movieSchedules),
}));

export const movieSchedulesRelations = relations(
  movieSchedules,
  ({ one, many }) => ({
    movie: one(movies, {
      fields: [movieSchedules.movieId],
      references: [movies.id],
    }),
    reservations: many(reservations),
  })
);

export const seatsRelations = relations(seats, ({ many }) => ({
  reservations: many(reservations),
}));

export const reservationsRelations = relations(reservations, ({ one }) => ({
  user: one(users, {
    fields: [reservations.userId],
    references: [users.id],
  }),
  movieSchedule: one(movieSchedules, {
    fields: [reservations.movieScheduleId],
    references: [movieSchedules.id],
  }),
  seat: one(seats, {
    fields: [reservations.seatId],
    references: [seats.id],
  }),
  ticket: one(tickets, {
    fields: [reservations.id],
    references: [tickets.reservationId],
  }),
}));
