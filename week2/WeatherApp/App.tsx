import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import Header from './Header';
import WeatherDisplay from './WeatherDisplay';
import Footer from './Footer';
import RefreshButton from './RefreshButton';
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
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getWeatherData();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setIsRefreshing(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={globalStyles.container}>
      <Header />
      <View style={globalStyles.descriptionContainer}>
        <WeatherDisplay data={weatherData} />
      </View>
      <RefreshButton
        onRefresh={() => {
          setIsRefreshing(true);
          fetchData();
        }}
        isRefreshing={isRefreshing}
      />
      <Footer />
    </View>
  );
};

export default App;
