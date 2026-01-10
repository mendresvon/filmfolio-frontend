import React, { useState } from "react";
import Modal from "../../common/Modal/Modal";
import Input from "../../common/Input/Input";
import Button from "../../common/Button/Button";
import { createWatchlist } from "../../../api/watchlistService";
import styles from "./CreateWatchlistModal.module.css";

const CreateWatchlistModal = ({ isOpen, onClose, onWatchlistCreated }) => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
      const newWatchlist = await createWatchlist(formData);
      onWatchlistCreated(newWatchlist);
      setFormData({ name: "", description: "" }); // reset form
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
          autoFocus
          label="Watchlist Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Must-See Romance"
          autoComplete="off"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Add an optional description..."
          className= {styles.textarea}
          rows="3"
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
