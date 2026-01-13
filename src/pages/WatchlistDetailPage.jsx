import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getWatchlistById,
  searchMovies,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
} from "../api/watchlistService";
import Loader from "../components/common/Loader";
import Card from "../components/common/Card";
import { FiArrowLeft, FiSearch, FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { useDebounce } from "../hooks/useDebounce";
import Input from "../components/common/Input";

const WatchlistDetailPage = () => {
  const { id } = useParams();
  const [watchlist, setWatchlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const data = await getWatchlistById(id);
        setWatchlist(data);
      } catch (err) {
        setError("Watchlist not found or you do not have permission to view it.");
      } finally {
        setLoading(false);
      }
    };
    fetchWatchlist();
  }, [id]);

  // trigger search when debounced query changes
  useEffect(() => {
    if (debouncedSearchQuery) {
      setIsSearching(true);
      searchMovies(debouncedSearchQuery)
        .then((data) => setSearchResults(data))
        .catch((err) => console.error("Search failed:", err))
        .finally(() => setIsSearching(false));
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchQuery]);

  const handleAddMovie = async (movie) => {
    try {
      const movieData = {
        movieId: movie.id,
        movieTitle: movie.title,
        posterPath: movie.posterPath,
      };
      const updatedMoviesList = await addMovieToWatchlist(id, movieData);
      setWatchlist((prev) => ({
        ...prev,
        movies: updatedMoviesList,
      }));
    } catch (err) {
      alert(err.msg || "Failed to add movie.");
    }
  };

  const handleRemoveMovie = async (movieIdToRemove) => {
    try {
      await removeMovieFromWatchlist(id, movieIdToRemove);
      setWatchlist((prev) => ({
        ...prev,
        movies: prev.movies.filter((movie) => movie.movieId !== movieIdToRemove),
      }));
    } catch (err) {
      alert("Failed to remove movie.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader />
      </div>
    );
  if (error) return <div className="flex justify-center items-center min-h-[50vh] text-error">{error}</div>;

  return (
    <div className="flex justify-center items-start pt-8 min-h-[80vh]">
      <Card className="w-full max-w-[1000px] py-8 px-12 max-md:py-6 max-md:px-4">
        <Link to="/dashboard" className="inline-flex items-center gap-2 text-text-primary no-underline mb-8 transition-colors hover:text-text-headings">
          <FiArrowLeft /> Back to Dashboard
        </Link>
        <h1 className="font-netflix text-7xl max-md:text-4xl font-bold text-text-headings mb-12 max-md:mb-8 text-center tracking-wide">{watchlist.name}</h1>

        {watchlist.description && (
          <p className="text-text-primary text-lg text-center max-w-[600px] mx-auto -mt-8 mb-12 opacity-80 leading-relaxed">
            {watchlist.description}
          </p>
        )}

        <div className="mb-16 relative flex items-center gap-4">
          <div className="relative w-full">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-text-primary opacity-50 text-xl pointer-events-none z-10" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a movie to add..."
              className="!mb-0"
              style={{ paddingLeft: "3rem" }}
            />
          </div>
          {isSearching && <Loader />}
        </div>

        {searchResults.length > 0 && (
          <>
            <h2 className="text-2xl max-md:text-xl font-medium text-text-headings mb-8 pb-4 border-b border-glass-border">Search Results</h2>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] max-md:grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-6 max-md:gap-4 mb-12 pb-8 border-b border-glass-border">
              {searchResults.map((movie) => (
                <div key={movie.id} className="relative rounded-lg overflow-hidden transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group">
                  <img
                    src={
                      movie.posterPath
                        ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                        : "https://via.placeholder.com/500x750?text=No+Image"
                    }
                    alt={movie.title}
                    className="w-full h-auto block"
                  />
                  <div className="absolute bottom-0 left-0 right-0 py-4 px-2 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex justify-between items-end opacity-0 transition-opacity group-hover:opacity-100">
                    <h3 className="text-white text-sm font-medium m-0 leading-tight">{movie.title}</h3>
                    <button className="bg-transparent border-none text-white/80 text-3xl cursor-pointer transition-all p-0 leading-none shrink-0 ml-2 hover:text-[#4ade80] hover:scale-110" onClick={() => handleAddMovie(movie)}>
                      <FiPlusCircle />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <h2 className="text-2xl max-md:text-xl font-medium text-text-headings mb-8 pb-4 border-b border-glass-border">Movies in this list</h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] max-md:grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-6 max-md:gap-4">
          {watchlist.movies.length > 0 ? (
            watchlist.movies.map((movie, index) => (
              <motion.div
                key={movie._id}
                className="relative rounded-lg overflow-hidden transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}>
                <img
                  src={
                    movie.posterPath
                      ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt={movie.movieTitle}
                  className="w-full h-auto block"
                />
                <div className="absolute bottom-0 left-0 right-0 py-4 px-2 bg-gradient-to-t from-black/95 via-black/50 to-transparent flex justify-between items-end opacity-0 transition-opacity group-hover:opacity-100">
                  <h3 className="text-white text-sm font-medium m-0 leading-tight">{movie.movieTitle}</h3>
                  <button
                    className="bg-transparent border-none text-white/80 text-3xl cursor-pointer transition-all p-0 leading-none shrink-0 ml-2 hover:text-[#f87171] hover:scale-110"
                    onClick={() => handleRemoveMovie(movie.movieId)}>
                    <FiMinusCircle />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-center py-16 text-text-primary opacity-70">
              This watchlist is empty. Use the search bar above to add some movies!
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default WatchlistDetailPage;
