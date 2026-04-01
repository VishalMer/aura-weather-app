import { useState, useEffect } from 'react';
import { getWeatherIcon } from '../services/weatherService';
import { addFavorite, removeFavorite, getFavorites } from '../services/favoriteService';
import { useAuth } from '../hooks/useAuth';

const WeatherCard = ({ weather, theme }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [heartAnim, setHeartAnim] = useState(false);
  const { isAuthenticated } = useAuth();

  if (!weather) return null;

  const formatTime = (date) =>
    date instanceof Date
      ? date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
      : '';

  const formatDate = (date) =>
    date instanceof Date
      ? date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
      : '';

  const getThemeClasses = () => {
    const themes = {
      solar: 'from-amber-400/20 to-orange-500/20 border-amber-300/50',
      storm: 'from-purple-600/20 to-slate-700/20 border-purple-400/50',
      rain: 'from-cyan-400/20 to-blue-600/20 border-cyan-300/50',
      snow: 'from-sky-200/20 to-slate-300/20 border-sky-300/50',
      neutral: 'from-gray-100/20 to-gray-200/20 border-gray-300/50',
    };
    return themes[theme] || themes.neutral;
  };

  // Check if this city is already favorited on mount
  useEffect(() => {
    if (!isAuthenticated || !weather?.city) return;
    getFavorites()
      .then((favs) => {
        setIsFavorited(favs.some((f) => f.city.toLowerCase() === weather.city.toLowerCase()));
      })
      .catch(() => {});
  }, [weather?.city, isAuthenticated]);

  const handleFavoriteToggle = async () => {
    if (!isAuthenticated || favLoading) return;
    setFavLoading(true);
    setHeartAnim(true);
    setTimeout(() => setHeartAnim(false), 600);

    try {
      if (isFavorited) {
        await removeFavorite(weather.city);
        setIsFavorited(false);
      } else {
        await addFavorite(weather.city);
        setIsFavorited(true);
      }
    } catch {
      // silent — city already favorited or network error
    } finally {
      setFavLoading(false);
    }
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${getThemeClasses()} 
                  backdrop-blur-xl border shadow-2xl p-8 md:p-10
                  transition-all duration-500 ease-in-out`}
    >
      {/* Background blobs */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-white to-transparent rounded-full transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-white to-transparent rounded-full transform -translate-x-1/2 translate-y-1/2" />
      </div>

      {/* Favorites Heart Button */}
      {isAuthenticated && (
        <button
          id={`fav-btn-${weather.city}`}
          onClick={handleFavoriteToggle}
          disabled={favLoading}
          aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          className={`absolute top-6 right-6 z-20 p-2 rounded-full transition-all duration-300
                      bg-white/20 hover:bg-white/40 backdrop-blur-sm
                      ${heartAnim ? 'scale-125' : 'scale-100'}`}
        >
          <svg
            className={`w-6 h-6 transition-colors duration-300 ${isFavorited ? 'text-red-500' : 'text-gray-400 hover:text-red-400'}`}
            fill={isFavorited ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
      )}

      {/* Main Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col mb-6">
          {/* Top row: city name + last updated (pushed right, clear of heart) */}
          <div className="flex items-start justify-between gap-4 pr-14">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 flex items-center gap-2 flex-wrap">
                {weather.city}
                <span className="text-lg md:text-xl font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {weather.country}
                </span>
              </h2>
              <p className="text-gray-500 mt-1 text-base">{formatDate(weather.dt)}</p>
            </div>
            <div className="text-right shrink-0">
              <p className="text-sm text-gray-400">Last updated</p>
              <p className="text-gray-600 font-medium">{formatTime(weather.dt)}</p>
            </div>
          </div>
        </div>

        {/* Temperature & Icon */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
          <div className="relative">
            <div className="w-40 h-40 md:w-48 md:h-48 relative">
              <img
                src={getWeatherIcon(weather.weather.main)}
                alt={weather.weather.description}
                className="w-full h-full object-contain drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]"
              />
            </div>
          </div>

          <div className="text-center md:text-right">
            <div className="flex items-start justify-center md:justify-end">
              <span className="text-8xl md:text-9xl font-extralight text-gray-800">
                {weather.temperature}
              </span>
              <span className="text-4xl md:text-5xl font-light text-gray-500 mt-4">°C</span>
            </div>
            <p className="text-xl md:text-2xl text-gray-600 capitalize mt-2">
              {weather.weather.description}
            </p>
            <p className="text-gray-400 mt-1">Feels like {weather.feelsLike}°C</p>
          </div>
        </div>

        {/* Min/Max */}
        <div className="flex justify-center gap-8 pt-6 border-t border-gray-200/50">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            <span className="text-gray-600">Min: {weather.tempMin}°C</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            <span className="text-gray-600">Max: {weather.tempMax}°C</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
