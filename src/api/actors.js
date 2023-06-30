import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "./index";

// src/api/actors.js
export function useGetActors() {
    return useQuery(["actors"], () =>
      axios.get("/actors/").then((res) => res.data)
    );
  }
  
  export function useCreateActor() {
    return useMutation((data) =>
      axios.post("/actors/", data).then((res) => res.data)
    );
  }
  
  export function useAddMoviesToActor() {
    return useMutation(({ actorId, movieId, role }) =>
      axios.put(`/actors/${actorId}/${movieId}`, { role }).then((res) => res.data)
    );
  }