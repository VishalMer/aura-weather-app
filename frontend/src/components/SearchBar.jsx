import { useState } from 'react';

const SearchBar = ({ onSearch, isLoading }) => {
  const [city, setCity] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center">
          {/* Search Icon */}
          <div className="absolute left-4 text-gray-400">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Input Field */}
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Search for a city..."
            disabled={isLoading}
            className="w-full py-4 pl-12 pr-32 text-lg bg-white/90 backdrop-blur-md 
                       border border-gray-200 rounded-2xl shadow-lg
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
                       placeholder-gray-400 text-gray-700
                       transition-all duration-300 ease-in-out
                       disabled:opacity-60 disabled:cursor-not-allowed"
          />

          {/* Search Button */}
          <button
            type="submit"
            disabled={isLoading || !city.trim()}
            className="absolute right-2 px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 
                       text-white font-semibold rounded-xl
                       hover:from-blue-600 hover:to-indigo-700
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                       transition-all duration-300 ease-in-out
                       disabled:opacity-50 disabled:cursor-not-allowed
                       flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <span className="hidden sm:inline">Searching...</span>
              </>
            ) : (
              <>
                <span>Search</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Quick Search Suggestions */}
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        <span className="text-gray-500 text-sm">Popular:</span>
        {['New York', 'London', 'Tokyo', 'Paris', 'Sydney'].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => {
              setCity(suggestion);
              onSearch(suggestion);
            }}
            disabled={isLoading}
            className="px-3 py-1 text-sm bg-white/60 hover:bg-white/80 
                       text-gray-600 rounded-full border border-gray-200
                       transition-all duration-200 disabled:opacity-50"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
