import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  ImageStyle,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {getWeatherForecast} from './api';
import {globalStyles} from './styles';
import {WeatherForecastProps, ForecastData} from './types';

const WeatherForecast: React.FC<WeatherForecastProps> = () => {
  const [weatherForecastData, setWeatherForecastData] =
    useState<ForecastData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const {forecastData} = await getWeatherForecast();
        setWeatherForecastData(forecastData);
      } catch (error) {
        console.error('Error fetching weather forecast data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchForecastData();
  }, []);

  if (!weatherForecastData) {
    return <Text>Error fetching weather forecast data</Text>;
  }

  const {location, country} = weatherForecastData.city;

  const renderItem = ({item}: {item: ForecastData['list'][0]}) => {
    const {
      main: {temp: temperature},
      wind: {speed: windSpeed},
      weather: [{description, icon}],
      dt_txt,
    } = item;

    const temperatureIcon = () => {
      if (temperature < 5) {
        return '🥶';
      } else if (temperature > 25) {
        return '🥵';
      } else {
        return '🌡';
      }
    };

    const formattedTemperature =
      temperature !== undefined ? temperature.toFixed(0) : 'N/A';

    const formatDateTime = (dateTimeString: string) => {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      };

      const date = new Date(dateTimeString);
      const formattedDate = date.toLocaleDateString('en-GB', options);

      const [day, month, time] = formattedDate.split(' ');

      console.log(formattedDate);

      return `${day} ${month} ${time}`;
    };

    console.log(
      temperature,
      windSpeed,
      description,
      icon,
      dt_txt,
      country,
      location,
    );

    const formattedDateTime = formatDateTime(dt_txt);

    return (
      <View style={globalStyles.cardContainer}>
        <View style={globalStyles.card}>
          <Text style={globalStyles.location}>
            {location}, {country}
          </Text>
          <View style={globalStyles.weatherInfo}>
            <Text style={globalStyles.data}>{formattedDateTime}</Text>
          </View>
          <View style={globalStyles.weatherInfo}>
            <Text style={globalStyles.temperatureIcon}>
              {temperatureIcon()}
            </Text>
            <Text style={globalStyles.temperature}>
              {' '}
              {formattedTemperature}°C
            </Text>
          </View>

          <View>
            <Text style={globalStyles.sectionTitle}>Weather Details</Text>

            <View style={globalStyles.detailRow}>
              <Text style={globalStyles.data}>{description}</Text>
              {icon && (
                <View>
                  <Image
                    source={{
                      uri: `http://openweathermap.org/img/w/${icon}.png`,
                    }}
                    style={globalStyles.icon as ImageStyle}
                  />
                </View>
              )}
            </View>
            <View style={globalStyles.detailRow}>
              <Text style={globalStyles.label}>Wind Speed: </Text>
              <Text style={globalStyles.data}> {`${windSpeed} m/s`}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!weatherForecastData) {
    return <Text>Error fetching weather forecast data</Text>;
  }

  return (
    <View>
      <FlatList
        data={weatherForecastData?.list || []} // Use the list property
        renderItem={renderItem}
        keyExtractor={item => item.dt_txt}
      />
    </View>
  );
};

export default WeatherForecast;
