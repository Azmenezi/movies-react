// src/components/AddMovie.js
import { useState } from "react";
import { useAddMovie } from "../../api/movies";
import { handleAddingMovie } from "../../func/functions";

function AddMovie() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");

  const addMovieMutation = useAddMovie();

  const handleSubmit = (e) => {
    e.preventDefault();
    addMovieMutation.mutate(
      { name, releaseDate },
      {
        onSuccess: () => {
          setIsOpen(false);
          setName("");
          setReleaseDate("");
        },
      }
    );
  };

  return (
    <div>
      <div  className="flex justify-center">
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded flex justify-center"
        onClick={() => setIsOpen(true)}
      >
        Add Movie
      </button>
      </div>
      {isOpen && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50">
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded">
            <h2 className="font-bold mb-4">Add Movie</h2>
            <div className="mb-4">
              <label className="block mb-2">Movie Name</label>
              <input
                type="text"
                className="w-full border rounded px-2 py-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2">Release Date</label>
              <input
                type="date"
                className="w-full border rounded px-2 py-1"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Save
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white rounded"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="mt-2">{handleAddingMovie(addMovieMutation)}</div>
    </div>
  );
}

export default AddMovie;
