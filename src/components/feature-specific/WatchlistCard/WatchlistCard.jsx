import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEdit3, FiCheck, FiX, FiTrash2 } from "react-icons/fi";
import { updateWatchlist } from "../../../api/watchlistService";
import styles from "./WatchlistCard.module.css";

const WatchlistCard = ({ watchlist, index, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(watchlist.name);

  const renderCover = () => {
    // ... This function is correct and remains unchanged
    const { movies } = watchlist;
    if (movies.length === 0) {
      return (
        <div className={styles.placeholderCover}>
          <div className={styles.placeholderIcon}>
            <div /><div /><div /><div />
          </div>
        </div>
      );
    } else if (movies.length > 1) {
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
      return (
        <img
          src={`https://image.tmdb.org/t/p/w500${movies[0].posterPath}`}
          alt={watchlist.name}
          className={styles.singlePoster}
        />
      );
    }
  };

  const cardContent = (
    <div className={styles.card}>
      <div className={styles.textInfo}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              className={styles.editInput}
              maxLength="50"
              autoFocus
              onClick={(e) => e.preventDefault()} // Prevent link navigation
            />
            <div className={styles.editActions}>
              <button className={`${styles.actionButton} ${styles.saveButton}`}>
                <FiCheck />
              </button>
              <button
                className={`${styles.actionButton} ${styles.cancelButton}`}
                onClick={(e) => {
                  e.preventDefault();
                  setIsEditing(false);
                  setNameInput(watchlist.name); // Reset input on cancel
                }}
              >
                <FiX />
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <h3>{watchlist.name}</h3>
            </div>
            <p className={styles.movieCount}>
              {watchlist.movies.length} {watchlist.movies.length === 1 ? "movie" : "movies"}
            </p>
          </>
        )}
      </div>
      <div className={styles.coverContainer}>{renderCover()}</div>
    </div>
  );

  return (
    <Link to={`/watchlist/${watchlist.id}`} className={styles.cardLink}>
      <motion.div
        className={styles.cardWrapper}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
      >
        {cardContent}
        {!isEditing && (
          <div className={styles.hoverActions}>
            <button
              className={styles.actionButton}
              onClick={(e) => {
                e.preventDefault();
                setIsEditing(true);
              }}
              aria-label="Edit watchlist"
            >
              <FiEdit3 />
            </button>
            <button
              className={styles.actionButton}
              onClick={(e) => {
                e.preventDefault();
                onDelete(watchlist.id);
              }}
              aria-label="Delete watchlist"
            >
              <FiTrash2 />
            </button>
          </div>
        )}
      </motion.div>
    </Link>
  );
};

export default WatchlistCard;