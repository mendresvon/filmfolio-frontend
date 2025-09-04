import React, { useState } from "react";
// CORRECTED PATHS: Changed from ../ to ../../
import Modal from "../../common/Modal/Modal";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { createWatchlist } from "../../../api/watchlistService";
import styles from "./CreateWatchlistModal.module.css";

const CreateWatchlistModal = ({ isOpen, onClose, onWatchlistCreated }) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Watchlist name is required.");
      return;
    }
    setLoading(true);
    try {
      // The path to the service file also needed correction
      const newWatchlist = await createWatchlist({ name });
      onWatchlistCreated(newWatchlist); // Pass the new watchlist back to the parent
      setName("");
      onClose();
    } catch (err) {
      setError(err.msg || "Failed to create watchlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.title}>Create New Watchlist</h2>
      <form onSubmit={handleSubmit}>
        <Input
          autofocus
          label="Watchlist Name"
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Must-See Romance"
        />
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttonWrapper}>
          <Button type="submit" loading={loading} disabled={loading}>
            Create Watchlist
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateWatchlistModal;
