import React from "react";
import { Link } from "react-router-dom";
export default function MyList({ myList }) {
  return (
    <div className="my-8 mx-4">
      <h2 className="text-3xl font-bold">My Watchlist</h2>
      <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-4">
        {myList.map((movie) => (
          <div
            key={movie.imdbID}
            className="max-w-sm rounded overflow-hidden shadow-lg"
          >
            <img
              className="object-fill h-80 w-full"
              src={movie.Poster}
              alt={movie.Title}
            />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{movie.Title}</div>
              <p className="text-gray-700 text-base h-14 overflow-y-scroll">
                {movie.Plot}
              </p>
            </div>
          </div>
        ))}
      </div>
      <Link to="/">
        <button class="  text-black font-bold py-2 px-4 rounded-full">
          Back to Home
        </button>
      </Link>
    </div>
  );
}
