import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { getWeatherIcon } from '../services/weatherService';

const timeAgo = (dateStr) => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (mins < 1) return 'Just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
};

const groupByDate = (items) => {
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  const groups = { Today: [], Yesterday: [], Older: [] };

  items.forEach((item) => {
    const d = new Date(item.searchedAt).toDateString();
    if (d === today) groups.Today.push(item);
    else if (d === yesterday) groups.Yesterday.push(item);
    else groups.Older.push(item);
  });

  return groups;
};

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [clearing, setClearing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    setLoading(true);
    try {
      const res = await api.get('/history');
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to load history:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Clear all search history?')) return;
    setClearing(true);
    try {
      await api.delete('/history');
      setHistory([]);
    } catch (err) {
      console.error('Failed to clear history:', err);
    } finally {
      setClearing(false);
    }
  };

  const handleCityClick = (city) => {
    navigate('/', { state: { city } });
  };

  const grouped = groupByDate(history);

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">
            <span className="page-title-icon">🕐</span> Search History
          </h1>
        </div>
        <div className="history-skeleton-list">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="history-skeleton-item">
              <div className="skeleton-circle" />
              <div className="history-skeleton-text">
                <div className="skeleton-line skeleton-line-lg" />
                <div className="skeleton-line skeleton-line-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <span className="page-title-icon">🕐</span> Search History
          </h1>
          <p className="page-subtitle">
            {history.length} searches recorded
          </p>
        </div>
        {history.length > 0 && (
          <button
            id="clear-history-btn"
            onClick={handleClearAll}
            disabled={clearing}
            className="btn-danger"
            aria-label="Clear all history"
          >
            {clearing ? 'Clearing...' : 'Clear All'}
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3 className="empty-state-title">No search history</h3>
          <p className="empty-state-text">
            Your recent weather searches will appear here.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
            id="go-search-from-history-btn"
          >
            Search a city
          </button>
        </div>
      ) : (
        <div className="history-list">
          {Object.entries(grouped).map(([group, items]) =>
            items.length > 0 ? (
              <div key={group} className="history-group">
                <h3 className="history-group-label">{group}</h3>
                <div className="history-group-items">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="history-item"
                      onClick={() => handleCityClick(item.city)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleCityClick(item.city)}
                    >
                      {/* Weather Icon */}
                      <div className="history-item-icon">
                        <img
                          src={getWeatherIcon(item.condition)}
                          alt={item.condition}
                          className="w-10 h-10 object-contain"
                        />
                      </div>

                      {/* Info */}
                      <div className="history-item-info">
                        <p className="history-item-city">{item.city}</p>
                        <p className="history-item-condition">{item.condition}</p>
                      </div>

                      {/* Right side */}
                      <div className="history-item-right">
                        <p className="history-item-temp">{Math.round(item.temperature)}°C</p>
                        <p className="history-item-time">{timeAgo(item.searchedAt)}</p>
                      </div>

                      {/* Arrow */}
                      <svg className="history-item-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )}
        </div>
      )}
    </div>
  );
};

export default History;
