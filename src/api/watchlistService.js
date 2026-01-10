import apiClient from "./apiClient";

// watchlist functions

export const getWatchlists = async () => {
  try {
    const response = await apiClient.get("/watchlists");
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const createWatchlist = async (watchlistData) => {
  try {
    const response = await apiClient.post("/watchlists", watchlistData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const updateWatchlist = async (id, watchlistData) => {
  try {
    const response = await apiClient.put(`/watchlists/${id}`, watchlistData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const deleteWatchlist = async (id) => {
  try {
    const response = await apiClient.delete(`/watchlists/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// movie functions

export const addMovieToWatchlist = async (watchlistId, movieData) => {
  try {
    const response = await apiClient.post(`/watchlists/${watchlistId}/movies`, movieData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const removeMovieFromWatchlist = async (watchlistId, movieId) => {
  try {
    const response = await apiClient.delete(`/watchlists/${watchlistId}/movies/${movieId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

// search functions

export const searchMovies = async (query) => {
  try {
    const response = await apiClient.get(`/movies/search?query=${query}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getWatchlistById = async (id) => {
  try {
    const response = await apiClient.get(`/watchlists/${id}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
