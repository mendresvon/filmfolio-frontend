# FilmFolio: Frontend

React single-page app for [FilmFolio](https://github.com/mendresvon/filmfolio), a movie discovery and watchlist manager. This repo is the client half; see the [backend](https://github.com/mendresvon/filmfolio-backend) for the API and the [parent project](https://github.com/mendresvon/filmfolio) for the full-stack overview.

![React](https://img.shields.io/badge/React-19.1-61DAFB?style=flat&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.8-CA4245?style=flat&logo=reactrouter&logoColor=white)

## What It Does

- User authentication (login/register) against the FilmFolio API, with JWT stored client-side and decoded via `jwt-decode`
- Protected routing: dashboard and watchlist detail pages redirect to login when unauthenticated
- Movie search and watchlist management backed by the TMDB API through the backend
- Route-transition animations with Framer Motion and a typewriter-style intro with `react-type-animation`

## Structure

```
src/
├── api/            # Axios client + backend API calls
├── components/
│   ├── layout/     # Header, protected-route guard, animated page transitions
│   ├── common/      # Shared UI primitives
│   └── feature-specific/
├── context/        # AuthContext (JWT session state)
├── hooks/          # useAuth and friends
└── pages/          # HomePage, LoginPage, RegisterPage, DashboardPage, WatchlistDetailPage
```

## Running Locally

Requires the [backend](https://github.com/mendresvon/filmfolio-backend) running (default `http://localhost:3001`).

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`.

```bash
npm run build     # production build
npm run lint       # ESLint
```
