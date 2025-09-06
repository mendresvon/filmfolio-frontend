import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./DashboardPage.module.css";
import Loader from "../../components/common/Loader/Loader";
import Button from "../../components/common/Button/Button";
import CreateWatchlistModal from "../../components/feature-specific/CreateWatchlistModal/CreateWatchlistModal";
import { getWatchlists, deleteWatchlist } from "../../api/watchlistService";
import { FiPlus } from "react-icons/fi";
import WatchlistCard from "../../components/feature-specific/WatchlistCard/WatchlistCard";
import EditWatchlistModal from "../../components/feature-specific/EditWatchlistModal/EditWatchlistModal";

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
        setWatchlists(watchlists.filter((list) => list.id !== watchlistId));
      } catch (err) {
        console.error("Failed to delete watchlist:", err);
        alert("Could not delete the watchlist.");
      }
    }
  };

  const handleWatchlistUpdated = (updatedWatchlist) => {
    setWatchlists(
      watchlists.map((list) => (list.id === updatedWatchlist.id ? updatedWatchlist : list))
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
      <div className={styles.dashboardContainer}>
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}>
          Welcome Back
        </motion.h1>

        <div className={styles.header}>
          <h2 className={styles.sectionTitle}>Your Watchlists</h2>
          <Button onClick={() => setIsModalOpen(true)}>
            <FiPlus /> Create New
          </Button>
        </div>

        {loading && (
          <div className={styles.loaderContainer}>
            <Loader />
          </div>
        )}
        {error && <p className={styles.errorText}>{error}</p>}

        {!loading && !error && watchlists.length === 0 && (
          <p className={styles.emptyState}>
            You don't have any watchlists yet. Create one to get started!
          </p>
        )}

        {!loading && !error && (
          <div className={styles.watchlistGrid}>
            {watchlists.map((list, index) => (
              <WatchlistCard
                key={list.id}
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
