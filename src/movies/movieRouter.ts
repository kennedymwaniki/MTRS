import { Hono } from "hono";
import { getMovie, getMovies } from "./movieController";

export const movieRouter = new Hono();
movieRouter.get("/movies", getMovies);
movieRouter.get("movies/:id", getMovie);
