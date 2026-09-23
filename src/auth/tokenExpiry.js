import { jwtDecode } from "jwt-decode";

export const getTokenExpirationTime = (token) => {
  const { exp } = jwtDecode(token);
  return Number.isFinite(exp) ? exp * 1000 : null;
};
