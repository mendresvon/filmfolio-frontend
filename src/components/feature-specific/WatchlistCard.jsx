import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiEdit3, FiTrash2, FiMoreVertical } from "react-icons/fi";

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
        <div className="absolute top-0 left-0 w-full h-full grid grid-cols-2 grid-rows-2">
          {coverItems.map((item) => (
            <img
              key={item._id}
              src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
              alt={item.movieTitle}
              className="w-full h-full object-cover"
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
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      );
    }
    // fallback for empty lists
    else {
      return (
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(30,30,30,0.5)]">
          <div className="grid grid-cols-2 gap-1 w-9 h-9 opacity-40">
            <div className="bg-white/30 rounded" />
            <div className="bg-white/30 rounded" />
            <div className="bg-white/30 rounded" />
            <div className="bg-white/30 rounded" />
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
      className="relative h-full group"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}>
      <Link to={`/watchlist/${watchlist._id}`} className="no-underline text-inherit block h-full">
        <div className="flex bg-glass-bg rounded-xl overflow-hidden border border-glass-border transition-shadow duration-300 relative h-full">
          <div className="flex-1 p-5 min-w-0 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-medium text-text-headings mb-2 line-clamp-3">{watchlist.name}</h3>
            </div>
            <p className="text-sm text-text-primary opacity-70 mt-4">
              {watchlist.movies.length} {watchlist.movies.length === 1 ? "movie" : "movies"}
            </p>
          </div>
          <div className="w-[30%] shrink-0 relative bg-[#333] aspect-[2/3]">{renderCover()}</div>
        </div>
      </Link>

      {/* hover actions for desktop */}
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 transition-opacity z-5 group-hover:opacity-100 [@media(hover:none)]:hidden">
        <button
          className="bg-black/50 border border-glass-border text-text-primary rounded-full w-9 h-9 flex justify-center items-center cursor-pointer backdrop-blur-sm transition-all z-10 p-0 text-base hover:text-white hover:bg-netflix-red"
          onClick={(e) => {
            e.preventDefault();
            onEdit(watchlist);
          }}
          aria-label="Edit watchlist">
          <FiEdit3 />
        </button>
        <button
          className="bg-black/50 border border-glass-border text-text-primary rounded-full w-9 h-9 flex justify-center items-center cursor-pointer backdrop-blur-sm transition-all z-10 p-0 text-base hover:text-white hover:bg-[#ef4444]"
          onClick={(e) => {
            e.preventDefault();
            onDelete(watchlist._id);
          }}
          aria-label="Delete watchlist">
          <FiTrash2 />
        </button>
      </div>

      {/* touch actions for mobile */}
      <div className="absolute top-3 right-3 [@media(hover:hover)]:hidden" ref={menuRef}>
        <button
          className="bg-black/50 border border-glass-border text-text-primary rounded-full w-9 h-9 flex justify-center items-center cursor-pointer backdrop-blur-sm transition-all z-10 p-0 text-base hover:bg-netflix-red hover:text-white"
          onClick={handleMenuToggle}
          aria-label="More options">
          <FiMoreVertical />
        </button>
        {isMenuOpen && (
          <div className="absolute top-12 right-0 bg-[#2a2a2a] rounded-lg border border-glass-border shadow-[0_4px_12px_rgba(0,0,0,0.5)] p-2 z-20 flex flex-col gap-1 w-[120px]">
            <button
              className="bg-transparent border-none text-text-primary p-3 rounded-md text-left text-sm cursor-pointer flex items-center gap-3 transition-colors hover:bg-white/10 hover:text-white"
              onClick={(e) => {
                e.preventDefault();
                onEdit(watchlist);
                setIsMenuOpen(false);
              }}>
              <FiEdit3 /> Edit
            </button>
            <button
              className="bg-transparent border-none text-text-primary p-3 rounded-md text-left text-sm cursor-pointer flex items-center gap-3 transition-colors hover:bg-[#ef4444] hover:text-white"
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
