import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEdit3, FiTrash2, FiMoreVertical } from "react-icons/fi";
import styles from "./WatchlistCard.module.css";

const WatchlistCard = ({ watchlist, index, onDelete, onEdit }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // close menu when clicking outside
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
    const { movies } = watchlist;

    // if we have enough movies, show a cool 2x2 grid
    if (movies.length >= 4) {
      const coverItems = movies.slice(0, 4);
      return (
        <div className={styles.gridCover}>
          {coverItems.map((item) => (
            <img
              key={item._id}
              src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
              alt={item.movieTitle}
              className={styles.coverImage}
            />
          ))}
        </div>
      );
    }
    // otherwise just show the first poster we have
    else if (movies.length > 0) {
      return (
        <img
          src={`https://image.tmdb.org/t/p/w500${movies[0].posterPath}`}
          alt={watchlist.name}
          className={styles.singlePoster}
        />
      );
    }
    // fallback for empty lists
    else {
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
    }
  };

  const handleMenuToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.div
      className={styles.cardWrapper}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}>
      <Link to={`/watchlist/${watchlist._id}`} className={styles.cardLink}>
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
            onDelete(watchlist._id);
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
                onDelete(watchlist._id);
                setIsMenuOpen(false);
              }}>
              <FiTrash2 /> Delete
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default WatchlistCard;
