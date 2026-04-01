import { getWeatherIcon } from '../../services/weatherService';

const DailyForecastCard = ({ day, index, isSelected, onClick, themeAccent }) => {
  const getDayName = (date, idx) => {
    if (idx === 0) return 'Today';
    if (idx === 1) return 'Tomorrow';
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div
      onClick={onClick}
      className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300
                 ${isSelected 
                   ? `bg-gradient-to-br ${themeAccent} text-white shadow-lg scale-105` 
                   : 'bg-white hover:bg-gray-50 hover:shadow-md'}`}
    >
      {/* Day Name */}
      <p className={`text-sm font-medium mb-2 ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
        {getDayName(day.date, index)}
      </p>
      
      {/* Date */}
      <p className={`text-xs mb-3 ${isSelected ? 'text-white/60' : 'text-gray-400'}`}>
        {day.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </p>

      {/* Weather Icon */}
      <div className="w-16 h-16 mx-auto mb-3">
        <img
          src={getWeatherIcon(day.weather.main)}
          alt={day.weather.description}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Temperature */}
      <p className={`text-3xl font-bold text-center mb-1 ${isSelected ? 'text-white' : 'text-gray-800'}`}>
        {day.temp}°C
      </p>

      {/* Min/Max */}
      <div className={`flex justify-center gap-3 text-sm ${isSelected ? 'text-white/80' : 'text-gray-500'}`}>
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          {day.tempMin}°
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          {day.tempMax}°
        </span>
      </div>

      {/* Weather Description */}
      <p className={`text-xs text-center mt-2 capitalize ${isSelected ? 'text-white/70' : 'text-gray-400'}`}>
        {day.weather.description}
      </p>

      {/* Selected Indicator */}
      {isSelected && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
          <div className="w-2 h-2 bg-white rounded-full shadow-md" />
        </div>
      )}
    </div>
  );
};

export default DailyForecastCard;
