const WeatherDetails = ({ weather, theme }) => {
  if (!weather) return null;

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getWindDirection = (deg) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  const details = [
    {
      label: 'Humidity',
      value: `${weather.humidity}%`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
        </svg>
      ),
      description: weather.humidity > 70 ? 'High humidity' : weather.humidity > 40 ? 'Moderate' : 'Low humidity',
    },
    {
      label: 'Wind Speed',
      value: `${weather.windSpeed} m/s`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      ),
      description: `Direction: ${getWindDirection(weather.windDeg)}`,
    },
    {
      label: 'Pressure',
      value: `${weather.pressure} hPa`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      description: weather.pressure > 1013 ? 'High pressure' : 'Low pressure',
    },
    {
      label: 'Visibility',
      value: weather.visibility ? `${weather.visibility} km` : 'N/A',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      description: weather.visibility >= 10 ? 'Clear visibility' : 'Reduced visibility',
    },
    {
      label: 'Cloudiness',
      value: `${weather.clouds}%`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      ),
      description: weather.clouds > 80 ? 'Overcast' : weather.clouds > 20 ? 'Partly cloudy' : 'Clear skies',
    },
    {
      label: 'Sunrise',
      value: formatTime(weather.sunrise),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      description: 'Sunrise time',
      sunrise: true,
    },
    {
      label: 'Sunset',
      value: formatTime(weather.sunset),
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ),
      description: 'Sunset time',
      sunset: true,
    },
    {
      label: 'Feels Like',
      value: `${weather.feelsLike}°C`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: weather.feelsLike > weather.temperature ? 'Feels warmer' : weather.feelsLike < weather.temperature ? 'Feels cooler' : 'Feels accurate',
    },
  ];

  const getThemeAccent = () => {
    const themes = {
      solar: 'text-amber-500 bg-amber-50',
      storm: 'text-purple-500 bg-purple-50',
      rain: 'text-cyan-500 bg-cyan-50',
      snow: 'text-sky-400 bg-sky-50',
      neutral: 'text-gray-500 bg-gray-50',
    };
    return themes[theme] || themes.neutral;
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Weather Details
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {details.map((detail, index) => (
          <div
            key={index}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 border border-gray-100
                       hover:bg-white hover:shadow-lg transition-all duration-300
                       group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-xl ${getThemeAccent()} transition-colors duration-300`}>
                {detail.icon}
              </div>
              <span className="text-sm text-gray-500 font-medium">{detail.label}</span>
            </div>
            <p className="text-2xl font-semibold text-gray-800 mb-1">{detail.value}</p>
            <p className="text-xs text-gray-400">{detail.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDetails;
