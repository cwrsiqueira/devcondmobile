import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StateProvider } from './src/contexts/StateContext';
import AuthStack from './src/stacks/AuthStack';

export default () => {
  return (
    <StateProvider>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </StateProvider>
  );
}