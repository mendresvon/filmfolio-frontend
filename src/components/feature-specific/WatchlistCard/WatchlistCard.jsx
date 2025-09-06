import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEdit3, FiTrash2, FiMoreVertical } from "react-icons/fi";
import styles from "./WatchlistCard.module.css";

const WatchlistCard = ({ watchlist, index, onDelete, onEdit }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const renderCover = () => {
    // This function is correct and remains unchanged
    const { movies } = watchlist;
    if (movies.length === 0) {
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
      const coverItems = movies.slice(0, 4);
      while (coverItems.length < 4) {
        coverItems.push(null);
      }
      return (
        <div className={styles.gridCover}>
          {coverItems.map((item, i) =>
            item ? (
              <img
                key={item.id}
                src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
                alt={item.movieTitle}
                className={styles.coverImage}
              />
            ) : (
              <div key={`placeholder-${i}`} className={styles.gridPlaceholderSlot} />
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

  const handleMenuToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    // --- START: CORRECTED STRUCTURE ---
    <motion.div
      className={styles.cardWrapper}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }} // Animation is now on the main wrapper
    >
      <Link to={`/watchlist/${watchlist.id}`} className={styles.cardLink}>
        <div className={styles.card}>
          <div className={styles.textInfo}>
            <div>
              <h3>{watchlist.name}</h3>
            </div>
            <p className={styles.movieCount}>
              {watchlist.movies.length} {watchlist.movies.length === 1 ? "movie" : "movies"}
            </p>
          </div>
          <div className={styles.coverContainer}>{renderCover()}</div>
        </div>
      </Link>

      {/* These action buttons are now children of the animated wrapper */}
      <div className={styles.hoverActions}>
        <button
          className={styles.actionButton}
          onClick={(e) => {
            e.preventDefault();
            onEdit(watchlist);
          }}
          aria-label="Edit watchlist">
          <FiEdit3 />
        </button>
        <button
          className={`${styles.actionButton} ${styles.deleteButton}`}
          onClick={(e) => {
            e.preventDefault();
            onDelete(watchlist.id);
          }}
          aria-label="Delete watchlist">
          <FiTrash2 />
        </button>
      </div>

      <div className={styles.touchActions} ref={menuRef}>
        <button
          className={styles.moreOptionsButton}
          onClick={handleMenuToggle}
          aria-label="More options">
          <FiMoreVertical />
        </button>
        {isMenuOpen && (
          <div className={styles.optionsMenu}>
            <button
              className={styles.menuButton}
              onClick={(e) => {
                e.preventDefault();
                onEdit(watchlist);
                setIsMenuOpen(false);
              }}>
              <FiEdit3 /> Edit
            </button>
            <button
              className={`${styles.menuButton} ${styles.deleteOption}`}
              onClick={(e) => {
                e.preventDefault();
                onDelete(watchlist.id);
                setIsMenuOpen(false);
              }}>
              <FiTrash2 /> Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
    // --- END: CORRECTED STRUCTURE ---
  );
};

export default WatchlistCard;
