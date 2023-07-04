import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// Import the custom hook

import AddMovie from "./AddMovie";
import StaffContext from "../../context/StaffContext";

import { useAddRemoveWatchlist } from "../../api/watchlist";

const MovieCard = ({ movies, error, status }) => {
  const [staff, setStaff] = useContext(StaffContext);
  const navigate = useNavigate();

  const addRemoveWatchlist = useAddRemoveWatchlist(); // Call the custom hook

  const [addingReview, setAddingReview] = useState(null);

  const addingToWatchlist = () => {
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
  };
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

  return (
    <>
      {staff && (
        <div className="mx-4 mt-5">
          <AddMovie />
        </div>
      )}
      <div className="grid grid-cols-3 gap-2 m-3">
        {movies.map((movie) => (
          <div className="border p-4" key={movie._id}>
            <h2 className="font-bold text-lg">{movie.name}</h2>
            <p className="text-[#ee9bbc] ">rating: {movie.averageRate}</p>
            <p className="text-sm text-gray-500">
              {movie.releaseDate.replace("T00:00:00.000Z", "")}
            </p>
            <button
              onClick={() => {
                setAddingReview(movie._id);
                handleAddRemoveWatchlist(movie._id);
              }} // Call the callback function
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Watchlist
            </button>
            <button
              className="bg-blue-500 text-white m-4 px-2 py-1 rounded"
              onClick={() => navigate(`/movies/${movie._id}`)}
            >
              View Details
            </button>
            <div>
              {addingReview &&
                addingReview === movie._id &&
                addingToWatchlist()}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MovieCard;
