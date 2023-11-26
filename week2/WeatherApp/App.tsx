import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import Header from './Header';
import WeatherDisplay from './WeatherDisplay';
import Footer from './Footer';
import {getWeatherData} from './api'; // You'll create this file for API calls
import {globalStyles} from './styles';

interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
  location: string;
  country: string;
  windSpeed: number;
  humidity: number;
}

const App: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Fetch weather data and update state
    const fetchData = async () => {
      const data = await getWeatherData(); // Implement this function in 'api.ts'
      setWeatherData(data);
    };

    fetchData();
  }, []);

  return (
    <View style={globalStyles.container}>
      <Header />
      <WeatherDisplay data={weatherData} />
      <Footer />
    </View>
  );
};

export default App;
