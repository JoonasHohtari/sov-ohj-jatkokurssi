import React from 'react';
import {Linking, TouchableOpacity, Text, View} from 'react-native';
import {extraButtonStyles} from './styles';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

const GoogleSearch = () => {
  const locationName = 'Tampere';
  const openGoogleSearch = () => {
    const searchQuery = `https://www.google.com/search?q=${encodeURIComponent(
      locationName,
    )}`;
    console.log('Opening Google Search with URL:', searchQuery);
    Linking.openURL(searchQuery);
  };

  return (
    <TouchableOpacity
      onPress={() => openGoogleSearch()}
      style={extraButtonStyles.extraButton}>
      <View style={extraButtonStyles.extraButton}>
        <FontAwesomeIcon name="search" size={24} color="#fff" />
        <Text style={extraButtonStyles.extraButtonText}>Search</Text>
      </View>
    </TouchableOpacity>
  );
};

export default GoogleSearch;
