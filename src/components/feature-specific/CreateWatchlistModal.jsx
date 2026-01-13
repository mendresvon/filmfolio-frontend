import React, { useState } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import { createWatchlist } from "../../api/watchlistService";

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
      setFormData({ name: "", description: "" });
      onClose();
    } catch (err) {
      const errorMessage = err.errors 
        ? err.errors.map(e => e.msg).join(', ') 
        : (err.msg || "Failed to create watchlist.");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-center mb-8 font-medium text-2xl text-text-headings">Create New Watchlist</h2>
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
          className="w-full py-3 px-4 border border-glass-border bg-black/20 text-text-primary rounded-lg text-base outline-none transition-all duration-300 -mt-2 mb-4 resize-y font-inherit hover:border-netflix-red/50 focus:border-netflix-red focus:shadow-[0_0_0_3px_var(--color-accent-glow)] placeholder:text-white/40"
          rows="3"
        />
        {error && <p className="text-error text-center mb-4 text-sm">{error}</p>}
        <div className="flex justify-center mt-6">
          <Button type="submit" loading={loading} disabled={loading}>
            Create Watchlist
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateWatchlistModal;
