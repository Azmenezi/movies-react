import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "./index";

// src/api/watchlist.js
export function useGetWatchlist() {
  return useQuery(["watchlist"], () =>
    axios.get("/movies/watchlist").then((res) => res.data)
  );
}

export function useAddRemoveWatchlist() {
  return useMutation((id) =>
    axios.put(`/movies/watchlist/${id}`).then((res) => res.data)
  );
}
