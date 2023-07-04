import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddMovie from "./AddMovie";
import StaffContext from "../../context/StaffContext";
import { useAddRemoveWatchlist } from "../../api/watchlist";
import { addingToWatchlist } from "../../func/functions";

const RecommendedCard = ({ movies, error, status }) => {
  const [staff, setStaff] = useContext(StaffContext);
  const navigate = useNavigate();

  const addRemoveWatchlist = useAddRemoveWatchlist(); // Call the custom hook
  const [addingReview, setAddingReview] = useState(null);
  const handleAddRemoveWatchlist = async (id) => {
    try {
      await addRemoveWatchlist.mutateAsync(id); // Call the hook function
    } catch (error) {
      console.error("Error adding/removing from watchlist:", error);
    }
  };

  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }
  if (status === "loading") {
    return <div>loading...</div>;
  }

  return (
    <>
     {staff && (
        <div className="mx-4 mt-5">
          <AddMovie />
        </div>
      )}
      <div className="grid grid-cols-3 gap-2 m-3">
        {movies?.map((movie) => (
          <div className="border p-4" key={movie.movie._id}>
            <h2 className="font-bold text-lg">{movie.movie.name}</h2>
            <p className="text-[#ee9bbc] ">rating: {movie.movie.averageRate}</p>
            <p className="text-sm text-gray-500">
              {movie.releaseDate
                ? movie.releaseDate.replace("T00:00:00.000Z", "")
                : ""}
            </p>
            <button
              onClick={() => {
                setAddingReview(movie.movie._id);
                handleAddRemoveWatchlist(movie.movie._id);
              }} // Call the callback function
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Watchlist
            </button>
            <button
              className="bg-blue-500 text-white m-4 px-2 py-1 rounded"
              onClick={() => navigate(`/movies/${movie.movie._id}`)}
            >
              View Details
            </button>
            <div>
              {addingReview &&
                addingReview === movie.movie._id &&
                addingToWatchlist(addRemoveWatchlist)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default RecommendedCard;
