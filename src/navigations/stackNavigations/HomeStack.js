import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopStackNavigation from './../TopStackNavigation';

const Stack = createNativeStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name="TopStackNavigation" component={TopStackNavigation} options={{ title: 'Home Screen' }} />
        </Stack.Navigator>
    );
}

export default HomeStack;
