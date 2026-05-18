import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

import DashboardScreen from '../screens/DashboardScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SavingsScreen from '../screens/SavingsScreen';
import SplitScreen from '../screens/SplitScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {

    return (

        <Tab.Navigator

            screenOptions={({ route }) => ({

                headerShown: false,

                tabBarStyle: {
                    backgroundColor: '#0f172a',
                    borderTopWidth: 0,
                    height: 70,
                },

                tabBarActiveTintColor: '#2563eb',
                tabBarInactiveTintColor: '#94a3b8',

                tabBarIcon: ({ color, size }) => {

                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home';
                    }

                    else if (route.name === 'History') {
                        iconName = 'time';
                    }

                    else if (route.name === 'Savings') {
                        iconName = 'stats-chart';
                    }

                    else if (route.name === 'Split') {
                        iconName = 'people';
                    }

                    else if (route.name === 'Profile') {
                        iconName = 'person';
                    }

                    return (
                        <Ionicons
                            name={iconName}
                            size={24}
                            color={color}
                        />
                    );
                },

            })}
        >

            <Tab.Screen
                name="Home"
                component={DashboardScreen}
            />

            <Tab.Screen
                name="History"
                component={HistoryScreen}
            />

            <Tab.Screen
                name="Savings"
                component={SavingsScreen}
            />

            <Tab.Screen
                name="Split"
                component={SplitScreen}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
            />

        </Tab.Navigator>

    );
}