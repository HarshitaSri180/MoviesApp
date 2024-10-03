import React, { useState, useEffect } from "react";

export default function SecondComp({ setMyList }) {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("Batman");
  const [showToast, setShowToast] = useState(false); // State to manage toast visibility
  const apiKey = "b477544";

  useEffect(() => {
    const searchUrl = `https://www.omdbapi.com/?s=${searchTerm}&apikey=${apiKey}`;

    if (searchTerm) {
      fetch(searchUrl)
        .then((response) => response.json())
        .then((data) => {
          if (data.Response === "True") {
            const moviePromises = data.Search.map((movie) => {
              const detailUrl = `http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${apiKey}`;
              return fetch(detailUrl).then((res) => res.json());
            });

            Promise.all(moviePromises)
              .then((movieDetails) => setMovies(movieDetails))
              .catch((err) => console.error("Error fetching details:", err));
          } else {
            console.log("No movies found");
            setMovies([]);
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [searchTerm]);

  const handleSearch = () => {
    if (searchTerm) {
      setSearchTerm(searchTerm);
    }
  };

  const addToMyList = (movie) => {
    setMyList((prevList) => [...prevList, movie]);
    setShowToast(true); // Show the toast message
    setTimeout(() => setShowToast(false), 3000); // Hide after 3 seconds
  };

  return (
    <div className="flex mx-4">
      <div className="flex-1">
        {/* Main Content */}
        <div className="w-full heading  my-8 ">
          <h1 className="px-6 text-4xl font-bold text-center">
            Welcome to <span className="text-red-900">Watchlist</span>
          </h1>
          <p className="px-6 py-4 text-[17px] text-center">
            Browse movies, add them to watchlists and share them with friends.
          </p>
          <p className="px-6 text-[17px] text-center">
            Just click the Add to List Button to add a movie, the poster to see
            more details.
          </p>
        </div>

        {/* Search bar */}
        <div className=" flex rounded-md border-2 border-red-900 overflow-hidden md:w-4/12 w-full font-[sans-serif] my-8 mx-auto">
          <input
            type="text"
            placeholder="Search Something..."
            className="w-full outline-none bg-white text-gray-600 text-sm px-4 py-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="button"
            className="flex items-center justify-center bg-red-900 px-5"
            onClick={handleSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16px"
              className="fill-white"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z" />
            </svg>
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-4 my-8 mx-8">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              className="max-w-sm rounded overflow-hidden shadow-lg"
            >
              <img
                className="object-fill h-80 w-full "
                src={movie.Poster}
                alt={movie.Title}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{movie.Title}</div>
                <p className="text-gray-700 scrollbar text-base h-14 overflow-y-scroll">
                  {movie.Plot}
                </p>
              </div>
              <div
                className="px-6 cursor-pointer"
                onClick={() => addToMyList(movie)}
              >
                <button class="bg-red-900 hover:bg-red-700 text-white font-bold py-1 mb-2 px-4 rounded-full">
                  Add to List
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Toast Notification */}
        {showToast && (
          <div className="fixed top-0 right-0 m-4 p-4 bg-white rounded shadow-lg text-gray-500">
            <div className="flex items-center">
              <div className="inline-flex items-center justify-center w-8 h-8 text-green-500 bg-green-100 rounded-lg">
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                </svg>
                <span className="sr-only">Check icon</span>
              </div>
              <span className="ml-2 text-sm font-normal">
                Item added to list successfully!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
