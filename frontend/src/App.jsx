import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Header, Footer, WeatherBackground, ProtectedRoute } from './components';
import { Home, Forecast, Login, Register, Favorites, History } from './pages';

const AUTH_ROUTES = ['/login', '/register'];

const AppContent = ({ theme, setTheme, weatherMain, setWeatherMain }) => {
  const location = useLocation();
  const isAuthPage = AUTH_ROUTES.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col relative transition-all duration-700 ease-in-out">
      {/* Dynamic Weather Background */}
      <WeatherBackground weatherMain={weatherMain} theme={theme} />

      {/* Header — hidden on auth pages */}
      {!isAuthPage && <Header theme={theme} />}

      {/* Main Content */}
      <main className={`flex-1 ${!isAuthPage ? 'max-w-6xl w-full mx-auto px-4 pb-8 relative z-10' : ''}`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home setTheme={setTheme} setWeatherMain={setWeatherMain} theme={theme} />} />
          <Route path="/forecast" element={<Forecast setTheme={setTheme} setWeatherMain={setWeatherMain} theme={theme} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route path="/favorites" element={<ProtectedRoute><Favorites /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />

          {/* 404 Fallback */}
          <Route path="*" element={
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-8xl mb-6">🌫️</p>
              <h2 className="text-3xl font-bold text-gray-700 mb-3">Page Not Found</h2>
              <p className="text-gray-500 mb-6">The page you&apos;re looking for doesn&apos;t exist.</p>
              <a href="/" className="btn-primary">Go Home</a>
            </div>
          } />
        </Routes>
      </main>

      {/* Footer — hidden on auth pages */}
      {!isAuthPage && <Footer />}
    </div>
  );
};

const App = () => {
  const [theme, setTheme] = useState('neutral');
  const [weatherMain, setWeatherMain] = useState('Clear');

  return (
    <Router>
      <AppContent
        theme={theme}
        setTheme={setTheme}
        weatherMain={weatherMain}
        setWeatherMain={setWeatherMain}
      />
    </Router>
  );
};

export default App;
