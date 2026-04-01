const ForecastHeader = ({ weather }) => {
  if (!weather) return null;

  return (
    <div className="text-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
        {weather.city}, {weather.country}
      </h2>
      <p className="text-gray-500 mt-1">
        {new Date().toLocaleDateString('en-US', { 
          weekday: 'long', 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })}
      </p>
    </div>
  );
};

export default ForecastHeader;
