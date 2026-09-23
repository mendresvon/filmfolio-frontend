export const normalizeApiError = (error) => {
  if (error?.response?.data) {
    return error.response.data;
  }

  return {
    msg: "Unable to connect to FilmFolio. Check your connection and try again.",
  };
};
