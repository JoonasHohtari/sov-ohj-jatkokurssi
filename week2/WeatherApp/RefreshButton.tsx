// RefreshButton.tsx
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
    <TouchableOpacity onPress={onRefresh} disabled={isRefreshing}>
      <View style={globalStyles.refreshButton}>
        <Text style={globalStyles.buttonText}>
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default RefreshButton;