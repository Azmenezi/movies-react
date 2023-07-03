import MovieCard from "./MovieCard";
import { useGetMovies } from "../../api/movies";
import { FakeCard } from "../Loading/FakeCard";
import RecommendedCard from "./RecommendedCard";

function Movies() {
  const {
    data: moviesData,
    status: moviesStatus,
    error: moviesError,
    isLoading,
  } = useGetMovies();

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
        <div>
          {moviesData && moviesData?.recommendations ? (
            <>
              <RecommendedCard
                movies={moviesData?.recommendations}
                status={moviesStatus}
                error={moviesError}
              />
            </>
          ) : (
            <>
              <MovieCard
                movies={movies}
                status={moviesStatus}
                error={moviesError}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Movies;
