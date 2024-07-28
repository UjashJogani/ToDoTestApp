import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HomeScreen } from '../components/screens/home';
import { PostScreen } from '../components/screens/post';
import { CustomHeader } from '../components/common';

const Tab = createMaterialTopTabNavigator();

const TopStackNavigation = () => {
    return (
        <>
         <CustomHeader title={'Home Screen'} />
            <Tab.Navigator>
                <Tab.Screen name="ToDoScreen" component={HomeScreen} options={{title: 'To-Do List'}} />
                <Tab.Screen name="PostScreen" component={PostScreen} options={{title: 'Posts List'}}/>
            </Tab.Navigator>
        </>
    );
}

export default TopStackNavigation;