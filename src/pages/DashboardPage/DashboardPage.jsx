import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../hooks/useAuth";
import styles from "./DashboardPage.module.css";
import Card from "../../components/common/Card/Card";
import Loader from "../../components/common/Loader/Loader";

// Mock API service function
const getMockWatchlists = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "Sci-Fi Classics", movieCount: 5 },
        { id: 2, name: "A24 Favorites", movieCount: 12 },
        { id: 3, name: "Mind-Bending Thrillers", movieCount: 8 },
      ]);
    }, 1500); // Simulate network delay
  });
};

const DashboardPage = () => {
  const { user } = useAuth();
  const [watchlists, setWatchlists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlists = async () => {
      try {
        const data = await getMockWatchlists();
        setWatchlists(data);
      } catch (error) {
        console.error("Failed to fetch watchlists", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlists();
  }, []);

  return (
    <div className={styles.dashboardContainer}>
      <motion.h1
        className={styles.title}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}>
        Welcome, {user ? "User" : "Guest"}
      </motion.h1>

      <h2 className={styles.sectionTitle}>Your Watchlists</h2>

      {loading ? (
        <div className={styles.loaderContainer}>
          <Loader />
        </div>
      ) : (
        <div className={styles.watchlistGrid}>
          {watchlists.map((list, index) => (
            <motion.div
              key={list.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}>
              <Card className={styles.watchlistCard}>
                <h3>{list.name}</h3>
                <p>{list.movieCount} movies</p>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
