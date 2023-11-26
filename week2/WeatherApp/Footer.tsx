// Footer.tsx

import React from 'react';
import {Text, View} from 'react-native';
import {globalStyles} from './styles';

const Footer: React.FC = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.footerText}>&copy; 2023 Your Weather App</Text>
    </View>
  );
};

export default Footer;
