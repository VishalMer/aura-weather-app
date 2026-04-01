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

// Returns gradient class + glow + shadow for text based on weather theme
const getForecastStyle = (theme) => {
  const styles = {
    solar:   { gradient: 'from-amber-300 via-orange-400 to-yellow-300',  glow: 'rgba(251,191,36,0.55)',   shadow: 'rgba(251,146,60,0.25)'  },
    storm:   { gradient: 'from-violet-300 via-purple-400 to-indigo-400', glow: 'rgba(167,139,250,0.55)',  shadow: 'rgba(139,92,246,0.25)'  },
    rain:    { gradient: 'from-cyan-300 via-blue-400 to-sky-300',        glow: 'rgba(56,189,248,0.55)',   shadow: 'rgba(56,189,248,0.25)'  },
    snow:    { gradient: 'from-sky-200 via-blue-200 to-slate-300',       glow: 'rgba(186,230,253,0.55)',  shadow: 'rgba(186,230,253,0.2)'  },
    neutral: { gradient: 'from-blue-300 via-indigo-400 to-violet-400',  glow: 'rgba(129,140,248,0.55)',  shadow: 'rgba(99,102,241,0.25)'  },
  };
  return styles[theme] || styles.neutral;
};

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
         <h1
  className="text-4xl md:text-5xl font-bold text-white mb-3"
  style={{
    textShadow: `0 2px 8px ${getForecastStyle(theme).shadow}`,
    WebkitTextStroke: '0.6px rgba(0, 0, 0, 0.18)',
    paintOrder: 'stroke fill',
    transition: 'all 0.7s ease',
  }}
>
  Weather{' '}
  <span className="relative inline-block">
    {/* Bottom Layer: White Outline and Glow/Shadow */}
    <span
      className="absolute inset-0 z-0 text-transparent select-none"
      style={{
        WebkitTextStroke: '2px white', /* Slightly thicker stroke for a cleaner pop */
        filter: `drop-shadow(0 2px 10px ${getForecastStyle(theme).glow})`,
        transition: 'filter 0.7s ease',
      }}
      aria-hidden="true"
    >
      Forecast
    </span>

    {/* Top Layer: Crisp Gradient Fill */}
    <span
      className={`relative z-10 bg-gradient-to-r ${getForecastStyle(theme).gradient} bg-clip-text text-transparent`}
      style={{
        WebkitTextStroke: '0', /* Overrides the 0.6px black stroke from the h1 */
        textShadow: 'none', /* Prevents inheriting the h1 textShadow inside the gradient */
      }}
    >
      Forecast
    </span>
  </span>
</h1>
          <p
            className="text-white/80 text-lg"
            style={{ textShadow: '0 1px 6px rgba(0,0,0,0.4)' }}
          >
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
