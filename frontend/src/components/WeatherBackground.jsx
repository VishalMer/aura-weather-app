import { useEffect, useState, useMemo } from 'react';

const WeatherBackground = ({ weatherMain, theme }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Memoize particles to prevent re-creation on every render
  const particles = useMemo(() => {
    const createParticles = (count) => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
        size: 0.5 + Math.random() * 1.5,
        opacity: 0.3 + Math.random() * 0.7,
      }));
    };

    return {
      rain: createParticles(100),
      snow: createParticles(60),
      clouds: createParticles(8),
      stars: createParticles(50),
      dust: createParticles(30),
    };
  }, []);

  // Get background gradient based on weather
  const getBackgroundStyle = () => {
    const backgrounds = {
      Clear: 'linear-gradient(180deg, #87CEEB 0%, #FFE4B5 50%, #FFA500 100%)',
      Clouds: 'linear-gradient(180deg, #667eea 0%, #a8b5c7 50%, #bdc3c7 100%)',
      Rain: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
      Drizzle: 'linear-gradient(180deg, #2c3e50 0%, #3498db 50%, #5dade2 100%)',
      Thunderstorm: 'linear-gradient(180deg, #0c0c0c 0%, #1a1a2e 50%, #2d1f3d 100%)',
      Snow: 'linear-gradient(180deg, #e8f4f8 0%, #d4e5ed 50%, #c9d6df 100%)',
      Mist: 'linear-gradient(180deg, #606c88 0%, #8fa3b0 50%, #bdc3c7 100%)',
      Smoke: 'linear-gradient(180deg, #485563 0%, #6b7b8c 50%, #8e9eab 100%)',
      Haze: 'linear-gradient(180deg, #c9a959 0%, #d4b968 50%, #e8d5a3 100%)',
      Fog: 'linear-gradient(180deg, #757F9A 0%, #9FA8B7 50%, #D7DDE8 100%)',
      Dust: 'linear-gradient(180deg, #c9a959 0%, #d4a559 50%, #e8b875 100%)',
      Sand: 'linear-gradient(180deg, #c2b280 0%, #d4a559 50%, #e8b875 100%)',
      Ash: 'linear-gradient(180deg, #3d3d3d 0%, #5a5a5a 50%, #787878 100%)',
      Squall: 'linear-gradient(180deg, #0f0f23 0%, #1a1a3e 50%, #2a2a5e 100%)',
      Tornado: 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 50%, #404040 100%)',
    };
    return backgrounds[weatherMain] || backgrounds.Clear;
  };

  // Rain animation component
  const RainEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.rain.map((drop) => (
        <div
          key={drop.id}
          className="rain-drop"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay * 0.5}s`,
            animationDuration: `${0.8 + drop.duration * 0.4}s`,
          }}
        />
      ))}
      {/* Rain mist overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-blue-900/30 to-transparent" />
    </div>
  );

  // Snow animation component
  const SnowEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.snow.map((flake) => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            animationDelay: `${flake.delay * 0.8}s`,
            animationDuration: `${5 + flake.duration * 3}s`,
            fontSize: `${0.8 + flake.size * 0.8}rem`,
          }}
        >
          ❄
        </div>
      ))}
      {/* Frost overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-white/10 to-transparent" />
    </div>
  );

  // Thunderstorm animation component
  const ThunderstormEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Rain in storm */}
      {particles.rain.slice(0, 80).map((drop) => (
        <div
          key={drop.id}
          className="storm-rain"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay * 0.3}s`,
            animationDuration: `${0.4 + drop.duration * 0.2}s`,
          }}
        />
      ))}
      {/* Lightning flashes */}
      <div className="lightning-container">
        <div className="lightning" />
        <div className="lightning lightning-2" />
      </div>
      {/* Dark storm clouds overlay */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-linear-to-b from-purple-900/50 to-transparent" />
    </div>
  );

  // Sunny/Clear animation component
  const SunnyEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sun */}
      <div className="sun">
        <div className="sun-core" />
        <div className="sun-rays" />
      </div>
      {/* Lens flare */}
      <div className="lens-flare" />
      {/* Warm overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-yellow-300/10 via-transparent to-orange-300/10" />
      {/* Floating particles (pollen/dust in sunlight) */}
      {particles.dust.slice(0, 15).map((p) => (
        <div
          key={p.id}
          className="sun-particle"
          style={{
            left: `${p.left}%`,
            top: `${20 + Math.random() * 60}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration + 4}s`,
            opacity: p.opacity * 0.3,
          }}
        />
      ))}
    </div>
  );

  // Cloudy animation component
  const CloudyEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.clouds.map((cloud, i) => (
        <div
          key={cloud.id}
          className={`floating-cloud cloud-${(i % 4) + 1}`}
          style={{
            left: `-300px`,
            top: `${3 + (i * 10)}%`,
            animationDelay: `${i * 1.2}s`,
            opacity: 0.7 + cloud.opacity * 0.25,
            transform: `scale(${0.6 + cloud.size * 0.4})`,
          }}
        />
      ))}
      {/* Overcast overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-gray-400/20 to-transparent" />
    </div>
  );

  // Mist/Fog animation component
  const MistEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="mist-layer mist-1" />
      <div className="mist-layer mist-2" />
      <div className="mist-layer mist-3" />
      {/* Fog particles */}
      <div className="absolute inset-0 bg-linear-to-t from-gray-300/40 via-gray-200/20 to-transparent" />
    </div>
  );

  // Smoke animation component
  const SmokeEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Rising smoke particles */}
      {particles.dust.slice(0, 20).map((p) => (
        <div
          key={p.id}
          className="smoke-particle"
          style={{
            left: `${p.left}%`,
            bottom: '-100px',
            width: `${60 + p.size * 40}px`,
            height: `${60 + p.size * 40}px`,
            animationDelay: `${p.delay * 2}s`,
            animationDuration: `${8 + p.duration * 4}s`,
          }}
        />
      ))}
      {/* Smoke layers */}
      <div className="smoke-layer smoke-layer-1" />
      <div className="smoke-layer smoke-layer-2" />
      <div className="smoke-layer smoke-layer-3" />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-gray-600/30 via-gray-500/20 to-gray-400/10" />
    </div>
  );

  // Haze animation component
  const HazeEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main haze layer */}
      <div className="haze-layer" />
      {/* Shifting haze overlay */}
      <div className="haze-overlay" />
      {/* Floating haze particles */}
      {particles.dust.slice(0, 15).map((p) => (
        <div
          key={p.id}
          className="haze-particle"
          style={{
            left: `${p.left}%`,
            top: `${20 + p.delay * 15}%`,
            animationDelay: `${p.delay * 1.5}s`,
            animationDuration: `${6 + p.duration * 3}s`,
            transform: `scale(${0.5 + p.size * 0.8})`,
          }}
        />
      ))}
      {/* Warm haze overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-yellow-700/10 via-orange-600/5 to-yellow-800/15" />
    </div>
  );

  // Dust/Sand animation component
  const DustEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.dust.map((p) => (
        <div
          key={p.id}
          className="dust-particle"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration + 2}s`,
            opacity: p.opacity * 0.6,
            width: `${p.size * 3}px`,
            height: `${p.size * 3}px`,
          }}
        />
      ))}
      {/* Sandy overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-yellow-600/20 via-transparent to-yellow-600/20" />
    </div>
  );

  // Drizzle animation component
  const DrizzleEffect = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.rain.slice(0, 50).map((drop) => (
        <div
          key={drop.id}
          className="drizzle-drop"
          style={{
            left: `${drop.left}%`,
            animationDelay: `${drop.delay * 0.6}s`,
            animationDuration: `${1.5 + drop.duration * 0.8}s`,
          }}
        />
      ))}
      {/* Soft rain overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-blue-400/10 to-blue-600/10" />
    </div>
  );

  // Get the right effect based on weather
  const getWeatherEffect = () => {
    switch (weatherMain) {
      case 'Rain':
        return <RainEffect />;
      case 'Drizzle':
        return <DrizzleEffect />;
      case 'Thunderstorm':
        return <ThunderstormEffect />;
      case 'Snow':
        return <SnowEffect />;
      case 'Clear':
        return <SunnyEffect />;
      case 'Clouds':
        return <CloudyEffect />;
      case 'Mist':
      case 'Fog':
        return <MistEffect />;
      case 'Smoke':
        return <SmokeEffect />;
      case 'Haze':
        return <HazeEffect />;
      case 'Dust':
      case 'Sand':
      case 'Ash':
        return <DustEffect />;
      case 'Squall':
      case 'Tornado':
        return <ThunderstormEffect />;
      default:
        return <SunnyEffect />;
    }
  };

  // Get overlay style based on weather for better readability
  const getOverlayStyle = () => {
    const darkWeathers = ['Rain', 'Thunderstorm', 'Squall', 'Tornado', 'Ash', 'Smoke'];
    const isDark = darkWeathers.includes(weatherMain);
    
    return isDark 
      ? 'bg-white/30 backdrop-blur-[1px]' 
      : 'bg-white/20 backdrop-blur-[1px]';
  };

  return (
    <div 
      className={`fixed inset-0 -z-10 transition-all duration-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}
      style={{ background: getBackgroundStyle() }}
    >
      {/* Overlay for readability - BELOW weather effects */}
      <div className={`absolute inset-0 ${getOverlayStyle()}`} style={{ zIndex: 1 }} />
      
      {/* Animated weather effect - ABOVE overlay */}
      <div className="absolute inset-0" style={{ zIndex: 5 }}>
        {getWeatherEffect()}
      </div>
      
      {/* Vignette effect for depth - on top */}
      <div 
        className="absolute inset-0"
        style={{ 
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.1) 100%)',
          zIndex: 6
        }} 
      />
    </div>
  );
};

export default WeatherBackground;
