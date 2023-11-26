import React from 'react';
import {Text, View} from 'react-native';
import {globalStyles} from './styles';

const Header: React.FC = () => {
  return (
    <View style={globalStyles.heading}>
      <Text style={globalStyles.heading}>Practice Weather App</Text>
    </View>
  );
};

export default Header;
