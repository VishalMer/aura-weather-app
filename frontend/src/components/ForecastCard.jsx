import { getWeatherIcon } from '../services/weatherService';

const ForecastCard = ({ forecast, theme }) => {
  if (!forecast || forecast.length === 0) return null;

  const getDayName = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const getThemeClasses = () => {
    const themes = {
      solar: 'border-amber-200/50 hover:border-amber-300',
      storm: 'border-purple-200/50 hover:border-purple-300',
      rain: 'border-cyan-200/50 hover:border-cyan-300',
      snow: 'border-sky-200/50 hover:border-sky-300',
      neutral: 'border-gray-200/50 hover:border-gray-300',
    };
    return themes[theme] || themes.neutral;
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        5-Day Forecast
      </h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className={`bg-white/70 backdrop-blur-sm rounded-2xl p-4 border ${getThemeClasses()}
                       hover:bg-white hover:shadow-lg transition-all duration-300
                       flex flex-col items-center text-center`}
          >
            {/* Day Name */}
            <p className="text-sm font-medium text-gray-500 mb-2">
              {getDayName(day.date)}
            </p>

            {/* Date */}
            <p className="text-xs text-gray-400 mb-3">
              {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>

            {/* Weather Icon */}
            <div className="w-16 h-16 mb-3">
              <img
                src={getWeatherIcon(day.weather.main)}
                alt={day.weather.description}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Temperature */}
            <p className="text-2xl font-bold text-gray-800 mb-1">{day.temp}°C</p>

            {/* Min/Max */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="text-blue-500">{day.tempMin}°</span>
              <span>/</span>
              <span className="text-red-500">{day.tempMax}°</span>
            </div>

            {/* Weather Description */}
            <p className="text-xs text-gray-500 mt-2 capitalize">
              {day.weather.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastCard;
