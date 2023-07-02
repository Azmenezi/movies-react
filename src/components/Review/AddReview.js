import React, { useCallback, useState } from "react";
import { useAddReview } from "../../api/reviews";

const AddReview = ({ movie }) => {
  const addReviewMutation = useAddReview();

  const [addingReview, setAddingReview] = useState(null);

  const handleAddingReview = useCallback(
    (id, rating, text) => {
      addReviewMutation.mutate({ id, data: { rating, text } });
    },
    [addReviewMutation]
  );
  return (
    <>
      <button
        onClick={async () => {
          if (addingReview?._id === movie._id) return setAddingReview(null);
          await setAddingReview(null);
          setAddingReview(movie);
        }}
        className="bg-blue-500 text-white px-2 py-1 rounded"
      >
        Add A Review
      </button>
      {addingReview && addingReview._id === movie._id && (
        <div className="border p-4 my-2">
          <h2>Review {movie.name}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddingReview(
                addingReview._id,
                e.target.rating.value,
                e.target.text.value
              );
              setAddingReview(null);
            }}
          >
            <label>
              Rating:
              <input
                type="number"
                name="rating"
                className="border px-2 py-1 rounded"
              />
            </label>
            <label>
              Review:
              <textarea name="text" className="border px-2 py-1 rounded" />
            </label>
            <button
              type="submit"
              className="bg-green-500 text-white px-2 py-1 mx-1 ml-3 rounded"
            >
              Add
            </button>
            <button
              onClick={() => setAddingReview(null)}
              className="bg-red-500 text-white pr-4 pl-4 py-1 mx-1 rounded"
            >
              X
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AddReview;
