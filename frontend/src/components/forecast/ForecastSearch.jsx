const ForecastSearch = ({ city, setCity, onSubmit, loading, themeAccent }) => {
  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto">
      <div className="relative flex items-center">
        <div className="absolute left-4 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name for forecast..."
          disabled={loading}
          className="w-full py-4 pl-12 pr-36 text-lg bg-white/90 backdrop-blur-md 
                     border border-gray-200 rounded-2xl shadow-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                     placeholder-gray-400 text-gray-700 transition-all duration-300
                     disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={loading || !city.trim()}
          className={`absolute right-2 px-6 py-2.5 bg-gradient-to-r ${themeAccent} 
                     text-white font-semibold rounded-xl
                     hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-400
                     transition-all duration-300 disabled:opacity-50
                     flex items-center gap-2`}
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Loading...</span>
            </>
          ) : (
            'Get Forecast'
          )}
        </button>
      </div>
    </form>
  );
};

export default ForecastSearch;
