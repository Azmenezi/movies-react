import React, { useCallback, useContext, useState } from "react";
import {
  useMyReviews,
  useDeleteReview,
  useEditReview,
} from "../../api/reviews";
import { FakeCard } from "../Loading/FakeCard";
import UserContext from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function ReviewList() {
  const [user, setUser] = useContext(UserContext);
  const { data: reviewsData, isLoading, isError } = useMyReviews();
  const navigate = useNavigate();

  const deleteReviewMutation = useDeleteReview();

  const editReviewMutation = useEditReview();
  const [editingReview, setEditingReview] = useState(null);
  const [afterEditReview, setAfterEditReview] = useState(null);
  const [deletingReview, setDeletingReview] = useState(null);

  const handleDelete = useCallback(
    (id) => {
      deleteReviewMutation.mutate(id);
    },
    [deleteReviewMutation]
  );
  const handleEdit = useCallback(
    (id, rating, text) => {
      editReviewMutation.mutate({ id, data: { rating, text } });
      setEditingReview(null); // Add this line
    },
    [editReviewMutation]
  );

  if (isLoading)
    return (
      <div className="p-4">
        <div className="  m-3">
          <FakeCard className="w-70" />
        </div>
      </div>
    );
  if (isError) return <div>Error loading reviews</div>;

  const reviews = reviewsData.reviews;

  const handleChangeStatus = () => {
    if (afterEditReview && editReviewMutation.isError) {
      return (
        <div className="bg-purple-400 flex justify-center items-center h-8 rounded text-white">
          something went wrong while editing!
        </div>
      );
    }
    if (afterEditReview && editReviewMutation.isSuccess) {
      return (
        <div className="bg-green-400 flex justify-center items-center h-8 rounded text-white">
          review was edited succesfully!
        </div>
      );
    }
    if (afterEditReview && editReviewMutation.isLoading) {
      return (
        <div className="bg-blue-400 flex justify-center items-center h-8 rounded text-white">
          editing your review...
        </div>
      );
    }
    if (deletingReview && deleteReviewMutation.isError) {
      return (
        <div className="bg-purple-400 flex justify-center items-center h-8 rounded text-white">
          something went wrong while deleting!
        </div>
      );
    }
    if (deletingReview && deleteReviewMutation.isSuccess) {
      return (
        <div className="bg-green-400 flex justify-center items-center h-8 rounded text-white">
          review was deleted succesfully!
        </div>
      );
    }
    if (deletingReview && deleteReviewMutation.isLoading) {
      return (
        <div className="bg-blue-400 flex justify-center items-center h-8 rounded text-white">
          deleting your review...
        </div>
      );
    }
  };

  if (!user) return navigate("/");
  return (
    <div className="p-4">
      {reviews?.length > 0 ? (
        <>
          {reviews?.map((review) => (
            <div key={review._id} className="border p-4 my-2">
              <p>Movie: {review.movieId.name}</p>
              <p>Rating: {review.rating}</p>
              <p>Review: {review.text || ""}</p>

              <button
                onClick={async () => {
                  handleDelete(review._id);
                  setEditingReview(null); // Add this line
                  if (editingReview?._id === review._id)
                    return setDeletingReview(null);
                  await setDeletingReview(null);
                  setDeletingReview(review);
                  setAfterEditReview(null);
                }}
                className="bg-red-500 text-white px-2 py-1 rounded mr-2"
              >
                Delete
              </button>
              <button
                onClick={async () => {
                  if (editingReview?._id === review._id)
                    return setEditingReview(null);
                  await setEditingReview(null);
                  setEditingReview(review);
                }}
                className="bg-blue-500 text-white mb-2 px-2 py-1 rounded"
              >
                Edit
              </button>
              {deletingReview?._id === review._id ||
              afterEditReview?._id === review._id ? (
                <div>{handleChangeStatus()}</div>
              ) : (
                <></>
              )}
              {editingReview && editingReview._id === review._id && (
                <div key={editingReview._id} className="border p-4 my-2">
                  <h2>Edit Review {review.movieId.name}</h2>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleEdit(
                        editingReview._id,
                        e.target.rating.value,
                        e.target.text.value
                      );
                      setAfterEditReview(editingReview);
                      setDeletingReview(null);
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
        </>
      ) : (
        <>
          <div className="flex justify-center items-center">
            <div className="">{reviewsData?.message}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default ReviewList;
