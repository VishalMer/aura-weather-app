import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  SearchBar,
  WeatherCard,
  WeatherDetails,
  ForecastCard,
  Loader,
  ErrorMessage,
  WelcomeSection,
} from '../components';
import {
  getCurrentWeather,
  getForecast,
  getWeatherTheme,
} from '../services/weatherService';

const Home = ({ setTheme, setWeatherMain, theme }) => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastSearchedCity, setLastSearchedCity] = useState('');
  
  const location = useLocation();

  // Load last searched city from localStorage on mount
  useEffect(() => {
    const savedCity = localStorage.getItem('lastSearchedCity');
    if (savedCity) {
      handleSearch(savedCity);
    }
  }, []);

  // Check if we came from forecast page with a city
  useEffect(() => {
    if (location.state?.city) {
      handleSearch(location.state.city);
    }
  }, [location.state]);

  // Update theme based on weather condition
  useEffect(() => {
    if (weather?.weather?.main) {
      setTheme(getWeatherTheme(weather.weather.main));
      setWeatherMain(weather.weather.main);
    }
  }, [weather, setTheme, setWeatherMain]);

  const handleSearch = async (city) => {
    if (!city.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(city),
        getForecast(city),
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
      setLastSearchedCity(city);
      localStorage.setItem('lastSearchedCity', city);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    if (lastSearchedCity) {
      handleSearch(lastSearchedCity);
    }
  };

  return (
    <div className="flex-1">
      {/* Search Section */}
      <section className="py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
            Weather <span className="bg-gradient-to-r from-blue-500 to-indigo-600 
                                     bg-clip-text text-transparent">Forecast</span>
          </h1>
          <p className="text-gray-500 text-lg">
            Enter a city name to get the current weather and forecast
          </p>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={loading} />
      </section>

      {/* Weather Content */}
      <section className="mt-4">
        {/* Loading State */}
        {loading && <Loader />}

        {/* Error State */}
        {error && !loading && (
          <ErrorMessage message={error} onRetry={handleRetry} />
        )}

        {/* Weather Display */}
        {weather && !loading && !error && (
          <div className="space-y-8 animate-fadeIn">
            {/* Main Weather Card */}
            <WeatherCard weather={weather} theme={theme} />

            {/* Weather Details Grid */}
            <WeatherDetails weather={weather} theme={theme} />

            {/* Forecast Section */}
            {forecast && <ForecastCard forecast={forecast} theme={theme} />}
          </div>
        )}

        {/* Welcome Section (when no weather data) */}
        {!weather && !loading && !error && <WelcomeSection />}
      </section>
    </div>
  );
};

export default Home;
