import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFavorites, removeFavorite } from '../services/favoriteService';
import { getCurrentWeather, getWeatherIcon } from '../services/weatherService';

const SkeletonCard = () => (
  <div className="favorite-skeleton">
    <div className="skeleton-icon" />
    <div className="skeleton-line skeleton-line-lg" />
    <div className="skeleton-line skeleton-line-sm" />
    <div className="skeleton-line skeleton-line-md" />
  </div>
);

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [weatherMap, setWeatherMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [removingCity, setRemovingCity] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const favList = await getFavorites();
      setFavorites(favList);

      // Fetch weather for each favorite in parallel
      const weatherResults = await Promise.allSettled(
        favList.map((fav) => getCurrentWeather(fav.city))
      );

      const map = {};
      weatherResults.forEach((result, i) => {
        if (result.status === 'fulfilled') {
          map[favList[i].city] = result.value;
        }
      });
      setWeatherMap(map);
    } catch (err) {
      console.error('Failed to load favorites:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (city) => {
    setRemovingCity(city);
    try {
      await removeFavorite(city);
      setFavorites((prev) => prev.filter((f) => f.city !== city));
      setWeatherMap((prev) => {
        const updated = { ...prev };
        delete updated[city];
        return updated;
      });
    } catch (err) {
      console.error('Failed to remove favorite:', err);
    } finally {
      setRemovingCity(null);
    }
  };

  const handleCityClick = (city) => {
    navigate('/', { state: { city } });
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">
            <span className="page-title-icon">❤️</span> My Favorites
          </h1>
          <p className="page-subtitle">Your saved cities</p>
        </div>
        <div className="favorites-grid">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">
          <span className="page-title-icon">❤️</span> My Favorites
        </h1>
        <p className="page-subtitle">
          {favorites.length} saved {favorites.length === 1 ? 'city' : 'cities'}
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🌍</div>
          <h3 className="empty-state-title">No favorites yet</h3>
          <p className="empty-state-text">
            Search for a city and click the heart icon to save it here.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
            id="go-search-btn"
          >
            Search a city
          </button>
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((fav) => {
            const w = weatherMap[fav.city];
            return (
              <div
                key={fav._id}
                className="favorite-card"
                onClick={() => handleCityClick(fav.city)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleCityClick(fav.city)}
              >
                {/* Remove Button */}
                <button
                  id={`remove-fav-${fav.city}`}
                  className="fav-remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemove(fav.city);
                  }}
                  disabled={removingCity === fav.city}
                  aria-label={`Remove ${fav.city} from favorites`}
                >
                  {removingCity === fav.city ? (
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 18L18 6M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
                    </svg>
                  )}
                </button>

                {/* Weather Icon */}
                <div className="fav-icon-wrapper">
                  {w ? (
                    <img
                      src={getWeatherIcon(w.weather.main)}
                      alt={w.weather.description}
                      className="fav-weather-icon"
                    />
                  ) : (
                    <span className="fav-placeholder-icon">🌤️</span>
                  )}
                </div>

                {/* City Name */}
                <h3 className="fav-city-name">{fav.city}</h3>

                {/* Weather Info */}
                {w ? (
                  <>
                    <p className="fav-country">{w.country}</p>
                    <p className="fav-temperature">{w.temperature}°C</p>
                    <p className="fav-condition">{w.weather.description}</p>
                  </>
                ) : (
                  <p className="fav-unavailable">Weather unavailable</p>
                )}

                {/* Click prompt */}
                <div className="fav-click-hint">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  <span>View weather</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
