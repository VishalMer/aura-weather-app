import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  getCurrentWeather,
  getForecast,
  getWeatherTheme,
} from '../services/weatherService';
import { Loader, ErrorMessage } from '../components';
import {
  DailyForecastCard,
  DayDetailsCard,
  HourlyForecast,
  TemperatureTrend,
  ForecastSearch,
  ForecastHeader,
} from '../components/forecast';

const Forecast = ({ setTheme, setWeatherMain, theme }) => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDay, setSelectedDay] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();
  const forecastRef = useRef(null);

  // Load last searched city on mount
  useEffect(() => {
    const savedCity = localStorage.getItem('lastSearchedCity');
    if (savedCity) {
      setCity(savedCity);
      handleSearch(savedCity);
    }
  }, []);

  // Check if we came with a city from another page
  useEffect(() => {
    if (location.state?.city) {
      setCity(location.state.city);
      handleSearch(location.state.city);
    }
  }, [location.state]);

  // Update theme based on weather
  useEffect(() => {
    if (weather?.weather?.main) {
      setTheme(getWeatherTheme(weather.weather.main));
      setWeatherMain(weather.weather.main);
    }
  }, [weather, setTheme, setWeatherMain]);

  const handleSearch = async (searchCity) => {
    if (!searchCity.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(searchCity),
        getForecast(searchCity),
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
      setSelectedDay(0);
      localStorage.setItem('lastSearchedCity', searchCity);

      // Generate hourly data from forecast
      generateHourlyForecast(forecastData);

      // Scroll to forecast section
      setTimeout(() => {
        forecastRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const generateHourlyForecast = (forecastData) => {
    const hours = [];
    const now = new Date();

    for (let i = 0; i < 24; i++) {
      const hour = new Date(now.getTime() + i * 60 * 60 * 1000);
      const dayIndex = Math.floor(i / 8) % forecastData.length;
      const baseForecast = forecastData[dayIndex] || forecastData[0];

      const hourOfDay = hour.getHours();
      const tempVariation = Math.sin((hourOfDay - 6) * Math.PI / 12) * 3;

      hours.push({
        time: hour,
        temp: Math.round(baseForecast.temp + tempVariation),
        weather: baseForecast.weather,
        humidity: baseForecast.humidity + Math.floor(Math.random() * 10 - 5),
        windSpeed: baseForecast.windSpeed + Math.random() * 2 - 1,
      });
    }

    setHourlyForecast(hours);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      handleSearch(city.trim());
    }
  };

  const getDayName = (date, index) => {
    if (index === 0) return 'Today';
    if (index === 1) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const getThemeAccent = () => {
    const themes = {
      solar: 'from-amber-400 to-orange-500',
      storm: 'from-purple-500 to-slate-700',
      rain: 'from-cyan-400 to-blue-600',
      snow: 'from-sky-300 to-slate-400',
      neutral: 'from-blue-500 to-indigo-600',
    };
    return themes[theme] || themes.neutral;
  };

  return (
    <div className="flex-1 pb-8">
      {/* Hero Section */}
      <section className="py-8 md:py-12">
        <div className="text-center mb-8">
          <h1
            className="text-4xl md:text-5xl font-bold mb-3 transition-all duration-700"
            style={{
              color: ['storm', 'rain'].includes(theme) ? '#ffffff' : '#1f2937',
              textShadow: ['storm', 'rain'].includes(theme)
                ? '0 2px 16px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,1)'
                : 'none',
            }}
          >
            5-Day{' '}
            <span className={`bg-gradient-to-r ${getThemeAccent()} bg-clip-text text-transparent`}>
              Forecast
            </span>
          </h1>
          <p
            className="text-lg transition-all duration-700"
            style={{
              color: ['storm', 'rain'].includes(theme)
                ? 'rgba(255,255,255,0.85)'
                : 'rgba(107,114,128,1)',
              textShadow: ['storm', 'rain'].includes(theme)
                ? '0 1px 6px rgba(0,0,0,0.7)'
                : 'none',
            }}
          >
            Get detailed weather forecast for the next 5 days
          </p>
        </div>

        {/* Search Form */}
        <ForecastSearch
          city={city}
          setCity={setCity}
          onSubmit={handleSubmit}
          loading={loading}
          themeAccent={getThemeAccent()}
        />
      </section>

      {/* Loading */}
      {loading && <Loader />}

      {/* Error */}
      {error && !loading && (
        <ErrorMessage message={error} onRetry={() => handleSearch(city)} />
      )}

      {/* Forecast Content */}
      {forecast && weather && !loading && !error && (
        <div ref={forecastRef} className="space-y-8 animate-fadeIn">

          {/* Current Location Info */}
          <ForecastHeader weather={weather} />

          {/* 5-Day Forecast Cards */}
          <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              5-Day Overview
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {forecast.map((day, index) => (
                <DailyForecastCard
                  key={index}
                  day={day}
                  index={index}
                  isSelected={selectedDay === index}
                  onClick={() => setSelectedDay(index)}
                  themeAccent={getThemeAccent()}
                />
              ))}
            </div>
          </div>

          {/* Selected Day Details */}
          <DayDetailsCard
            day={forecast[selectedDay]}
            dayName={getDayName(forecast[selectedDay]?.date, selectedDay)}
          />

          {/* 24-Hour Forecast */}
          <HourlyForecast
            hourlyData={hourlyForecast}
            themeAccent={getThemeAccent()}
          />

          {/* Temperature Trend Chart */}
          <TemperatureTrend
            forecast={forecast}
            themeAccent={getThemeAccent()}
          />

          {/* Back to Current Weather */}
          <div className="text-center pt-4">
            <button
              onClick={() => navigate('/', { state: { city: weather.city } })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-gray-50 
                         text-gray-700 font-medium rounded-xl shadow-md border border-gray-200
                         transition-all duration-300 hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Current Weather
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!forecast && !loading && !error && (
        <div className="text-center py-16">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full animate-pulse" />
            <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <h3
            className="text-xl font-semibold mb-2 transition-all duration-700"
            style={{ color: ['storm', 'rain'].includes(theme) ? '#fff' : '#374151' }}
          >
            Get Your 5-Day Forecast
          </h3>
          <p
            className="max-w-md mx-auto transition-all duration-700"
            style={{
              color: ['storm', 'rain'].includes(theme) ? 'rgba(255,255,255,0.8)' : 'rgba(107,114,128,1)',
              textShadow: ['storm', 'rain'].includes(theme) ? '0 1px 5px rgba(0,0,0,0.6)' : 'none',
            }}
          >
            Enter a city name above to see the detailed weather forecast for the next 5 days
          </p>
        </div>
      )}
    </div>
  );
};

export default Forecast;
