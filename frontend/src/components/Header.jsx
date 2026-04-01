import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const Header = ({ theme }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const getLogoGradient = () => {
    const gradients = {
      solar: 'from-amber-400 to-orange-500',
      storm: 'from-purple-500 to-slate-700',
      rain: 'from-cyan-400 to-blue-600',
      snow: 'from-sky-300 to-slate-400',
      neutral: 'from-blue-500 to-indigo-600',
    };
    return gradients[theme] || gradients.neutral;
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    {
      path: '/', label: 'Home',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    },
    {
      path: '/forecast', label: 'Forecast',
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
    },
  ];

  const authNavLinks = [
    {
      path: '/favorites', label: 'Favorites',
      icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z',
    },
    {
      path: '/history', label: 'History',
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
    },
  ];

  const allNavLinks = [...navLinks, ...(isAuthenticated ? authNavLinks : [])];

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const getInitials = (name) =>
    name ? name.split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase() : '?';

  return (
    <header className="w-full py-4 md:py-6 relative z-50">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" aria-label="Aura home">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${getLogoGradient()} 
                            flex items-center justify-center shadow-lg
                            group-hover:scale-110 transition-transform duration-300`}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <span className={`text-2xl font-bold bg-gradient-to-r ${getLogoGradient()} bg-clip-text text-transparent`}>
              Aura
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {allNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300
                           ${isActive(link.path)
                             ? `bg-gradient-to-r ${getLogoGradient()} text-white shadow-md`
                             : 'text-gray-600 hover:bg-white/50 hover:text-gray-800'}`}
              >
                <svg className="w-4 h-4" fill={link.path === '/favorites' && isActive(link.path) ? 'currentColor' : 'none'}
                  stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                </svg>
                <span className="font-medium">{link.label}</span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            {/* Time */}
            <div className="text-right hidden sm:block">
              <p className="text-sm text-gray-500">
                {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </p>
              <p className="text-lg font-semibold text-gray-700">
                {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
              </p>
            </div>

            {/* Auth Section */}
            {isAuthenticated ? (
              /* User Dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  id="user-menu-btn"
                  onClick={() => setDropdownOpen((v) => !v)}
                  className={`flex items-center gap-2 pl-3 pr-2 py-2 rounded-xl
                              bg-gradient-to-r ${getLogoGradient()} text-white shadow-md
                              hover:shadow-lg hover:scale-105 transition-all duration-300`}
                  aria-expanded={dropdownOpen}
                  aria-haspopup="true"
                  aria-label="User menu"
                >
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-xs font-bold">
                    {getInitials(user?.name)}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">{user?.name?.split(' ')[0]}</span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white/95 backdrop-blur-lg
                                  rounded-2xl shadow-2xl border border-gray-100 py-2 animate-fadeIn z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-gray-800 text-sm">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <Link to="/favorites" id="dropdown-favorites"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      My Favorites
                    </Link>
                    <Link to="/history" id="dropdown-history"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                      <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Search History
                    </Link>
                    <button
                      id="logout-btn"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Login / Register Buttons */
              <div className="hidden md:flex items-center gap-2">
                <Link
                  to="/login"
                  id="header-login-btn"
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800
                             hover:bg-white/50 rounded-xl transition-all duration-300"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  id="header-register-btn"
                  className={`px-4 py-2 text-sm font-medium text-white rounded-xl shadow-md
                              bg-gradient-to-r ${getLogoGradient()}
                              hover:shadow-lg hover:scale-105 transition-all duration-300`}
                >
                  Get started
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-white/50 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg
                          shadow-lg border-t border-gray-100 animate-fadeIn z-50">
            <div className="p-4 space-y-2">
              {allNavLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                             ${isActive(link.path)
                               ? `bg-gradient-to-r ${getLogoGradient()} text-white`
                               : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={link.icon} />
                  </svg>
                  <span className="font-medium">{link.label}</span>
                </Link>
              ))}

              {/* Auth Buttons in Mobile */}
              <div className="pt-3 border-t border-gray-100">
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span className="font-medium">Sign out ({user?.name?.split(' ')[0]})</span>
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <Link to="/login" className="flex-1 px-4 py-3 text-center text-gray-600 hover:bg-gray-100 rounded-xl font-medium transition-colors">
                      Sign in
                    </Link>
                    <Link to="/register"
                      className={`flex-1 px-4 py-3 text-center text-white rounded-xl font-medium
                                  bg-gradient-to-r ${getLogoGradient()}`}>
                      Register
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile time */}
              <div className="pt-3 border-t border-gray-100 text-center text-sm text-gray-500">
                {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
