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
  const city = 'Tampere';

  try {
    // Replace this URL with your actual weather API endpoint
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,
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

export interface ForecastApiResponse {
  list: {
    main: {
      temp: number;
    };
    wind: {
      speed: number;
    };
    weather: {
      description: string;
      icon: string;
    }[];
    dt_txt: string;
  }[];
  city: {
    country: string;
    location: string;
  };
}

export const getWeatherForecast = async (): Promise<{
  forecastData: ForecastApiResponse;
}> => {
  const apiKey = '6ee40ff1d73c30c709bbb61e94d7345c';
  const city = 'Tampere';

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`,
    );

    if (!response.ok) {
      throw new Error('Failed to fetch weather forecast data');
    }

    const responseData = await response.json();

    const targetTime = '12:00:00';

    // Filter the list to include entries only for the target time
    const filteredList = responseData.list.filter((entry: any) =>
      entry.dt_txt.includes(targetTime),
    );

    const forecastData: ForecastApiResponse = {
      list: filteredList,
      city: {
        country: responseData.city.country,
        location: responseData.city.name,
      },
    };

    return {forecastData};
  } catch (error) {
    console.error('Error fetching weather forecast data:', error);
    throw error;
  }
};
