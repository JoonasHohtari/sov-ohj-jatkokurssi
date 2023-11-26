interface WeatherApiResponse {
  temperature: number;
  description: string;
  icon: string;
  location: string;
  country: string;
  windSpeed: number;
  humidity: number;
}

export const getWeatherData = async (): Promise<WeatherApiResponse> => {
  const apiKey = '6ee40ff1d73c30c709bbb61e94d7345c';
  try {
    // Replace this URL with your actual weather API endpoint
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Tampere&appid=${apiKey}&units=metric`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const responseData = await response.json();

    // Extract relevant information from the API response
    const temperature = responseData.main.temp;
    const windSpeed = responseData.wind.speed;
    const humidity = responseData.main.humidity;
    const description = responseData.weather[0].description;
    const icon = responseData.weather[0].icon;
    const location = responseData.name;
    const country = responseData.sys.country;

    // Create a simplified WeatherApiResponse object
    const data: WeatherApiResponse = {
      temperature,
      description,
      icon,
      location,
      country,
      windSpeed,
      humidity,
    };

    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};
