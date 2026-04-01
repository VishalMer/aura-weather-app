<div align="center">

# 🌤️ Aura Weather App

<img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/TailwindCSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" />
<img src="https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
<img src="https://img.shields.io/badge/Deployed-Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" />

<br />
<br />

**A sleek, full-stack weather application with real-time forecasts, user authentication, favorites, and search history — built with the MERN stack.**

<br />

[🌐 Live Demo](#) &nbsp;|&nbsp; [📸 Screenshots](#-screenshots) &nbsp;|&nbsp; [🚀 Quick Start](#-quick-start) &nbsp;|&nbsp; [📁 Project Structure](#-project-structure)

</div>

---

## 🎬 Demo

<div align="center">
  <img src="https://placehold.co/900x500/1a1a2e/61DAFB?text=App+Demo+GIF+Coming+Soon" alt="Aura Weather App Demo" width="100%" />
  <!-- <p><em>Add your screen recording GIF here</em></p> -->
</div>

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure register & login with bcrypt password hashing
- 🌍 **Real-Time Weather** — Current conditions powered by a live weather API
- 📅 **5-Day Forecast** — Detailed day-by-day and hourly weather breakdown
- ⭐ **Favorites** — Save and manage your go-to cities
- 🕒 **Search History** — Revisit your recent weather lookups
- 🎨 **Dynamic Backgrounds** — Weather-reactive UI that changes with conditions
- 🔒 **Protected Routes** — Auth-gated pages with seamless redirect flow
- 🛡️ **Security Hardened** — Helmet, CORS, rate limiting, and input validation
- 📱 **Fully Responsive** — Pixel-perfect on mobile, tablet, and desktop

---

## 🧰 Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| React Router DOM v7 | Client-side routing |
| Tailwind CSS v4 | Utility-first styling |
| Vite 7 | Lightning-fast build tool |
| Axios | HTTP client |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express 5 | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JSON Web Tokens (JWT) | Stateless authentication |
| bcryptjs | Password hashing |
| Helmet | HTTP security headers |
| express-rate-limit | API rate limiting |
| express-validator | Input sanitization & validation |

---

## 📁 Project Structure

```
aura/
├── backend/
│   ├── config/
│   │   └── db.js                   # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js       # Register & login logic
│   │   ├── weatherController.js    # Weather & forecast logic
│   │   └── favoriteController.js   # Favorites CRUD logic
│   ├── middleware/
│   │   ├── authMiddleware.js       # JWT verification guard
│   │   └── optionalAuth.js         # Optional auth (public routes)
│   ├── models/
│   │   ├── User.js                 # User schema
│   │   ├── Favorite.js             # Saved cities schema
│   │   ├── SearchHistory.js        # Search history schema
│   │   └── WeatherCache.js         # Cached weather data schema
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── weatherRoutes.js
│   │   ├── favoriteRoutes.js
│   │   └── historyRoutes.js
│   ├── utils/
│   │   └── generateToken.js        # JWT token generator
│   └── server.js                   # Entry point
│
└── frontend/
    ├── public/
    └── src/
        ├── assets/
        │   └── icons/              # Weather condition icons (PNG)
        ├── components/
        │   ├── forecast/           # Forecast-specific components
        │   │   ├── DailyForecastCard.jsx
        │   │   ├── DayDetailsCard.jsx
        │   │   ├── ForecastHeader.jsx
        │   │   ├── ForecastSearch.jsx
        │   │   ├── HourlyForecast.jsx
        │   │   ├── TemperatureTrend.jsx
        │   │   └── index.js
        │   ├── ErrorMessage.jsx
        │   ├── Footer.jsx
        │   ├── ForecastCard.jsx
        │   ├── Header.jsx
        │   ├── Loader.jsx
        │   ├── ProtectedRoute.jsx
        │   ├── SearchBar.jsx
        │   ├── WeatherBackground.jsx
        │   ├── WeatherCard.jsx
        │   ├── WeatherDetails.jsx
        │   ├── WelcomeSection.jsx
        │   └── index.js
        ├── context/
        │   └── AuthContext.jsx     # Global auth state (React Context)
        ├── hooks/
        │   └── useAuth.js          # Auth context consumer hook
        ├── pages/
        │   ├── Home.jsx
        │   ├── Forecast.jsx
        │   ├── Favorites.jsx
        │   ├── History.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   └── index.js
        ├── services/
        │   ├── api.js              # Axios base instance
        │   ├── authService.js      # Auth API calls
        │   ├── favoriteService.js  # Favorites API calls
        │   └── weatherService.js   # Weather API calls
        ├── App.jsx
        ├── index.css
        └── main.jsx
```

---

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) `v18+`
- [MongoDB](https://www.mongodb.com/) (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- A free [OpenWeatherMap API Key](https://openweathermap.org/api)

---

### 🔧 Backend Setup

```bash
# 1. Navigate to the backend directory
cd backend

# 2. Install dependencies
npm install

# 3. Create your environment file (see variables below)
cp .env.example .env

# 4. Start the development server
npm run dev
```

The backend will start on **`http://localhost:5000`**

---

### 🎨 Frontend Setup

```bash
# 1. Navigate to the frontend directory
cd frontend

# 2. Install dependencies
npm install

# 3. Create your environment file
cp .env.example .env

# 4. Start the development server
npm run dev
```

The frontend will start on **`http://localhost:5173`**

---

## 🔑 Environment Variables

### Backend — `backend/.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/aura
JWT_SECRET=your_super_secret_jwt_key_here
WEATHER_API_KEY=your_openweathermap_api_key
FRONTEND_URL=http://localhost:5173
```

### Frontend — `frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

> ⚠️ **Never commit `.env` files.** They are already included in `.gitignore`.

---

## 📸 Screenshots

<div align="center">

| Home Page | Forecast View |
|---|---|
| <img src="https://placehold.co/500x300/0f0f1a/61DAFB?text=Home+Page" width="100%" /> | <img src="https://placehold.co/500x300/0f0f1a/61DAFB?text=Forecast+View" width="100%" /> |

| Favorites | Search History |
|---|---|
| <img src="https://placehold.co/500x300/0f0f1a/61DAFB?text=Favorites+Page" width="100%" /> | <img src="https://placehold.co/500x300/0f0f1a/61DAFB?text=History+Page" width="100%" /> |

</div>

> 📌 Replace the placeholders above with real screenshots from your app.

---

## 🌐 Deployment

Both the frontend and backend are deployed on **[Render](https://render.com)**.

| Part | Platform | Type |
|---|---|---|
| Frontend | [Render](https://render.com) | Static Site |
| Backend | [Render](https://render.com) | Web Service (Node.js) |
| Database | [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) | Cloud Database |

### Backend (Render Web Service)
1. Create a new **Web Service** on Render and connect your GitHub repo
2. Set the **Root Directory** to `backend`
3. Set **Build Command** to `npm install`
4. Set **Start Command** to `npm start`
5. Add all required environment variables in the Render dashboard:
   - `PORT`, `MONGO_URI`, `JWT_SECRET`, `WEATHER_API_KEY`, `FRONTEND_URL`

### Frontend (Render Static Site)
1. Create a new **Static Site** on Render and connect your GitHub repo
2. Set the **Root Directory** to `frontend`
3. Set **Build Command** to `npm install && npm run build`
4. Set **Publish Directory** to `dist`
5. Add the environment variable:
   - `VITE_API_BASE_URL` → your live Render backend URL
6. Add a **Redirect/Rewrite Rule** for SPA routing:
   - Source: `/*` → Destination: `/index.html` → Action: `Rewrite`

---

## 📡 API Endpoints

```
Auth
  POST   /api/auth/register       → Register a new user
  POST   /api/auth/login          → Login & receive JWT

Weather
  GET    /api/weather/current     → Fetch current weather by city
  GET    /api/weather/forecast    → Fetch 5-day forecast by city

Favorites  (🔒 Protected)
  GET    /api/favorites           → Get user's saved cities
  POST   /api/favorites           → Add a city to favorites
  DELETE /api/favorites/:id       → Remove a favorite

History    (🔒 Protected)
  GET    /api/history             → Get user's search history
  DELETE /api/history             → Clear search history
```

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve Aura:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use it in your own portfolio!

---

## 👨‍💻 Author

<div align="center">

**Vishal Mer**

[![GitHub](https://img.shields.io/badge/GitHub-@VishalMer-181717?style=for-the-badge&logo=github)](https://github.com/VishalMer)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/vishalmer)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-FF5733?style=for-the-badge&logo=firefox)](https://yourportfolio.dev)

</div>

---

<div align="center">

Made with ❤️ and ☕ by Vishal Mer

⭐ **If you found this project helpful, please give it a star!** ⭐

</div>
