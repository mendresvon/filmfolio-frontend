import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Import the Link component
import styles from "./DashboardPage.module.css";
import Card from "../../components/common/Card/Card";
import Loader from "../../components/common/Loader/Loader";
import Button from "../../components/common/Button/Button";
import CreateWatchlistModal from "../../components/feature-specific/CreateWatchlistModal/CreateWatchlistModal";
import { getWatchlists, deleteWatchlist } from "../../api/watchlistService";
import { FiPlus, FiTrash2 } from "react-icons/fi";

const DashboardPage = () => {
  const [watchlists, setWatchlists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setWatchlists([newWatchlist, ...watchlists]);
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

  return (
    <>
      <CreateWatchlistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onWatchlistCreated={handleWatchlistCreated}
      />
      <div className={styles.dashboardContainer}>

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
              // START of changes: Wrap the card in a Link component
              <Link to={`/watchlist/${list.id}`} key={list.id} className={styles.cardLink}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={styles.cardWrapper}>
                  <Card className={styles.watchlistCard}>
                    <h3>{list.name}</h3>
                    <p>
                      {list.movies.length} {list.movies.length === 1 ? "movie" : "movies"}
                    </p>
                  </Card>
                  <button
                    className={styles.deleteButton}
                    onClick={(e) => {
                      e.preventDefault(); // This is crucial to prevent the Link from navigating
                      handleDeleteWatchlist(list.id);
                    }}
                    aria-label={`Delete ${list.name} watchlist`}>
                    <FiTrash2 />
                  </button>
                </motion.div>
              </Link>
              // END of changes
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
