// src/api/reviews.js
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "./index";

export function useMyReviews() {
  return useQuery(["myReviews"], () =>
    axios.get("/reviews/my-reviews").then((res) => res.data)
  );
}

export function useDeleteReview() {
  return useMutation((id) =>
    axios.delete(`/reviews/delete/${id}`).then((res) => res.data)
  );
}

export function useEditReview() {
  return useMutation(({ id, data }) =>
    axios.put(`/reviews/edit/${id}`, data).then((res) => res.data)
  );
}

export function useAddReview() {
  return useMutation(({ data }) =>
    axios.post(`/reviews/`, data).then((res) => res.data)
  );
}
