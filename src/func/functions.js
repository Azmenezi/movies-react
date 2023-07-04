export function addingToWatchlist(addRemoveWatchlist) {
  if (
    addRemoveWatchlist?.data?.message.includes(
      "was succesfully removed from your watchlist"
    )
  )
    return (
      <div className="bg-red-400 flex justify-center items-center h-8 rounded text-white">
        succesfully removed from watchlist
      </div>
    );
  if (
    addRemoveWatchlist?.data?.message.includes(
      "was succesfully added to your watchlist"
    )
  )
    return (
      <div className="bg-green-400  flex justify-center items-center h-8 rounded text-white">
        succesfully added to your watchlist
      </div>
    );
}

export function handleChangeStatus(
  afterEditReview,
  editReviewMutation,
  deletingReview,
  deleteReviewMutation
) {
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
}

export function handleChange(addReviewMutation) {
  if (addReviewMutation?.isError) {
    return (
      <div className="bg-purple-400 flex justify-center items-center h-8 rounded text-white">
        something went wrong while adding your review!
      </div>
    );
  }
  if (addReviewMutation?.isSuccess) {
    return (
      <div className="bg-green-400 flex justify-center items-center h-8 rounded text-white">
        review was added succesfully!
      </div>
    );
  }
  if (addReviewMutation?.isLoading) {
    return (
      <div className="bg-blue-400 flex justify-center items-center h-8 rounded text-white">
        Adding your review...
      </div>
    );
  }
}

export function handleAddingMovie(addReviewMutation) {
    if (addReviewMutation?.isError) {
      return (
        <div className="bg-purple-400 flex justify-center items-center h-8 rounded text-white">
          something went wrong while adding the movie!
        </div>
      );
    }
    if (addReviewMutation?.isSuccess) {
      return (
        <div className="bg-green-400 flex justify-center items-center h-8 rounded text-white">
          movie was added succesfully!
        </div>
      );
    }
    if (addReviewMutation?.isLoading) {
      return (
        <div className="bg-blue-400 flex justify-center items-center h-8 rounded text-white">
          Adding the movie...
        </div>
      );
    }
  }
  