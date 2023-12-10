export interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  location: string;
  country: string;
  windSpeed: number;
  humidity: number;
}

export interface WeatherDisplayProps {
  data: WeatherData | null;
}

export interface ForecastData {
  list: {
    main: {
      temp: number; // Corrected key to match the API response
    };
    wind: {
      speed: number; // Corrected key to match the API response
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

export interface WeatherForecastProps {
  data?: ForecastData | null;
}
