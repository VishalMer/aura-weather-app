import { getWeatherIcon } from '../../services/weatherService';

const HourlyForecast = ({ hourlyData, themeAccent }) => {
  if (!hourlyData || hourlyData.length === 0) return null;

  const formatHour = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      hour12: true,
    });
  };

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        24-Hour Forecast
      </h3>

      <div className="overflow-x-auto pb-4 -mx-2 px-2 scrollbar-thin">
        <div className="flex gap-3 min-w-max">
          {hourlyData.map((hour, index) => (
            <div
              key={index}
              className={`flex flex-col items-center p-4 rounded-2xl w-20
                         transition-all duration-300 hover:scale-105
                         ${index === 0 
                           ? `bg-gradient-to-b ${themeAccent} text-white` 
                           : 'bg-white hover:shadow-md'}`}
            >
              <p className={`text-sm font-medium mb-2 ${index === 0 ? 'text-white/80' : 'text-gray-500'}`}>
                {index === 0 ? 'Now' : formatHour(hour.time)}
              </p>
              
              <div className="w-10 h-10 my-2">
                <img
                  src={getWeatherIcon(hour.weather.main)}
                  alt={hour.weather.description}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <p className={`text-lg font-bold ${index === 0 ? 'text-white' : 'text-gray-800'}`}>
                {hour.temp}°
              </p>
              
              <div className={`flex items-center gap-1 mt-1 text-xs ${index === 0 ? 'text-white/70' : 'text-gray-400'}`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
                {hour.windSpeed.toFixed(1)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;
