const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* Error Icon */}
      <div className="w-20 h-20 mb-6 relative">
        <div className="absolute inset-0 bg-red-100 rounded-full animate-ping opacity-25" />
        <div className="relative w-full h-full bg-gradient-to-br from-red-400 to-red-500 
                        rounded-full flex items-center justify-center shadow-lg">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      </div>

      {/* Error Message */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
      <p className="text-gray-500 text-center max-w-md mb-6">{message}</p>

      {/* Retry Button */}
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 
                     text-white font-medium rounded-xl shadow-lg
                     hover:from-blue-600 hover:to-indigo-700
                     focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2
                     transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Try Again
        </button>
      )}

      {/* Suggestions */}
      <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-gray-100 max-w-md">
        <p className="text-sm font-medium text-gray-700 mb-2">💡 Quick Tips:</p>
        <ul className="text-sm text-gray-500 space-y-1">
          <li>• Check the spelling of the city name</li>
          <li>• Try searching with the country code (e.g., "London, UK")</li>
          <li>• Make sure you have an internet connection</li>
        </ul>
      </div>
    </div>
  );
};

export default ErrorMessage;
