import React, { useState, useMemo } from 'react';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import SkeletonLoader from './components/SkeletonLoader';
import { fetchWeatherByCity } from './services/weatherApi';
import './index.css';

/**
 * Maps an OpenWeatherMap condition id to a theme key.
 * https://openweathermap.org/weather-conditions
 */
function getWeatherTheme(weatherId) {
  if (!weatherId) return 'default';
  if (weatherId >= 200 && weatherId < 300) return 'thunderstorm';
  if (weatherId >= 300 && weatherId < 400) return 'drizzle';
  if (weatherId >= 500 && weatherId < 600) return 'rain';
  if (weatherId >= 600 && weatherId < 700) return 'snow';
  if (weatherId >= 700 && weatherId < 800) return 'atmosphere'; // mist, fog, etc.
  if (weatherId === 800) return 'clear';
  if (weatherId > 800) return 'clouds';
  return 'default';
}

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const weatherTheme = useMemo(() => {
    if (!weatherData) return 'default';
    const id = weatherData.weather?.[0]?.id;
    return getWeatherTheme(id);
  }, [weatherData]);

  const handleSearch = async (city) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);
    try {
      const data = await fetchWeatherByCity(city);
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app-container theme-${weatherTheme}`}>
      {/* Animated ambient orbs that change colour per weather theme */}
      <div className="ambient-orb orb-1" aria-hidden="true" />
      <div className="ambient-orb orb-2" aria-hidden="true" />
      <div className="ambient-orb orb-3" aria-hidden="true" />

      <div className="glass-panel">
        <header className="app-header">
          <h1>Meteor</h1>
          <p>Real-time Weather Application</p>
        </header>

        <main className="app-main">
          <SearchBar 
            onSearch={handleSearch} 
            loading={loading} 
            onTyping={() => setError(null)} 
          />

          {loading && <SkeletonLoader />}

          {!loading && (
            <WeatherDisplay weatherData={weatherData} error={error} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
