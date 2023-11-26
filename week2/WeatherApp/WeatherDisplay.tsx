import React from 'react';
import {Text, View, Image, ImageStyle} from 'react-native';
import {globalStyles} from './styles';

interface WeatherDisplayProps {
  data: {
    temperature: number;
    description: string;
    icon: string;
    location: string;
    country: string;
    windSpeed: number;
    humidity: number;
  } | null;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({data}) => {
  if (!data) {
    return <Text>Loading...</Text>;
  }

  const temperatureIcon = () => {
    if (data.temperature < 5) {
      return '🥶';
    } else if (data.temperature > 25) {
      return '🥵';
    } else {
      return '🌡';
    }
  };
  // Extract and display relevant weather information
  const {
    temperature,
    description,
    icon,
    location,
    country,
    windSpeed,
    humidity,
  } = data;

  return (
    <View>
      <Text style={globalStyles.heading}>Current Weather</Text>
      <Text style={globalStyles.location}>
        {location}, {country}
      </Text>
      <View style={globalStyles.weatherInfo}>
        <Text style={globalStyles.temperatureIcon}>{temperatureIcon()}</Text>
        <Text style={globalStyles.temperature}>
          {' '}
          {temperature.toFixed(0)}°C
        </Text>
      </View>
      <View>
        <Text style={globalStyles.sectionTitle}>Weather Details</Text>

        <View style={globalStyles.detailRow}>
          <Text style={globalStyles.data}>{description}</Text>
          {icon && (
            <View>
              <Image
                source={{uri: `http://openweathermap.org/img/w/${icon}.png`}}
                style={globalStyles.icon as ImageStyle}
              />
            </View>
          )}
        </View>

        <View style={globalStyles.detailRow}>
          <Text style={globalStyles.label}>Humidity: </Text>
          <Text style={globalStyles.data}> {`${humidity}%`}</Text>
          {/* Optionally, you can include an icon for humidity */}
          {/* <Image source={humidityIcon} style={globalStyles.smallIcon} /> */}
        </View>

        <View style={globalStyles.detailRow}>
          <Text style={globalStyles.label}>Wind Speed: </Text>
          <Text style={globalStyles.data}> {`${windSpeed} m/s`}</Text>
          {/* Optionally, you can include an icon for wind speed */}
          {/* <Image source={windSpeedIcon} style={globalStyles.smallIcon} /> */}
        </View>
      </View>
    </View>
  );
};

export default WeatherDisplay;
