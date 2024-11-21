import { Context } from "hono";
import {
  createMovieService,
  deleteMovieService,
  getMovieByIdService,
  getMoviesService,
  updateMovieService,
} from "./movieService";

export const getMovies = async (c: Context) => {
  const movies = await getMoviesService();
  return c.json(movies);
};

export const getMovie = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const movie = await getMovieByIdService(id);
  if (!movie) {
    return c.json({ msg: "We could not find such a movie" }, 404);
  }
  return c.json(movie);
};

export const createMovie = async (c: Context) => {
  try {
    const Movie = await c.req.json();
    const movie = await createMovieService(Movie);
    if (!movie) {
      return c.text("Movie could not be created", 404);
    }
    return c.json({ msg: movie }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const deleteMovie = async (c: Context) => {
  try {
    const id = Number(c.req.param("id"));

    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Movie = await getMovieByIdService(id);

    if (Movie == undefined)
      return c.json({ msg: "Such a Movie does not exist" }, 404);

    const res = await deleteMovieService(id);
    if (!res) return c.text("Movie not deleted", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ errror: error?.message }, 400);
  }
};

export const updateMovie = async (c: Context) => {
  try {
    const id = Number(c.req.param());
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const Movie = await c.req.json();

    const movie = await getMovieByIdService(id);
    if (movie == undefined) return c.json({ msg: "Movie not found" }, 404);

    const update = await updateMovieService(id, Movie);
    if (!update) return c.text("Movie was not updated", 404);
    return c.json({ msg: update }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
