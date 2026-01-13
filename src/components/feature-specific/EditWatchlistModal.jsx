import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import { updateWatchlist } from "../../api/watchlistService";

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
      const errorMessage = err.errors 
        ? err.errors.map(e => e.msg).join(', ') 
        : (err.msg || "Failed to update watchlist.");
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-center mb-8 font-medium text-2xl text-text-headings">Edit Watchlist</h2>
      <form onSubmit={handleSubmit}>
        <Input
          autoComplete="off"
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
          className="w-full py-3 px-4 border border-glass-border bg-black/20 text-text-primary rounded-lg text-base outline-none transition-all duration-300 -mt-2 mb-4 resize-y font-inherit hover:border-netflix-red/50 focus:border-netflix-red focus:shadow-[0_0_0_3px_var(--color-accent-glow)] placeholder:text-white/40"
          rows="4"
        />
        {error && <p className="text-error text-center mb-4 text-sm">{error}</p>}
        <div className="flex justify-center mt-6">
          <Button type="submit" loading={loading} disabled={loading}>
            Save Changes
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default EditWatchlistModal;
