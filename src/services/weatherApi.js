const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherByCity = async (city) => {
    if (!API_KEY) {
        throw new Error("Missing OpenWeatherMap API Key in .env file.");
    }

    try {
        const response = await fetch(
            `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
        );

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found. Please check the spelling and try again.');
            }
            throw new Error('Failed to fetch weather data.');
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};
