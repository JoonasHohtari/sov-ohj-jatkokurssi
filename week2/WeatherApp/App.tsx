import React from 'react';
import {View} from 'react-native';
import Header from './Header';
import WeatherScreen from './WeatherScreen';
import WeatherForecast from './WeatherForecast';
import {globalStyles} from './styles';
import Footer from './Footer';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <View style={globalStyles.container}>
        <Header />
        <Stack.Navigator>
          <Stack.Screen name="Current Weather" component={WeatherScreen} />
          <Stack.Screen name="5 Day forecast" component={WeatherForecast} />
        </Stack.Navigator>
        <Footer />
      </View>
    </NavigationContainer>
  );
};

export default App;
