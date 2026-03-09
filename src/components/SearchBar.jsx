import React, { useState, useRef } from 'react';

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() && !loading) {
      onSearch(city.trim());
      setCity('');
      inputRef.current?.blur();
    }
  };

  return (
    <form
      className={`search-bar ${focused ? 'search-bar--focused' : ''}`}
      onSubmit={handleSubmit}
    >
      {/* Animated glow ring */}
      <div className="search-glow" aria-hidden="true" />

      <svg
        className="search-icon"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        ref={inputRef}
        type="text"
        id="city-search-input"
        placeholder="Search any city..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="search-input"
        autoComplete="off"
        autoFocus
      />

      <button
        type="submit"
        className="search-button"
        disabled={loading || !city.trim()}
        id="search-submit-btn"
      >
        {loading ? (
          <span className="btn-spinner" />
        ) : (
          <>Search</>
        )}
      </button>
    </form>
  );
};

export default SearchBar;
