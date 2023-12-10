import React from 'react';
import {Linking, TouchableOpacity, Text, View} from 'react-native';
import {extraButtonStyles} from './styles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const MapsSearch = () => {
  const openGoogleMaps = () => {
    const latitude = 61.4991; // replace with your location's latitude
    const longitude = 23.7871; // replace with your location's longitude
    const url = `https://www.google.com/maps/place/${latitude},${longitude}`;

    console.log('Opening Google Maps with URL:', url);
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity
      onPress={() => openGoogleMaps()}
      style={extraButtonStyles.extraButton}>
      <View style={extraButtonStyles.extraButton}>
        <FontAwesomeIcon name="map-marker" size={24} color="#fff" />
        <Text style={extraButtonStyles.extraButtonText}>Maps</Text>
      </View>
    </TouchableOpacity>
  );
};

export default MapsSearch;
