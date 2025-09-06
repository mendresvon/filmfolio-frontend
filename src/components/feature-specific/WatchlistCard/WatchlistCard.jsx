import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import styles from "./WatchlistCard.module.css";

const WatchlistCard = ({ watchlist, index }) => {
  // --- START: DEBUGGING LOG ---
  console.log(`--- WatchlistCard: "${watchlist.name}" ---`);
  console.log("Received watchlist object:", watchlist);
  console.log("Number of movies:", watchlist.movies.length);
  // --- END: DEBUGGING LOG ---

  const renderCover = () => {
    const { movies } = watchlist;

    if (movies.length === 0) {
      console.log(`Rendering case 1 (0 movies) for "${watchlist.name}"`);
      return (
        <div className={styles.placeholderCover}>
          <div className={styles.placeholderIcon}>
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      );
    } else if (movies.length > 1) {
      console.log(`Rendering case 2 (GRID) for "${watchlist.name}"`);
      const coverItems = movies.slice(0, 4);
      while (coverItems.length < 4) {
        coverItems.push(null);
      }
      return (
        <div className={styles.gridCover}>
          {coverItems.map((item, index) =>
            item ? (
              <img
                key={item.id}
                src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
                alt={item.movieTitle}
                className={styles.coverImage}
              />
            ) : (
              <div key={`placeholder-${index}`} className={styles.gridPlaceholderSlot} />
            )
          )}
        </div>
      );
    } else {
      console.log(`Rendering case 3 (SINGLE poster) for "${watchlist.name}"`);
      return (
        <img
          src={`https://image.tmdb.org/t/p/w500${movies[0].posterPath}`}
          alt={movies[0].movieTitle}
          className={styles.coverImage}
        />
      );
    }
  };

  return (
    <Link to={`/watchlist/${watchlist.id}`} className={styles.cardLink}>
      <motion.div
        className={styles.cardWrapper}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}>
        <div className={styles.card}>
          <div className={styles.textInfo}>
            <h3>{watchlist.name}</h3>
            <p className={styles.movieCount}>
              {watchlist.movies.length} {watchlist.movies.length === 1 ? "movie" : "movies"}
            </p>
          </div>
          <div className={styles.coverContainer}>{renderCover()}</div>
        </div>
      </motion.div>
    </Link>
  );
};

export default WatchlistCard;
