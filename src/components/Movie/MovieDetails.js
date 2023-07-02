import React from "react";
import { useGetMovieById } from "../../api/movies";
import { useParams } from "react-router-dom";

import AddReview from "../Review/AddReview";

function MovieDetails() {
  const { movieId } = useParams();
  const { data: movie, isLoading, isError } = useGetMovieById(movieId);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading movie details</div>;

  return (
    <>
      <div className="p-4 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-4">{movie.name}</h2>
        <p className="text-lg mb-2">
          <strong>Rating:</strong> {movie.averageRate}
        </p>
        <p className="text-lg mb-2">
          <strong>Release Date:</strong>{" "}
          {new Date(movie.releaseDate).toDateString()}
        </p>

        <h3 className="text-xl font-bold mt-4 mb-2">Genres</h3>
        {movie.genres.map((genre) => (
          <div key={genre._id} className="mb-2">
            <p>{genre.name}</p>
          </div>
        ))}

        <h3 className="text-xl font-bold mt-4 mb-2">Actors</h3>
        {movie.actors.map((actor) => (
          <div key={actor._id} className="mb-2">
            <p>
              <strong>Role:</strong> {actor.role}
            </p>
            <p>
              <strong>Actor:</strong> {actor.actor.name}
            </p>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white rounded shadow">
        <h3 className="text-xl font-bold mt-4 mb-2">Reviews</h3>
        <AddReview movie={movie} />
        <div className="mt-3">
          {movie.reviews.map((review) => (
            <div key={review._id} className="mb-2">
              <p className="font-bold">{review.userId.username}</p>
              <p>
                rating: {review.rating}, {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MovieDetails;
