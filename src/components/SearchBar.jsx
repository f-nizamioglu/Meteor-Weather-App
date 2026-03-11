import React, { useState, useEffect, useRef } from 'react';
import { fetchCitySuggestions } from '../services/weatherApi';

const SearchBar = ({ onSearch, onTyping, loading }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const dropdownRef = useRef(null);
  const isSelecting = useRef(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounce logic for fetching suggestions
  useEffect(() => {
    if (isSelecting.current) return;

    if (!city.trim() || city.length < 2) {
      setSuggestions([]);
      setIsDropdownOpen(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      if (isFocused || isDropdownOpen) {
        const results = await fetchCitySuggestions(city);
        setSuggestions(results);
        setIsDropdownOpen(results.length > 0);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [city, isFocused, isDropdownOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() && !loading) {
      onSearch(city.trim());
      setIsDropdownOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    isSelecting.current = true;
    const cityName = suggestion.name;
    setCity(cityName);
    setSuggestions([]);
    setIsDropdownOpen(false);
    setIsFocused(false);
    
    if (document.activeElement && typeof document.activeElement.blur === 'function') {
      document.activeElement.blur();
    }

    onSearch({
        name: suggestion.name,
        lat: suggestion.lat,
        lon: suggestion.lon
    });
  };

  const handleInputChange = (e) => {
    isSelecting.current = false;
    setCity(e.target.value);
    setIsDropdownOpen(true);
    if (onTyping) onTyping();
  };

  return (
    <div className="search-container stagger-1" ref={dropdownRef}>
      <form 
        className={`search-bar ${isFocused ? 'search-bar--focused' : ''}`} 
        onSubmit={handleSubmit}
      >
        <div className="search-glow" aria-hidden="true" />
        
        <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>

        <input
          type="text"
          placeholder="Search for a city..."
          value={city}
          onChange={handleInputChange}
          onFocus={() => {
            setIsFocused(true);
            if (suggestions.length > 0) setIsDropdownOpen(true);
          }}
          className="search-input"
          autoFocus
          disabled={loading}
        />
        
        <button type="submit" className="search-button" disabled={loading || !city.trim()}>
          {loading ? <div className="btn-spinner" /> : 'Search'}
        </button>
      </form>
      
      {isDropdownOpen && suggestions.length > 0 && (
        <ul className="search-dropdown fade-in">
          {suggestions.map((suggestion, index) => (
            <li 
              key={`${suggestion.lat}-${suggestion.lon}-${index}`} 
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="suggestion-name">{suggestion.name}</div>
              <div className="suggestion-country">
                {suggestion.admin1 ? `${suggestion.admin1}, ` : ''}{suggestion.country}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
