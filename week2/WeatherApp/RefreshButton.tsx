import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {globalStyles} from './styles';

interface RefreshButtonProps {
  onRefresh: () => void;
  isRefreshing: boolean;
}

const RefreshButton: React.FC<RefreshButtonProps> = ({
  onRefresh,
  isRefreshing,
}) => {
  return (
    <View style={globalStyles.refreshButtonContainer}>
      <TouchableOpacity onPress={onRefresh} disabled={isRefreshing}>
        <View style={globalStyles.refreshButton}>
          <Text style={globalStyles.buttonText}>
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RefreshButton;
