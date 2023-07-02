import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "./index";

// src/api/genres.js
export function useGetGenres() {
  return useQuery(["genres"], () =>
    axios.get("/genres/").then((res) => res.data),
    {
      onError: (error) => {
        window.alert(error.response.data.error.message);
      },
    }
  );
}

export function useCreateGenre() {
  return useMutation((data) =>
    axios.post("/genres", data).then((res) => res.data),
    {
      onError: (error) => {
        window.alert(error.response.data.error.message);
      },
    }
  );
}

export function useAddMoviesToGenre() {
  return useMutation(({ genreId, movieId }) =>
    axios.put(`/genres/${genreId}/${movieId}`).then((res) => res.data),
    {
      onError: (error) => {
        window.alert(error.response.data.error.message);
      },
    }
  );
}
