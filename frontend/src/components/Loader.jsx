const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      {/* Animated Weather Loader */}
      <div className="relative w-24 h-24 mb-6">
        {/* Sun */}
        <div className="absolute inset-0 animate-pulse">
          <div className="w-12 h-12 bg-gradient-to-br from-amber-300 to-amber-500 
                          rounded-full absolute top-1/2 left-1/2 
                          transform -translate-x-1/2 -translate-y-1/2
                          shadow-lg shadow-amber-200">
          </div>
        </div>
        
        {/* Cloud */}
        <div className="absolute bottom-0 right-0 animate-[float_3s_ease-in-out_infinite]">
          <div className="relative">
            <div className="w-16 h-10 bg-white rounded-full shadow-md" />
            <div className="absolute -top-3 left-2 w-8 h-8 bg-white rounded-full" />
            <div className="absolute -top-1 right-2 w-6 h-6 bg-white rounded-full" />
          </div>
        </div>
      </div>

      {/* Loading Text */}
      <div className="flex items-center gap-2">
        <span className="text-lg text-gray-600 font-medium">Fetching weather data</span>
        <span className="flex gap-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </span>
      </div>

      <p className="text-gray-400 text-sm mt-2">Please wait...</p>
    </div>
  );
};

export default Loader;
