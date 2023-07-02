import MovieCard from "./MovieCard";
import { useGetMovies } from "../../api/movies";
import { FakeCard } from "../Loading/FakeCard";

function Movies() {
  const { data: moviesData, status, error, isLoading } = useGetMovies();
  const movies = moviesData?.movies;
  return (
    <div className="flex flex-col space-y-4">
      {isLoading ? (
        <>
          <div className="grid grid-cols-3 gap-2 m-3">
            <FakeCard />
          </div>
        </>
      ) : (
        <>
          <MovieCard movies={movies} status={status} error={error} />
        </>
      )}
    </div>
  );
}

export default Movies;
