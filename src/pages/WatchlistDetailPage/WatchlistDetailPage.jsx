import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getWatchlistById,
  searchMovies,
  addMovieToWatchlist,
  removeMovieFromWatchlist,
} from "../../api/watchlistService";
import Loader from "../../components/common/Loader/Loader";
import Card from "../../components/common/Card/Card";
import styles from "./WatchlistDetailPage.module.css"; // This line connects the styles
import { FiArrowLeft, FiSearch, FiPlusCircle, FiMinusCircle } from "react-icons/fi";
import { useDebounce } from "../../hooks/useDebounce";
import Input from "../../components/common/Input/Input";

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
      const newWatchlistMovie = await addMovieToWatchlist(id, movieData);
      setWatchlist((prev) => ({
        ...prev,
        movies: [newWatchlistMovie, ...prev.movies],
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
      <div className={styles.centered}>
        <Loader />
      </div>
    );
  if (error) return <div className={`${styles.centered} ${styles.errorText}`}>{error}</div>;

  return (
    <div className={styles.detailPageContainer}>
      <Card className={styles.contentCard}>
        <Link to="/dashboard" className={styles.backLink}>
          <FiArrowLeft /> Back to Dashboard
        </Link>
        <h1 className={styles.title}>{watchlist.name}</h1>

        <div className={styles.searchSection}>
          <div className={styles.searchInputWrapper}>
            <FiSearch className={styles.searchIcon} />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for a movie to add..."
              className={styles.searchInput}
            />
          </div>
          {isSearching && <Loader />}
        </div>

        {searchResults.length > 0 && (
          <>
            <h2 className={styles.subHeader}>Search Results</h2>
            <div className={styles.resultsGrid}>
              {searchResults.map((movie) => (
                <div key={movie.id} className={styles.movieCard}>
                  <img
                    src={
                      movie.posterPath
                        ? `https://image.tmdb.org/t/p/w500${movie.posterPath}`
                        : "https://via.placeholder.com/500x750?text=No+Image"
                    }
                    alt={movie.title}
                    className={styles.poster}
                  />
                  <div className={styles.movieInfo}>
                    <h3 className={styles.movieTitle}>{movie.title}</h3>
                    <button className={styles.addButton} onClick={() => handleAddMovie(movie)}>
                      <FiPlusCircle />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <h2 className={styles.subHeader}>Movies in this list</h2>
        <div className={styles.movieGrid}>
          {watchlist.movies.length > 0 ? (
            watchlist.movies.map((movie, index) => (
              <motion.div
                key={movie.id}
                className={styles.movieCard}
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
                  className={styles.poster}
                />
                <div className={styles.movieInfo}>
                  <h3 className={styles.movieTitle}>{movie.movieTitle}</h3>
                  <button
                    className={`${styles.removeButton} ${styles.addButton}`}
                    onClick={() => handleRemoveMovie(movie.movieId)}>
                    <FiMinusCircle />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <p className={styles.emptyState}>
              This watchlist is empty. Use the search bar above to add some movies!
            </p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default WatchlistDetailPage;
