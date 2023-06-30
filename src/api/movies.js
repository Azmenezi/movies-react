// src/api/movies.js
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "./index";

export function useGetMovies() {
  return useQuery(["movies"], () =>
    axios.get("/movies/?limit=999").then((res) => res.data)
  );
}

export function useGetMovieById(id) {
  return useQuery(["movie", id], () =>
    axios.get(`/movies/${id}`).then((res) => res.data)
  );
}

export function useAddMovie() {
  return useMutation((data) =>
    axios.post("/movies", data).then((res) => res.data)
  );
}

export function useGetMoviesByPages(page, limit) {
  return useQuery(["movies", page], () =>
    axios.get(`/movies/?page=${page}&limit=${limit}`).then((res) => res.data)
  );
}
