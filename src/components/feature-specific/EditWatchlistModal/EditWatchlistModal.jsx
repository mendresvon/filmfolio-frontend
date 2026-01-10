import React, { useState, useEffect } from "react";
import Modal from "../../common/Modal/Modal";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { updateWatchlist } from "../../../api/watchlistService";
import styles from "./EditWatchlistModal.module.css";

const EditWatchlistModal = ({ isOpen, onClose, watchlist, onWatchlistUpdated }) => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (watchlist) {
      setFormData({
        name: watchlist.name,
        description: watchlist.description || "",
      });
      setError("");
    }
  }, [watchlist, isOpen]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!formData.name.trim()) {
      setError("Watchlist name is required.");
      return;
    }
    setLoading(true);
    try {
      const updatedData = await updateWatchlist(watchlist._id, formData);
      onWatchlistUpdated(updatedData);
      onClose();
    } catch (err) {
      setError(err.msg || "Failed to update watchlist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className={styles.title}>Edit Watchlist</h2>
      <form onSubmit={handleSubmit}>
        <Input
          autocomplete="off"
          label="Watchlist Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          maxLength="50"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add an optional description..."
          className={styles.textarea}
          rows="4"
        />
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.buttonWrapper}>
          <Button type="submit" loading={loading} disabled={loading}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditWatchlistModal;
