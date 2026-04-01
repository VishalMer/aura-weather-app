import { getWeatherIcon } from '../../services/weatherService';

const TemperatureTrend = ({ forecast, themeAccent }) => {
  if (!forecast || forecast.length === 0) return null;

  const maxTemp = Math.max(...forecast.map(d => d.tempMax));
  const minTemp = Math.min(...forecast.map(d => d.tempMin));
  const range = maxTemp - minTemp || 1;

  const getDayName = (date, index) => {
    if (index === 0) return 'Today';
    if (index === 1) return 'Tmrw';
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  // Calculate positions for the line chart
  const getYPosition = (temp) => {
    return 100 - ((temp - minTemp) / range) * 80 - 10;
  };

  // Generate SVG path for smooth curve
  const generatePath = (temps, isMax) => {
    const points = temps.map((day, i) => {
      const x = (i / (temps.length - 1)) * 100;
      const y = getYPosition(isMax ? day.tempMax : day.tempMin);
      return { x, y };
    });

    if (points.length < 2) return '';

    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      path += ` Q ${cpx} ${prev.y} ${cpx} ${(prev.y + curr.y) / 2}`;
      path += ` Q ${cpx} ${curr.y} ${curr.x} ${curr.y}`;
    }

    return path;
  };

  return (
    <div className="bg-white/60 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-700 mb-6 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
        Temperature Trend
      </h3>

      {/* Chart Container */}
      <div className="relative h-64 mt-4">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-8 w-12 flex flex-col justify-between text-xs text-gray-400">
          <span>{maxTemp}°</span>
          <span>{Math.round((maxTemp + minTemp) / 2)}°</span>
          <span>{minTemp}°</span>
        </div>

        {/* Chart area */}
        <div className="absolute left-14 right-4 top-0 bottom-0">
          {/* Grid lines */}
          <div className="absolute inset-0 flex flex-col justify-between pointer-events-none" style={{ bottom: '32px' }}>
            <div className="border-t border-gray-100" />
            <div className="border-t border-gray-100" />
            <div className="border-t border-gray-100" />
          </div>

          {/* SVG Chart */}
          <svg 
            className="w-full h-full" 
            viewBox="0 0 100 100" 
            preserveAspectRatio="none"
            style={{ paddingBottom: '32px' }}
          >
            {/* Area fill for max temp */}
            <defs>
              <linearGradient id="maxGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f87171" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f87171" stopOpacity="0.05" />
              </linearGradient>
              <linearGradient id="minGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.05" />
              </linearGradient>
            </defs>

            {/* Max temp line */}
            <path
              d={generatePath(forecast, true)}
              fill="none"
              stroke="#ef4444"
              strokeWidth="0.5"
              strokeLinecap="round"
              className="drop-shadow-sm"
            />

            {/* Min temp line */}
            <path
              d={generatePath(forecast, false)}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="0.5"
              strokeLinecap="round"
              className="drop-shadow-sm"
            />

            {/* Data points - Max */}
            {forecast.map((day, i) => {
              const x = (i / (forecast.length - 1)) * 100;
              const y = getYPosition(day.tempMax);
              return (
                <g key={`max-${i}`}>
                  <circle cx={x} cy={y} r="1.5" fill="white" stroke="#ef4444" strokeWidth="0.5" />
                </g>
              );
            })}

            {/* Data points - Min */}
            {forecast.map((day, i) => {
              const x = (i / (forecast.length - 1)) * 100;
              const y = getYPosition(day.tempMin);
              return (
                <g key={`min-${i}`}>
                  <circle cx={x} cy={y} r="1.5" fill="white" stroke="#3b82f6" strokeWidth="0.5" />
                </g>
              );
            })}
          </svg>

          {/* Day cards at bottom */}
          <div className="absolute bottom-0 left-0 right-0 flex justify-between">
            {forecast.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-8 h-8 mb-1">
                  <img
                    src={getWeatherIcon(day.weather.main)}
                    alt={day.weather.description}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {getDayName(day.date, index)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-8 mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 rounded-full bg-red-400" />
          <span className="text-sm text-gray-500">High ({maxTemp}°C)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 rounded-full bg-blue-400" />
          <span className="text-sm text-gray-500">Low ({minTemp}°C)</span>
        </div>
      </div>
    </div>
  );
};

export default TemperatureTrend;
