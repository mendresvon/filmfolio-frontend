import apiClient from "./apiClient";

// --- Watchlist Functions ---

// GET /api/watchlists
export const getWatchlists = async () => {
  try {
    const response = await apiClient.get("/watchlists");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// POST /api/watchlists
export const createWatchlist = async (watchlistData) => {
  try {
    const response = await apiClient.post("/watchlists", watchlistData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// PUT /api/watchlists/:id
export const updateWatchlist = async (id, watchlistData) => {
  try {
    const response = await apiClient.put(`/watchlists/${id}`, watchlistData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// DELETE /api/watchlists/:id
export const deleteWatchlist = async (id) => {
  try {
    const response = await apiClient.delete(`/watchlists/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// --- Watchlist Movie Functions ---

// POST /api/watchlists/:id/movies
export const addMovieToWatchlist = async (watchlistId, movieData) => {
  try {
    const response = await apiClient.post(`/watchlists/${watchlistId}/movies`, movieData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// DELETE /api/watchlists/:watchlistId/movies/:movieId
export const removeMovieFromWatchlist = async (watchlistId, movieId) => {
  try {
    const response = await apiClient.delete(`/watchlists/${watchlistId}/movies/${movieId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// --- Movie Search Function ---

// GET /api/movies/search?query=...
export const searchMovies = async (query) => {
  try {
    const response = await apiClient.get(`/movies/search?query=${query}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// GET /api/watchlists/:id
export const getWatchlistById = async (id) => {
  try {
    const response = await apiClient.get(`/watchlists/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
