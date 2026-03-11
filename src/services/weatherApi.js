const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherByCity = async (query) => {
    if (!API_KEY) {
        throw new Error("Missing OpenWeatherMap API Key in .env file.");
    }

    try {
        let url;
        if (typeof query === 'object' && query.lat && query.lon) {
            url = `${BASE_URL}/weather?lat=${query.lat}&lon=${query.lon}&units=metric&appid=${API_KEY}`;
        } else {
            url = `${BASE_URL}/weather?q=${query}&units=metric&appid=${API_KEY}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please try again.');
            }
            throw new Error('Failed to fetch weather data.');
        }

        const data = await response.json();
        
        // If we fetched by coordinates, we might want to preserve the exact suggestion name
        if (typeof query === 'object' && query.name) {
            data.name = query.name;
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};

export const fetchCitySuggestions = async (query) => {
    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=en&format=json`
        );
        if (!response.ok) throw new Error('Failed to fetch city suggestions.');
        
        const data = await response.json();
        
        if (!data.results) return [];
        
        return data.results.map(item => ({
            name: item.name,
            country: item.country_code,
            admin1: item.admin1,
            lat: item.latitude,
            lon: item.longitude
        }));
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        return [];
    }
};
