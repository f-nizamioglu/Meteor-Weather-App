import React from 'react';
import WeatherIcon from './WeatherIcon';

const WeatherDisplay = ({ weatherData, error }) => {
    if (error) {
        return (
            <div className="weather-error stagger-1">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 8 }}>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <p>{error}</p>
            </div>
        );
    }

    if (!weatherData) {
        return (
            <div className="empty-state">
                <svg className="empty-icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
                </svg>
                <p>Search a city to see the forecast</p>
            </div>
        );
    }

    const { name, main, weather, sys, wind } = weatherData;
    const temp = Math.round(main.temp);
    const feelsLike = Math.round(main.feels_like);
    const condition = weather[0]?.description;
    const icon = weather[0]?.icon;

    return (
        <div className="weather-display" key={name}>
            {/* City + condition — stagger 1 */}
            <div className="weather-header stagger-1">
                <h2 className="city-name">{name}, {sys.country}</h2>
                <p className="weather-condition">{condition}</p>
            </div>

            {/* Main temp card — stagger 2 */}
            <div className="weather-main card-lift stagger-2">
                <div className="weather-icon-container">
                    <WeatherIcon code={icon} size={96} />
                </div>
                <div className="temperature-container">
                    <span className="temperature">{temp}</span>
                    <span className="temp-degree">°</span>
                    <span className="temp-unit">C</span>
                </div>
            </div>

            {/* Detail cards — stagger 3 & 4 */}
            <div className="weather-details">
                <div className="detail-item card-lift stagger-3">
                    <svg className="detail-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                    </svg>
                    <span className="detail-label">Humidity</span>
                    <span className="detail-value">{main.humidity}<small>%</small></span>
                </div>
                <div className="detail-item card-lift stagger-4">
                    <svg className="detail-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
                    </svg>
                    <span className="detail-label">Feels Like</span>
                    <span className="detail-value">{feelsLike}<small>°C</small></span>
                </div>
                <div className="detail-item card-lift stagger-5">
                    <svg className="detail-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2" />
                    </svg>
                    <span className="detail-label">Wind</span>
                    <span className="detail-value">{wind?.speed}<small> m/s</small></span>
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;
