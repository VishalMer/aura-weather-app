# Software Requirements Specification
## for
## Aura — Real-Time Weather Application

---

**Version 1.0 Approved**
**Prepared by:** [Your Name]
**Organization:** BCA Final Year Project
**Date Created:** March 30, 2026

---

## Revision History

| Name | Date | Reason For Changes | Version |
|------|------|-------------------|---------|
|  |  |  |  |
|  |  |  |  |

---

## Table of Contents

1. [Introduction](#1-introduction)
   - 1.1 Purpose
   - 1.2 Document Conventions
   - 1.3 Intended Audience and Reading Suggestions
   - 1.4 Project Scope
   - 1.5 References
2. [Overall Description](#2-overall-description)
   - 2.1 Product Perspective
   - 2.2 Product Features
   - 2.3 User Classes and Characteristics
   - 2.4 Operating Environment
   - 2.5 Design and Implementation Constraints
   - 2.6 User Documentation
   - 2.7 Assumptions and Dependencies
3. [System Features](#3-system-features)
   - 3.1 User Registration and Authentication
   - 3.2 Real-Time Weather Search
   - 3.3 5-Day Weather Forecast
   - 3.4 Search History Management
   - 3.5 Favorites Management
   - 3.6 Weather Data Caching
4. [External Interface Requirements](#4-external-interface-requirements)
   - 4.1 User Interfaces
   - 4.2 Hardware Interfaces
   - 4.3 Software Interfaces
   - 4.4 Communications Interfaces
5. [Other Nonfunctional Requirements](#5-other-nonfunctional-requirements)
   - 5.1 Performance Requirements
   - 5.2 Safety Requirements
   - 5.3 Security Requirements
   - 5.4 Software Quality Attributes
6. [Other Requirements](#6-other-requirements)
- Appendix A: Glossary
- Appendix B: Analysis Models
- Appendix C: Issues List

---

## 1. Introduction

### 1.1 Purpose

This document specifies the software requirements for **Aura**, a real-time weather web application (Version 1.0). Aura is a full-stack MERN (MongoDB, Express.js, React.js, Node.js) web application that enables users to search for real-time weather conditions, view a 5-day weather forecast, save favorite cities, and maintain a personal search history. This SRS describes the complete functional and non-functional requirements of the Aura system as built for the BCA final year project.

The scope of this SRS covers the entire Aura application including its backend REST API server and its React-based frontend single-page application.

### 1.2 Document Conventions

This SRS follows the IEEE 830-1998 standard for software requirements specifications. The following typographical conventions are used in this document:

- **Bold text** denotes requirement identifiers, key terms, and important labels.
- *Italic text* is used for emphasis and to introduce new terminology.
- `Monospaced text` denotes API endpoints, code identifiers, file names, and technical names.
- All requirements are uniquely identified with the prefix **REQ-** followed by a sequential number.
- Priority levels for requirements are stated as **High**, **Medium**, or **Low**.
- Higher-level requirements that are not further detailed are assumed to have Medium priority unless otherwise stated.

### 1.3 Intended Audience and Reading Suggestions

This document is intended for the following audiences:

| Audience | Relevant Sections |
|----------|-------------------|
| **Project Supervisor / Examiner** | All sections — for evaluation and assessment |
| **Developers** | Sections 3, 4, 5 — for implementation guidance |
| **Testers (QA)** | Sections 3, 4, 5 — for test case derivation |
| **End Users** | Sections 2, 3.1–3.5 — to understand system behavior |

It is recommended that readers begin with Section 1 (Introduction) and Section 2 (Overall Description) to gain a high-level understanding of the system, then proceed to Section 3 (System Features) for detailed requirements.

### 1.4 Project Scope

**Aura** is a self-contained, full-stack weather web application built using the MERN technology stack. The system enables any visitor to search for real-time weather data for any city in the world using the OpenWeatherMap API. Registered and authenticated users gain additional features including a personal 5-day forecast view, the ability to save favorite cities for quick access, and automatic logging of their search history.

**Goals and Benefits:**
- Provide instant, accurate, and visually rich real-time weather information.
- Allow users to track weather conditions for multiple cities through a Favorites system.
- Reduce redundant third-party API calls through a server-side caching layer (10-minute TTL), improving performance and reducing costs.
- Deliver a fully responsive, modern UI with dynamic weather-adaptive backgrounds.

**Out of Scope:**
- Push notifications or mobile application (native iOS/Android).
- Hourly weather breakdown (beyond 3-hour intervals from OpenWeatherMap).
- Weather alerts or severe weather SMS/email notifications.
- Multi-language internationalization.

### 1.5 References

1. OpenWeatherMap API Documentation — https://openweathermap.org/api
2. MongoDB Official Documentation — https://www.mongodb.com/docs/
3. Express.js Official Documentation — https://expressjs.com/
4. React.js Official Documentation — https://react.dev/
5. Node.js Official Documentation — https://nodejs.org/docs/
6. Vite Build Tool Documentation — https://vitejs.dev/
7. Mongoose ODM Documentation — https://mongoosejs.com/docs/
8. JSON Web Token (JWT) Standard — RFC 7519
9. IEEE Std 830-1998, IEEE Recommended Practice for Software Requirements Specifications
10. MERN Weather App Checklist — `d:\aura\MERN_Weather_App_Checklist.pdf` (internal project document)

---

## 2. Overall Description

### 2.1 Product Perspective

**Aura** is a new, self-contained web application and does not replace any existing system. It is built as a BCA final year academic project that demonstrates full-stack web development proficiency using the MERN stack.

The product integrates with one primary external system:
- **OpenWeatherMap API** — a third-party REST API that provides real-time current weather data and 5-day/3-hour forecast data for any city globally.

The overall system architecture is a **client-server model** with three tiers:

```
[React Frontend (Vite)] <──HTTP/REST──> [Node.js / Express.js Backend API]
                                                       |
                                       ┌───────────────┴──────────────────┐
                               [MongoDB Database]              [OpenWeatherMap API]
```

The backend serves as the single point of communication with the external weather API and the database. The frontend (React SPA) communicates exclusively with the backend REST API.

### 2.2 Product Features

The following are the major features of the Aura application:

| # | Feature | Description |
|---|---------|-------------|
| F1 | **User Registration** | New users can create an account with name, email, and password. |
| F2 | **User Login / Authentication** | Existing users log in using email and password; a JWT token is issued. |
| F3 | **Real-Time Weather Search** | Public search of current weather for any city (no login required). |
| F4 | **5-Day Forecast** | View a 5-day weather forecast for any searched city. |
| F5 | **Search History** | Authenticated users can view and delete their personal search history. |
| F6 | **Favorites Management** | Authenticated users can save, view, and remove favorite cities. |
| F7 | **Weather Caching** | Server-side caching of weather data (10-minute TTL) to reduce API calls. |
| F8 | **Dynamic UI** | Weather-adaptive animated background and theme changes based on conditions. |
| F9 | **Rate Limiting** | Backend rate limiting (100 requests per 15 minutes per IP) for API protection. |
| F10 | **Responsive Design** | Fully responsive UI using Tailwind CSS for all device sizes. |

### 2.3 User Classes and Characteristics

**Guest User (Unauthenticated):**
- Any visitor to the site without logging in.
- Can search current weather for any city.
- Cannot access Favorites, History, or Forecast pages (redirected to Login).
- Technical expertise: minimal — general internet user.

**Registered User (Authenticated):**
- A user who has created an account and logged in.
- Has full access to all features including Forecast, Favorites, and History.
- Identified via a JWT stored in the browser's local storage.
- Technical expertise: minimal — general internet user.

**System Administrator (Backend / Developer):**
- Manages the backend server, MongoDB database, and environment variables.
- Responsible for monitoring rate limits, API key management, and cache behavior.
- Technical expertise: high — developer or system administrator.

### 2.4 Operating Environment

**Frontend Client:**
- Any modern web browser (Google Chrome 90+, Mozilla Firefox 85+, Microsoft Edge 90+, Safari 14+).
- Requires JavaScript to be enabled.
- Minimum display resolution: 360px width (mobile-friendly).

**Backend Server:**
- Operating System: Windows 10/11, Ubuntu 20.04+ (Linux), or macOS 12+.
- Runtime: Node.js v18.x or higher.
- Port: 5000 (configurable via environment variable).

**Database:**
- MongoDB v6.x or higher (local installation or MongoDB Atlas cloud cluster).

**Network:**
- Internet connectivity is required for the server to communicate with the OpenWeatherMap API.

### 2.5 Design and Implementation Constraints

The following constraints apply to the development and design of the Aura system:

1. **Technology Stack** — The project must use the MERN stack: MongoDB, Express.js, React.js (v19), and Node.js. Vite (v7) is used as the frontend build tool.
2. **External API Dependency** — Weather data is sourced exclusively from the OpenWeatherMap API. The free tier allows 60 calls/minute; caching is mandatory to stay within limits.
3. **Authentication** — Must use JSON Web Tokens (JWT) with `jsonwebtoken` library. Passwords must be hashed using `bcryptjs` with a salt round of 12 before storage.
4. **API Rate Limiting** — The backend enforces a maximum of 100 API requests per 15-minute window per IP address, implemented using `express-rate-limit`.
5. **Security Headers** — The backend must use the `helmet` middleware to set secure HTTP headers.
6. **Database** — Must use MongoDB via the `mongoose` ODM (v9.x). Schemas must include timestamps.
7. **CORS** — The backend must restrict CORS to the known frontend origin (configured via environment variable `CLIENT_URL`).
8. **Environment Variables** — All sensitive credentials (API keys, JWT secret, DB URI) must be stored in `.env` files and must not be committed to version control.
9. **ES Modules** — Both frontend and backend use ES Module (`"type": "module"`) syntax (import/export).

### 2.6 User Documentation

The following user documentation components will be delivered with the Aura software:

1. **This SRS Document** (`Aura_Weather_SRS.md`) — distributed as a Markdown/Word document for academic submission.
2. **Project README** (`frontend/README.md`) — contains a brief description, setup instructions, available scripts, and environment variable setup guide.
3. **Inline Code Comments** — the source code contains inline comments explaining non-obvious logic (e.g., data normalization, caching strategy, compound index usage).

No formal on-line help system or video tutorials are planned for Version 1.0.

### 2.7 Assumptions and Dependencies

**Assumptions:**
1. The user has a valid and active OpenWeatherMap API key with at least the free tier access.
2. The MongoDB instance (local or Atlas) is accessible via the connection URI configured in `.env`.
3. The end user's browser supports modern JavaScript (ES2020+) and local storage.
4. City names entered by users are valid English-language names recognized by the OpenWeatherMap API.
5. The server is deployed in an environment with a stable internet connection.

**Dependencies:**
1. **OpenWeatherMap API** — The entire weather data feature set depends on this third-party service. Any downtime or API key revocation will disable weather search.
2. **MongoDB / MongoDB Atlas** — All user data, favorites, search history, and weather cache depend on a running MongoDB instance.
3. **Node.js Package Ecosystem** — The following npm packages are critical dependencies:
   - Backend: `express`, `mongoose`, `bcryptjs`, `jsonwebtoken`, `axios`, `helmet`, `express-rate-limit`, `cors`, `dotenv`
   - Frontend: `react`, `react-dom`, `react-router-dom`, `axios`, `tailwindcss`

---

## 3. System Features

### 3.1 User Registration and Authentication

#### 3.1.1 Description and Priority

**Priority: High**

This feature enables new users to create a Aura account and allows existing users to log in. Authentication is the gateway to all protected features (Favorites, History, Forecast). It is implemented using JWT-based stateless authentication. Passwords are stored as bcrypt hashes (salt rounds: 12).

#### 3.1.2 Stimulus/Response Sequences

**Registration Flow:**
1. Guest user navigates to `/register`.
2. User fills in Name, Email, and Password fields.
3. User clicks the "Create Account" button.
4. System validates inputs (non-empty, password >= 6 characters, unique email).
5. System hashes the password and creates a new `User` document in MongoDB.
6. System returns a JWT token. User is redirected to the Home page as an authenticated user.

**Login Flow:**
1. User navigates to `/login`.
2. User enters Email and Password.
3. User clicks "Sign In".
4. System validates credentials against the stored hashed password using `bcrypt.compare`.
5. On success: system returns `{ _id, name, email, token }` and stores token in local storage.
6. On failure: system returns HTTP 401 with an error message.

**Logout Flow:**
1. Authenticated user clicks the "Logout" button in the Header.
2. System clears the JWT from local storage and resets auth context state.
3. User is redirected to `/login`.

#### 3.1.3 Functional Requirements

**REQ-1:** The system shall allow a new user to register by providing a unique name, a unique email address, and a password of minimum 6 characters.

**REQ-2:** The system shall validate all registration inputs and return an HTTP 400 error with a descriptive message if any field is missing, the email is already registered, or the password is too short.

**REQ-3:** The system shall hash the user's password using `bcryptjs` with 12 salt rounds before storing it in MongoDB.

**REQ-4:** The system shall generate and return a signed JWT upon successful registration or login.

**REQ-5:** The system shall authenticate users by matching the provided password against the stored bcrypt hash.

**REQ-6:** The system shall return HTTP 401 with the message "Invalid email or password" upon failed login.

**REQ-7:** The system shall provide a `/api/auth/me` protected endpoint (GET) that returns the authenticated user's `_id`, `name`, and `email`.

**REQ-8:** The frontend shall store the JWT in the browser's `localStorage` and include it as a `Bearer` token in the `Authorization` header for all authenticated requests.

---

### 3.2 Real-Time Weather Search

#### 3.2.1 Description and Priority

**Priority: High**

This is the core feature of the application. Any user (guest or authenticated) can search for current weather conditions by city name. The system first checks a server-side MongoDB cache (TTL: 10 minutes). If fresh data is in cache, it is returned immediately. Otherwise, a live call is made to the OpenWeatherMap API, and the response is normalized and cached. If the user is authenticated, the search is also logged to their search history.

#### 3.2.2 Stimulus/Response Sequences

1. User types a city name into the search bar on the Home page (`/`).
2. User presses Enter or clicks the search button.
3. Frontend sends a GET request to `GET /api/weather/:city`.
4. Backend checks `WeatherCache` collection for a fresh entry (< 10 minutes old).
5. **Cache Hit:** Backend returns `{ source: "cache", data: <normalized> }`.
6. **Cache Miss:** Backend calls OpenWeatherMap API, normalizes the response, stores it in cache, and returns `{ source: "api", data: <normalized> }`.
7. If user is authenticated, a `SearchHistory` document is created.
8. Frontend renders the `WeatherCard` and `WeatherDetails` components with the data.
9. The `WeatherBackground` animates to match the weather condition (e.g., rain, clear, clouds).

**Error Case:**
- If city is not found (API returns 404): backend returns HTTP 404 with `{ message: "City not found. Please check the city name." }`.
- Frontend renders the `ErrorMessage` component.

#### 3.2.3 Functional Requirements

**REQ-9:** The system shall accept a city name as input and retrieve current weather data from the OpenWeatherMap API via `GET /api/weather/:city` (publicly accessible).

**REQ-10:** The system shall normalize the raw OpenWeatherMap response into a consistent frontend-expected schema including: `city`, `country`, `temperature`, `feelsLike`, `tempMin`, `tempMax`, `humidity`, `pressure`, `windSpeed`, `windDeg`, `visibility`, `clouds`, `sunrise`, `sunset`, `dt`, and `weather { main, description, icon }`.

**REQ-11:** The system shall check the MongoDB `WeatherCache` collection before calling the external API; if a cached document for the city exists and is less than 10 minutes old, it shall be returned directly.

**REQ-12:** The system shall create or update a `WeatherCache` document after each successful live API call.

**REQ-13:** The system shall save a `SearchHistory` document (with `userId`, `city`, `temperature`, `condition`) only when the requesting user is authenticated.

**REQ-14:** The system shall enforce a maximum of 50 search history entries per user, automatically deleting the oldest entries beyond that limit.

**REQ-15:** The system shall return HTTP 404 with a descriptive message when the requested city is not recognized by the OpenWeatherMap API.

---

### 3.3 5-Day Weather Forecast

#### 3.3.1 Description and Priority

**Priority: High**

This feature provides users with a daily weather forecast for the next 5 days for any searched city. The data is sourced from the OpenWeatherMap 5-day/3-hour forecast endpoint. The backend normalizes the raw 3-hour interval data into one representative entry per day (the data point closest to 12:00 noon UTC). The frontend renders the forecast on the `/forecast` page using individual `ForecastCard` components.

#### 3.3.2 Stimulus/Response Sequences

1. User navigates to `/forecast` or clicks "Forecast" from the Header.
2. User enters a city name and searches.
3. Frontend sends `GET /api/weather/forecast/:city`.
4. Backend calls OpenWeatherMap `/forecast` endpoint.
5. Backend groups the 3-hour interval data by calendar day, selecting the reading closest to 12:00 noon UTC for each day.
6. Backend returns an array of up to 5 normalized daily forecast objects.
7. Frontend renders one `ForecastCard` per day, showing date, icon, condition, temperature range, humidity, and wind speed.

#### 3.3.3 Functional Requirements

**REQ-16:** The system shall provide a `GET /api/weather/forecast/:city` endpoint that returns a normalized 5-day forecast array (publicly accessible).

**REQ-17:** The backend shall call `https://api.openweathermap.org/data/2.5/forecast` to retrieve 3-hour interval forecast data.

**REQ-18:** The backend shall group the forecast entries by calendar date (YYYY-MM-DD) and select the entry closest to 12:00 UTC as the daily representative.

**REQ-19:** Each normalized forecast entry shall include: `date`, `temp`, `tempMin`, `tempMax`, `humidity`, `windSpeed`, and `weather { main, description, icon }`.

**REQ-20:** The forecast result array shall be limited to a maximum of 5 days.

**REQ-21:** The `/forecast` frontend route shall be publicly accessible; no login is required to view the forecast.

---

### 3.4 Search History Management

#### 3.4.1 Description and Priority

**Priority: Medium**

Authenticated users can view a chronological log of all cities they have previously searched. Each history entry shows the city name, temperature, weather condition, and the timestamp of the search. Users can also clear their entire search history.

#### 3.4.2 Stimulus/Response Sequences

**View History:**
1. Authenticated user navigates to `/history`.
2. Frontend sends `GET /api/history` with JWT in the Authorization header.
3. Backend queries `SearchHistory` collection for documents matching `userId`, sorted by `searchedAt` descending.
4. Frontend renders a card for each history entry.

**Delete All History:**
1. User clicks the "Clear History" button.
2. Frontend sends `DELETE /api/history` with JWT.
3. Backend deletes all `SearchHistory` documents for the authenticated user.
4. Frontend re-renders an empty history list.

#### 3.4.3 Functional Requirements

**REQ-22:** The system shall provide a `GET /api/history` protected endpoint that returns all search history records for the authenticated user, sorted from most recent to oldest.

**REQ-23:** Each history record shall include: `city`, `temperature`, `condition`, and `searchedAt` (timestamp).

**REQ-24:** The system shall provide a `DELETE /api/history` protected endpoint that permanently removes all search history records for the authenticated user.

**REQ-25:** The `/history` frontend route shall be protected; unauthenticated users shall be redirected to `/login` via the `ProtectedRoute` component.

**REQ-26:** The system shall enforce a soft cap of 50 history entries per user, deleting the oldest entries when the limit is exceeded upon a new weather search.

---

### 3.5 Favorites Management

#### 3.5.1 Description and Priority

**Priority: Medium**

Authenticated users can save cities as favorites for quick future access. Duplicate favorites (same city per user) are prevented by a compound unique index. Users can view all their favorites on the `/favorites` page and remove any favorite individually.

#### 3.5.2 Stimulus/Response Sequences

**Add Favorite:**
1. Authenticated user searches for a city on the Home page.
2. User clicks the "Save to Favorites" (heart/star) button on the weather result.
3. Frontend sends `POST /api/favorites` with `{ city }` and JWT.
4. Backend creates a `Favorite` document (`{ userId, city }`).
5. Frontend updates the favorites list and shows a success indicator.

**View Favorites:**
1. Authenticated user navigates to `/favorites`.
2. Frontend sends `GET /api/favorites` with JWT.
3. Backend returns all favorite city documents for the user.
4. Frontend renders a card for each favorite city with a search and remove option.

**Remove Favorite:**
1. User clicks the delete/remove button on a favorite card.
2. Frontend sends `DELETE /api/favorites/:id` with JWT.
3. Backend removes the `Favorite` document by its `_id`.
4. Frontend removes the card from the list.

#### 3.5.3 Functional Requirements

**REQ-27:** The system shall provide a `POST /api/favorites` protected endpoint that creates a new favorite entry for the authenticated user with the provided city name.

**REQ-28:** The system shall prevent duplicate favorites for the same user-city pair using a compound unique index `{ userId: 1, city: 1 }` on the `Favorite` collection.

**REQ-29:** The system shall provide a `GET /api/favorites` protected endpoint that returns all favorite cities for the authenticated user.

**REQ-30:** The system shall provide a `DELETE /api/favorites/:id` protected endpoint that removes a specific favorite entry by its MongoDB ObjectId.

**REQ-31:** The `/favorites` frontend route shall be protected; unauthenticated users shall be redirected to `/login`.

---

### 3.6 Weather Data Caching

#### 3.6.1 Description and Priority

**Priority: High**

The system maintains a MongoDB-backed server-side cache for weather data to avoid redundant calls to the OpenWeatherMap API. Each cached entry expires after 10 minutes. This reduces API credit consumption, improves response times for repeated city searches, and protects against rate-limit violations on the third-party API.

#### 3.6.2 Stimulus/Response Sequences

1. A weather search request arrives for a city (e.g., "Mumbai").
2. Backend queries `WeatherCache` for the document where `city = "mumbai"` (lowercase).
3. **Cache Hit (fresh):** `Date.now() - lastUpdated < 10 minutes` — return `cached.normalizedData` immediately (no API call).
4. **Cache Miss / Stale:** Backend fetches fresh data from OpenWeatherMap API.
5. Backend calls `findOneAndUpdate` with `upsert: true` to insert or refresh the cache document.
6. Fresh data is returned to the client.

#### 3.6.3 Functional Requirements

**REQ-32:** The `WeatherCache` MongoDB collection shall store documents with fields: `city` (lowercase string, unique), `normalizedData` (the frontend-expected JSON), `data` (raw API response), and `lastUpdated` (Date).

**REQ-33:** The system shall consider cached data "fresh" if it is less than 10 minutes (600,000 ms) old.

**REQ-34:** The system shall use `findOneAndUpdate` with `{ upsert: true }` to atomically insert or update the cache document on each live API call.

**REQ-35:** City names shall be stored in lowercase in the cache to ensure case-insensitive cache lookup consistency.

---

## 4. External Interface Requirements

### 4.1 User Interfaces

The Aura frontend is a React single-page application (SPA) built with Vite v7 and styled with Tailwind CSS v4. The UI conforms to the following design specifications:

- **Global Layout:** Persistent `<Header>` (navigation bar with logo, nav links, and auth state) and `<Footer>` on all pages. The main content area is centered with a `max-w-6xl` constraint.
- **Dynamic Background:** A full-screen animated `<WeatherBackground>` component that changes its gradient, animation, and particle effects based on the current weather condition (Clear, Rain, Clouds, Snow, Thunderstorm, Mist, etc.).
- **Pages and Routes:**
  - `/` — Home page with `<SearchBar>`, `<WelcomeSection>`, `<WeatherCard>`, `<WeatherDetails>`.
  - `/forecast` — Forecast page with `<SearchBar>` and grid of `<ForecastCard>` components.
  - `/login` — Login form.
  - `/register` — Registration form.
  - `/favorites` — Protected page showing saved favorite cities.
  - `/history` — Protected page showing search history.
  - `*` — 404 fallback page.
- **Responsive Design:** The UI is fully responsive across mobile (>= 360px), tablet (>= 768px), and desktop (>= 1024px) screen sizes.
- **Error Display:** The `<ErrorMessage>` component displays user-friendly error messages when API calls fail.
- **Loading State:** The `<Loader>` component is displayed during pending API calls.
- **Accessibility:** All interactive elements (buttons, inputs, links) have unique, descriptive IDs and ARIA attributes where applicable.

### 4.2 Hardware Interfaces

The Aura system does not interface directly with any specific hardware beyond a standard web server and client machine. Specific hardware requirements are:

- **Client:** Any device with a modern web browser capable of running JavaScript (Desktop PC, Laptop, Tablet, Smartphone).
- **Server:** Any machine capable of running Node.js v18+ (minimum 512 MB RAM, 1 CPU core recommended for production). No specialized hardware (e.g., GPU, biometrics, camera) is required.
- **Network:** A standard internet connection (minimum 1 Mbps) is required on the server side to reach the OpenWeatherMap API and MongoDB Atlas (if used).

### 4.3 Software Interfaces

The Aura system interfaces with the following external software components:

| Component | Version | Purpose |
|-----------|---------|---------|
| **OpenWeatherMap API** | v2.5 (REST) | Source of all weather and forecast data |
| **MongoDB** | v6.x | Primary database for users, history, favorites, cache |
| **Mongoose ODM** | v9.2.0 | Node.js object modelling for MongoDB |
| **Node.js** | v18.x+ | Backend runtime environment |
| **Express.js** | v5.2.1 | HTTP server and REST API routing framework |
| **React** | v19.2.0 | Frontend UI library |
| **React Router DOM** | v7.13.0 | Client-side routing for SPA |
| **Vite** | v7.x | Frontend build tool and development server |
| **Tailwind CSS** | v4.1.18 | Utility-first CSS framework for styling |
| **Axios** | v1.x | HTTP client (both frontend and backend) |
| **jsonwebtoken** | v9.0.3 | JWT generation and verification |
| **bcryptjs** | v3.0.3 | Password hashing |
| **helmet** | v8.1.0 | Security HTTP headers middleware |
| **express-rate-limit** | v8.3.1 | API rate limiting middleware |

**Data Flow:**
- **Frontend to Backend:** HTTP/JSON REST requests with optional JWT Bearer Token in `Authorization` header.
- **Backend to OpenWeatherMap:** HTTPS GET requests via `axios` with `appid` query parameter.
- **Backend to MongoDB:** TCP connection via Mongoose using the `MONGO_URI` environment variable.

### 4.4 Communications Interfaces

- **Protocol:** HTTP/1.1 (development) and HTTPS (production deployment recommended).
- **API Base URL:** `http://localhost:5000/api` (development) / configurable via environment variable in production.
- **CORS:** The backend enforces CORS, allowing requests only from the configured `CLIENT_URL` origin (default: `http://localhost:5173`).
- **Authentication:** JWT Bearer Token passed via the `Authorization: Bearer <token>` HTTP header for all protected endpoints.
- **Data Format:** All API request and response bodies use `application/json` encoding.
- **Rate Limiting:** Max 100 requests per 15-minute window per IP address. Excess requests receive HTTP 429 (Too Many Requests).
- **Health Check Endpoint:** `GET /` returns `{ message: "Aura Weather API is running" }` for monitoring.

---

## 5. Other Nonfunctional Requirements

### 5.1 Performance Requirements

- **Weather Search Response Time:** For a cache hit, the backend shall respond within 200 ms. For a cache miss (live API call), the response shall complete within 3 seconds under normal network conditions.
- **Cache TTL:** Weather data cache entries shall expire after a maximum of 10 minutes (600 seconds).
- **Throughput:** The backend shall support at least 100 concurrent requests per 15-minute window per IP without degradation.
- **Frontend Load Time:** The initial page load of the React SPA (after production build) shall complete within 3 seconds on a standard broadband connection.
- **Database Queries:** MongoDB queries on indexed fields (`userId`, `city`, compound `userId+searchedAt`) shall complete within 50 ms under normal load.
- **History Cap:** The system shall cap each user's search history at 50 records to maintain lean database queries and predictable storage.

### 5.2 Safety Requirements

- **Data Persistence:** The system does not store any safety-critical data (e.g., medical or financial data). No special safety certifications are required.
- **Input Validation:** All user inputs on registration and login forms are validated on both the frontend (form constraints) and the backend (manual checks) to prevent malformed data from entering the system.
- **Error Handling:** All backend route handlers are wrapped in `try-catch` blocks. Unhandled exceptions shall return a generic HTTP 500 response without exposing internal stack traces to the client.
- **No Sensitive Data in Responses:** No operation shall return a user's hashed password in any API response.

### 5.3 Security Requirements

- **Password Storage:** All user passwords shall be hashed using `bcryptjs` with a minimum of 12 salt rounds before storage. Plain-text passwords shall never be stored or logged.
- **JWT Security:** JWTs shall be signed using a secret stored in the `JWT_SECRET` environment variable. Tokens shall have a configurable expiry (default: 30 days). Tokens shall be transmitted only over HTTPS in production.
- **HTTP Security Headers:** The `helmet` middleware shall be applied globally on the backend to set all recommended security-related HTTP headers (e.g., `X-Content-Type-Options`, `X-Frame-Options`, `Content-Security-Policy`).
- **CORS:** The backend shall only accept cross-origin requests from the configured `CLIENT_URL` to prevent unauthorized API access.
- **Rate Limiting:** To prevent abuse and brute-force attacks, the API enforces a limit of 100 requests per 15-minute window per IP. Rate-limited requests receive HTTP 429.
- **Environment Variables:** API keys (`OPENWEATHER_KEY`), database URIs (`MONGO_URI`), and JWT secrets (`JWT_SECRET`) shall never be hard-coded in source code. They are stored in `.env` files listed in `.gitignore`.
- **Authorization Middleware:** All protected API routes use a custom `protect` middleware that verifies the JWT and attaches the user to `req.user`. Unauthenticated requests to protected routes receive HTTP 401.

### 5.4 Software Quality Attributes

| Attribute | Description |
|-----------|-------------|
| **Reliability** | The caching layer ensures that weather data is available even if the OpenWeatherMap API is temporarily slow. Error handling ensures the app never crashes on a bad API response. |
| **Availability** | The application should target 99% uptime in production. MongoDB Atlas provides managed database high availability. |
| **Maintainability** | The project follows a clear MVC-like separation of concerns: `models/`, `controllers/`, `routes/` on the backend; `components/`, `pages/`, `hooks/`, `context/`, `services/` on the frontend. All complex logic includes inline comments. |
| **Portability** | The backend runs on any OS that supports Node.js v18+. The frontend is a static build deployable on any CDN (Vercel, Netlify). A `vercel.json` configuration is included. |
| **Scalability** | MongoDB indexes on `userId`, `city`, and compound `userId+searchedAt` ensure queries scale well as data grows. Rate limiting protects against traffic spikes. |
| **Usability** | The UI features intuitive navigation, real-time error messages, loading states, and a dynamic weather-adaptive interface that provides immediate visual feedback. |
| **Testability** | Each controller function is a pure async function exportable for unit testing. Routes are modularly organized for integration testing with tools like Jest/Supertest. |

---

## 6. Other Requirements

**Database Requirements:**
- The MongoDB database will use the following collections:
  1. `users` — managed by the `User` schema (`name`, `email`, `password`, timestamps).
  2. `favorites` — managed by the `Favorite` schema (`userId`, `city`, timestamps; compound unique index on `userId+city`).
  3. `searchhistories` — managed by the `SearchHistory` schema (`userId`, `city`, `temperature`, `condition`, `searchedAt`; compound index on `userId+searchedAt`).
  4. `weathercaches` — managed by the `WeatherCache` schema (`city`, `normalizedData`, `data`, `lastUpdated`; unique index on `city`).

**Deployment Requirements:**
- Frontend shall be deployable to Vercel using the included `vercel.json` configuration.
- Backend shall be deployable as a Node.js server on any PaaS (Render, Railway, Heroku).
- Environment variables must be configured on the deployment platform.

**Code Organization:**
- Backend: `server.js` (entry point), `config/db.js` (DB connection), `models/`, `controllers/`, `routes/`, `middleware/`, `utils/`.
- Frontend: `src/main.jsx` (entry point), `src/App.jsx` (router), `src/pages/`, `src/components/`, `src/context/`, `src/hooks/`, `src/services/`.

---

## Appendix A: Glossary

| Term | Definition |
|------|-----------|
| **API** | Application Programming Interface — a set of defined rules that allow different software programs to communicate with each other. |
| **JWT** | JSON Web Token — a compact, self-contained token used to securely transmit user identity information between parties for stateless authentication. |
| **MERN** | An acronym for the technology stack: MongoDB, Express.js, React.js, Node.js. |
| **SPA** | Single-Page Application — a web app that loads a single HTML page and dynamically updates content using JavaScript without full page reloads. |
| **REST** | Representational State Transfer — an architectural style for designing networked APIs using standard HTTP methods. |
| **ODM** | Object Document Mapper — software (e.g., Mongoose) that provides object-oriented abstraction over a document-oriented database like MongoDB. |
| **CORS** | Cross-Origin Resource Sharing — a browser security feature that restricts cross-origin HTTP requests. |
| **TTL** | Time To Live — the duration for which a cached data item is considered valid. In Aura, weather cache TTL is 10 minutes. |
| **Bcrypt** | A password hashing function designed to be computationally expensive to resist brute-force attacks. |
| **Helmet** | An Express.js middleware library that sets various HTTP security headers. |
| **Rate Limiting** | A technique to control the number of requests a client can make to an API within a defined time window. |
| **OpenWeatherMap** | A third-party weather data provider offering a REST API for current and forecast weather data. |
| **Vite** | A modern JavaScript build tool and development server known for its fast Hot Module Replacement (HMR). |
| **Protected Route** | A frontend route accessible only to authenticated users; unauthorized users are redirected to the login page. |
| **Compound Index** | A MongoDB index on multiple fields used to enforce uniqueness or speed up queries that filter by multiple criteria simultaneously. |
| **Normalization** | The process of transforming raw API response data into a consistent, frontend-expected schema shape. |
| **ESM** | ECMAScript Modules — the official JavaScript module system using `import` and `export` statements. |

---

## Appendix B: Analysis Models

### 1. Data Flow Diagram (DFD)

**Level 0 — Context Diagram:**

```
                        +---------------------+
    [User/Browser] ---->|                     |----> [OpenWeatherMap API]
                        |   Aura Weather App  |
    [User/Browser] <----|                     |<---- [OpenWeatherMap API]
                        +---------------------+
                                  |
                                  |
                          [MongoDB Database]
```

**Level 1 — DFD:**

```
User ----> [1.0 Auth System] ----> (Users DB)
User ----> [2.0 Weather Search] <---> [OpenWeatherMap API]
                               <---> [3.0 Cache Manager] <---> (WeatherCache DB)
                               ----> [4.0 History Logger] ----> (SearchHistory DB) [if logged in]
User ----> [5.0 Favorites Mgr] <---> (Favorites DB)
User ----> [6.0 History Viewer] <--- (SearchHistory DB)
```

### 2. Entity Relationship Diagram (ERD)

```
+---------------+        +------------------+        +------------------+
|     USER      |        |  SEARCH_HISTORY  |        |    FAVORITE      |
+---------------+        +------------------+        +------------------+
| _id (PK)      |--1--+  | _id (PK)         |        | _id (PK)         |
| name          |     +--| userId (FK)      |   +---| userId (FK)      |
| email (UQ)    |     +--| city             |   |   | city             |
| password      |        | temperature      |   |   | createdAt        |
| createdAt     |        | condition        |   |   | updatedAt        |
| updatedAt     |        | searchedAt       |   |   +------------------+
+---------------+        +------------------+   |
        |                                        |
        +----------------------------------------+

+--------------------+
|   WEATHER_CACHE    |
+--------------------+
| _id (PK)           |
| city (UQ)          |
| normalizedData     |
| data (raw)         |
| lastUpdated        |
+--------------------+
```

### 3. Use Case Diagram

```
Actors: Guest User, Registered User, System (Backend)

Guest User:
  +-- UC1: Search Current Weather (city)
  +-- UC2: View Weather Details

Registered User (inherits Guest User):
  +-- UC3: Register an Account
  +-- UC4: Log In
  +-- UC5: Log Out
  +-- UC6: View 5-Day Forecast
  +-- UC7: Save City to Favorites
  +-- UC8: View Favorites List
  +-- UC9: Remove a Favorite
  +-- UC10: View Search History
  +-- UC11: Clear Search History

System (Backend):
  +-- UC12: Cache Weather Data (triggered by UC1)
  +-- UC13: Log Search to History (triggered by UC1, only if authenticated)
  +-- UC14: Rate Limit API Calls
```

### 4. Class Diagram

```
+---------------------+      +-------------------------+
|  UserSchema         |      |  SearchHistorySchema    |
+---------------------+      +-------------------------+
| name: String        |      | userId: ObjectId (FK)   |
| email: String       |      | city: String            |
| password: String    |      | temperature: Number     |
| timestamps: true    |      | condition: String       |
+---------------------+      | searchedAt: Date        |
                             +-------------------------+

+---------------------+      +--------------------------+
|  FavoriteSchema     |      |  WeatherCacheSchema      |
+---------------------+      +--------------------------+
| userId: ObjectId    |      | city: String (unique)    |
| city: String        |      | normalizedData: Mixed    |
| timestamps: true    |      | data: Mixed (raw)        |
| [unique userId+city]|      | lastUpdated: Date        |
+---------------------+      +--------------------------+
```

### 5. Flowchart / System Flow Diagram

**Weather Search Flow:**

```
START
  |
  v
User enters city name and submits search
  |
  v
Frontend: GET /api/weather/:city
  |
  v
Backend: Query WeatherCache for city (lowercase)
  |
  +--[Cache FOUND & fresh (<10 min)]---> Return cached.normalizedData --> Frontend renders --> END
  |
  +--[Cache MISS or STALE]
        |
        v
  Call OpenWeatherMap API (live)
        |
        +--[API Error 404: City not found]--> Return HTTP 404 --> Frontend shows error --> END
        |
        +--[API Success]
              |
              v
        Normalize raw API response
              |
              v
        Is user authenticated?
              |
        +--YES--+--NO--+
        v              v
  Save SearchHistory  (skip)
        |              |
        +------+-------+
               |
               v
        Update/Insert WeatherCache (upsert)
               |
               v
        Return { source: "api", data: normalized }
               |
               v
        Frontend renders WeatherCard + WeatherDetails
               |
               v
            END
```

---

## Appendix C: Issues List

This is a dynamic list of the open requirements issues that remain to be resolved, including TBDs, pending decisions, information that is needed, conflicts awaiting resolution, and the like.

| ID | Description | Status | Priority |
|----|-------------|--------|----------|
| ISS-01 | Whether to add email verification on registration flow (OTP/link) | Open | Medium |
| ISS-02 | Hourly forecast breakdown (beyond 5-day daily view) — requires OpenWeatherMap paid plan | Deferred | Low |
| ISS-03 | Push notification support for daily weather alerts | Deferred | Low |
| ISS-04 | Unit of measurement toggle (Celsius to Fahrenheit) on the frontend | Open | Medium |
| ISS-05 | Consider adding a user profile/settings page for future release | Deferred | Low |
| ISS-06 | Accessibility audit (screen reader, keyboard navigation) for WCAG 2.1 AA compliance | Open | Medium |

---

*End of Software Requirements Specification*

*Document prepared for BCA Final Year Project — Aura Weather Application (Version 1.0)*
*Date: March 30, 2026*
