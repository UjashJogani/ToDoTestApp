/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { SafeAreaView } from 'react-native';
import { store } from './src/redux/store/store';
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { HomeStack } from './src/navigations/stackNavigations';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Provider store={store}>
        <NavigationContainer>
        <HomeStack />
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  );
}

export default App;
