import React, { useCallback, useState } from "react";
import { useMyReviews, useDeleteReview, useEditReview } from "../api/reviews";

function ReviewList() {
  const { data: reviewsData, isLoading, isError } = useMyReviews();

  const deleteReviewMutation = useDeleteReview();

  const editReviewMutation = useEditReview();

  const [editingReview, setEditingReview] = useState(null);

  const handleDelete = useCallback(
    (id) => {
      deleteReviewMutation.mutate(id);
    },
    [deleteReviewMutation]
  );

  const handleEdit = useCallback(
    (id, rating, text) => {
      editReviewMutation.mutate({ id, data: { rating, text } });
    },
    [editReviewMutation]
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading reviews</div>;
  console.log("reviews");

  const reviews = reviewsData.reviews;
  console.log(reviews);
  if (!reviews || reviews.message === "you have zero reviews!") {
    return null;
  }

  return (
    <div className="p-4">
      {reviews?.map((review) => (
        <div key={review._id} className="border p-4 my-2">
          <p>Movie: {review.movieId.name}</p>
          <p>Rating: {review.rating}</p>
          <p>Review: {review.text}</p>

          <button
            onClick={() => handleDelete(review._id)}
            className="bg-red-500 text-white px-2 py-1 rounded mr-2"
          >
            Delete
          </button>
          <button
            onClick={async () => {
              console.log(editingReview, review);
              if (editingReview?._id === review._id)
                return setEditingReview(null);
              await setEditingReview(null);
              setEditingReview(review);
            }}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            Edit
          </button>
          {editingReview && editingReview._id === review._id && (
            <div className="border p-4 my-2">
              <h2>Edit Review {review.movieId.name}</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEdit(
                    editingReview._id,
                    e.target.rating.value,
                    e.target.text.value
                  );
                  setEditingReview(null);
                }}
              >
                <label>
                  Rating:
                  <input
                    type="number"
                    name="rating"
                    defaultValue={editingReview.rating}
                    className="border px-2 py-1 rounded"
                  />
                </label>
                <label>
                  Review:
                  <textarea
                    name="text"
                    defaultValue={editingReview.text}
                    className="border px-2 py-1 rounded"
                  />
                </label>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-2 py-1 mx-1 ml-3 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingReview(null)}
                  className="bg-red-500 text-white pr-4 pl-4 py-1 mx-1 rounded"
                >
                  X
                </button>
              </form>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default ReviewList;
