import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Loader from "../components/common/Loader";
import Button from "../components/common/Button";
import CreateWatchlistModal from "../components/feature-specific/CreateWatchlistModal";
import { getWatchlists, deleteWatchlist } from "../api/watchlistService";
import { FiPlus } from "react-icons/fi";
import WatchlistCard from "../components/feature-specific/WatchlistCard";
import EditWatchlistModal from "../components/feature-specific/EditWatchlistModal";

const DashboardPage = () => {
  const [watchlists, setWatchlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingWatchlist, setEditingWatchlist] = useState(null);

  useEffect(() => {
    const fetchWatchlists = async () => {
      try {
        const data = await getWatchlists();
        setWatchlists(data);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch watchlists", error);
        setError("Could not load your watchlists.");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlists();
  }, []);

  const handleWatchlistCreated = (newWatchlist) => {
    const watchlistWithMovies = { ...newWatchlist, movies: [] };
    setWatchlists([...watchlists, watchlistWithMovies]);
  };

  const handleDeleteWatchlist = async (watchlistId) => {
    if (window.confirm("Are you sure you want to delete this watchlist?")) {
      try {
        await deleteWatchlist(watchlistId);
        setWatchlists(watchlists.filter((list) => list._id !== watchlistId));
      } catch (err) {
        console.error("Failed to delete watchlist:", err);
        alert("Could not delete the watchlist.");
      }
    }
  };

  const handleWatchlistUpdated = (updatedWatchlist) => {
    setWatchlists(
      watchlists.map((list) => (list._id === updatedWatchlist._id ? updatedWatchlist : list))
    );
  };

  const openEditModal = (watchlist) => {
    setEditingWatchlist(watchlist);
  };

  return (
    <>
      <CreateWatchlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onWatchlistCreated={handleWatchlistCreated}
      />
      <EditWatchlistModal
        isOpen={!!editingWatchlist}
        onClose={() => setEditingWatchlist(null)}
        watchlist={editingWatchlist}
        onWatchlistUpdated={handleWatchlistUpdated}
      />
      <div className="pt-8">
        <motion.h1
          className="font-netflix text-7xl max-md:text-4xl font-light tracking-wide text-text-headings mb-16 max-md:mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}>
          Welcome Back
        </motion.h1>

        <div className="flex justify-between items-center mb-8 pb-4 border-b border-glass-border max-md:flex-col max-md:items-start max-md:gap-4">
          <h2 className="text-3xl font-medium text-text-headings m-0 p-0 border-none">Your Watchlists</h2>
          <Button onClick={() => setIsModalOpen(true)}>
            <FiPlus /> Create New
          </Button>
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <Loader />
          </div>
        )}
        {error && <p className="text-center text-error">{error}</p>}

        {!loading && !error && watchlists.length === 0 && (
          <p className="text-center py-16 text-text-primary opacity-70">
            You don't have any watchlists yet. Create one to get started!
          </p>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] max-md:grid-cols-1 gap-6 max-md:gap-4 auto-rows-fr">
            {watchlists.map((list, index) => (
              <WatchlistCard
                key={list._id}
                watchlist={list}
                index={index}
                onDelete={handleDeleteWatchlist}
                onEdit={openEditModal}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
