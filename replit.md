# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Contains Investro — a smart stock market simulator built with React + Vite, frontend-only with localStorage persistence.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5 (api-server, unused by Investro frontend)
- **Database**: PostgreSQL + Drizzle ORM (unused by Investro)

## Investro App (`artifacts/investro`)

**Investro** is a premium dark-theme NIFTY 50 stock market simulator inspired by Groww/Zerodha. Fully frontend-only using localStorage.

### Features Complete (v3)
- Authentication (login/register/logout/updateProfile/updatePassword) via Context API + localStorage
- Register includes Full Name field; password requires number + special char + upper + lower
- Forgot Password page (/forgot-password) — real page that updates localStorage password
- Logged-in users auto-redirected from / to /dashboard
- Landing page shows only Get Started (no Login button)
- Navbar shows different links based on auth state (guest: Home/About/Help vs logged-in: Dashboard/Portfolio/Watchlist/Transactions)
- Transactions page (/transactions) — full buy/sell history with filter by All/Buys/Sells, timestamps, totals
- NIFTY 50 mock data (50 companies, realistic prices, 30-day history)
- Dashboard with NIFTY 50 chart (Chart.js), market summary cards, search with empty state, gainers/losers tables, per-stock watchlist bookmark buttons
- Stock detail page with 30-day chart, buy/sell simulation, watchlist toggle button, loading skeleton
- Portfolio tracking with real-time P&L, summary cards, responsive table
- Watchlist page (/watchlist) — protected route, add/remove stocks, open in new tab
- Profile page (/profile) — protected route, editable username/email, validation, joined date
- Protected routes for /dashboard, /portfolio, /watchlist, /profile (redirect to /login with toast)
- react-hot-toast notifications: login success/error, logout, register, buy, sell, watchlist add/remove, profile update, protected route redirect
- Navbar with Watchlist link + profile dropdown (View Profile, Portfolio, Watchlist, Logout) when logged in
- Footer with quick links, disclaimer, copyright
- Loading skeletons on Dashboard, StockDetail, Watchlist, Profile pages (animate-pulse, 600-800ms delay)
- Custom 404 page with Back to Home and Go to Dashboard buttons
- Advanced candlestick background animation on landing (mouse parallax, fade in/out)
- Password strength meter on register
- Forgot Password modal on login (demo mode message)
- Show/hide password toggles on all password inputs
- About Us and Help pages

### Routes
- `/` — Landing page (public)
- `/login` — Login (public)
- `/register` — Register (public)
- `/about` — About Investro (public)
- `/help` — FAQ + contact (public)
- `/dashboard` — Market overview, charts, all stocks (protected)
- `/portfolio` — Holdings with P&L tracking (protected)
- `/watchlist` — Saved stocks watchlist (protected)
- `/profile` — Editable user profile (protected)
- `/stock/:symbol` — Individual stock detail + buy/sell (opens in new tab, public)
- `*` — Custom 404 page

### localStorage Keys
- `investro_users` — Array of registered users
- `investro_auth_user` — Currently logged-in user (AuthUser object)
- `investro_portfolio_{username}` — Portfolio per user
- `investro_watchlist_{username}` — Watchlist per user

### Contexts
- `AuthContext` — login, register, logout, updateProfile, user state
- `MarketContext` — NIFTY 50 stocks, getStock, search/filter
- `PortfolioContext` — buy, sell, getHolding, totalInvested, getCurrentValue
- `WatchlistContext` — watchlist array, add/remove/toggle/isWatched

### Auth Validation
- Username: letters, numbers, underscore only; min 3 chars; duplicate check (case-insensitive)
- Email: valid format; duplicate check
- Password: min 8 chars, 1 uppercase, 1 lowercase, 1 special character
- Confirm Password: must match password
- Terms & Conditions checkbox required on register

## Structure

```text
artifacts-monorepo/
├── artifacts/
│   ├── investro/               # React + Vite frontend app
│   │   └── src/
│   │       ├── components/     # Navbar, Footer, CandlestickBackground
│   │       ├── contexts/       # Auth, Market, Portfolio, Watchlist
│   │       ├── data/           # nifty50.ts (50 stocks)
│   │       ├── pages/          # Landing, Login, Register, Dashboard, Portfolio,
│   │       │                   # StockDetail, Watchlist, Profile, About, Help, NotFound
│   │       ├── routes/         # ProtectedRoute.tsx
│   │       ├── App.tsx
│   │       └── main.tsx
│   └── api-server/             # Express API server (not used by Investro)
├── lib/                        # Shared libraries
├── scripts/
├── pnpm-workspace.yaml
└── package.json
```
