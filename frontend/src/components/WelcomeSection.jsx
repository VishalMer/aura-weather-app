const WelcomeSection = () => {
  return (
    <div className="text-center py-12 md:py-16">
      {/* Hero Illustration */}
      <div className="relative w-48 h-48 mx-auto mb-8">
        {/* Sun */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-gradient-to-br from-amber-300 to-amber-500 
                        rounded-full shadow-lg shadow-amber-200/50 animate-pulse" />
        
        {/* Main Cloud */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 
                        animate-[float_6s_ease-in-out_infinite]">
          <div className="relative">
            <div className="w-32 h-20 bg-white rounded-full shadow-xl" />
            <div className="absolute -top-8 left-4 w-16 h-16 bg-white rounded-full shadow-lg" />
            <div className="absolute -top-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg" />
          </div>
        </div>

        {/* Small Cloud */}
        <div className="absolute top-12 left-0 opacity-60 
                        animate-[float_8s_ease-in-out_infinite_reverse]">
          <div className="relative">
            <div className="w-16 h-10 bg-white rounded-full shadow-md" />
            <div className="absolute -top-4 left-2 w-8 h-8 bg-white rounded-full" />
          </div>
        </div>

        {/* Birds */}
        <div className="absolute top-8 right-16">
          <svg className="w-6 h-6 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.5 11.5c.28 0 .5-.22.5-.5V9c0-.28.22-.5.5-.5S6 8.72 6 9v2c0 .28.22.5.5.5s.5-.22.5-.5V9c0-.28.22-.5.5-.5s.5.22.5.5v2c0 1.38-1.12 2.5-2.5 2.5S3 12.38 3 11V9c0-.28.22-.5.5-.5s.5.22.5.5v2c0 .28.22.5.5.5z"/>
          </svg>
        </div>
      </div>

      {/* Welcome Text */}
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
        Welcome to <span className="bg-gradient-to-r from-blue-500 to-indigo-600 
                                    bg-clip-text text-transparent">Aura</span>
      </h2>
      
      <p className="text-lg text-gray-500 max-w-xl mx-auto mb-8">
        Your personal weather companion. Get real-time weather updates for any city around the world.
      </p>

      {/* Features */}
      <div className="flex flex-wrap justify-center gap-4 max-w-2xl mx-auto">
        <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full shadow-sm">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm text-gray-600">Real-time Data</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full shadow-sm">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
          </svg>
          <span className="text-sm text-gray-600">Global Coverage</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full shadow-sm">
          <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-gray-600">5-Day Forecast</span>
        </div>
      </div>

      {/* Arrow Down */}
      <div className="mt-12 animate-bounce">
        <svg className="w-6 h-6 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
        <p className="text-sm text-gray-400 mt-2">Search for a city above</p>
      </div>
    </div>
  );
};

export default WelcomeSection;
