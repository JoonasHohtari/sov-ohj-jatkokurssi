import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, Text, TouchableOpacity} from 'react-native';
import WeatherDisplay from './WeatherDisplay';
import RefreshButton from './RefreshButton';
import {WeatherData} from './types';
import {getWeatherData} from './api';
import {globalStyles} from './styles';
import {useNavigation} from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {extraButtonStyles} from './styles';
import GoogleSearch from './GoogleSearch';
import MapsSearch from './MapsSearch';
//import {MapsSearch} from './MapsSearch';
//import {GoogleSearch} from './GoogleSearch';

const WeatherScreen: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigation = useNavigation();

  const goToForecast = () => {
    navigation.navigate('5 Day forecast' as never);
  };

  const fetchData = async () => {
    try {
      const data = await getWeatherData();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View style={globalStyles.descriptionContainer}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <WeatherDisplay data={weatherData} />
          <RefreshButton
            onRefresh={() => {
              setIsRefreshing(true);
              fetchData();
            }}
            isRefreshing={isRefreshing}
          />
          <View style={extraButtonStyles.container}>
            <TouchableOpacity
              onPress={goToForecast}
              style={extraButtonStyles.extraButton}>
              <View style={extraButtonStyles.extraButton}>
                <FontAwesomeIcon name="cloud" size={24} color="#fff" />
                <Text style={extraButtonStyles.extraButtonText}>Forecast</Text>
              </View>
            </TouchableOpacity>
            <MapsSearch />
            <GoogleSearch />
          </View>
        </>
      )}
    </View>
  );
};

export default WeatherScreen;
