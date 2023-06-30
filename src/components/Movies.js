// src/components/Movies.js
import { useContext } from "react";
import { useGetMovies } from "../api/movies";
import AddMovie from "./AddMovie";
import StaffContext from "../context/StaffContext";

function Movies() {
  const [staff, setStaff] = useContext(StaffContext);
  const { data: moviesData, status, error } = useGetMovies();

  const movies = moviesData?.movies;
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "error") {
    return <div>Error: {error.message}</div>;
  }
  console.log("Staff ", staff);
  return (
    <div className="flex flex-col space-y-4">
      {!staff ? (
        <></>
      ) : (
        <div className="mt-4 mx-3">
          <AddMovie />
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 m-3">
        {movies.map((movie) => (
          <div className="border p-4" key={movie.id}>
            <h2 className="font-bold text-lg">{movie.name}</h2>
            <p className="text-sm text-gray-500">
              {movie.releaseDate.replace("T00:00:00.000Z", "")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
