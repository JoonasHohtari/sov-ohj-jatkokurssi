// Footer.tsx

import React from 'react';
import {Text, View} from 'react-native';
import {globalStyles} from './styles';

const Footer: React.FC = () => {
  return (
    <View>
      <Text style={globalStyles.footerText}>&copy; 2023 Your Weather App</Text>
    </View>
  );
};

export default Footer;
