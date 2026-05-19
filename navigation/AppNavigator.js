import React from 'react';

import {
    createNativeStackNavigator,
} from '@react-navigation/native-stack';

import {
    createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import Ionicons from 'react-native-vector-icons/Ionicons';

// MAIN SCREENS

import DashboardScreen from '../screens/DashboardScreen';

import HistoryScreen from '../screens/HistoryScreen';

import SavingsScreen from '../screens/SavingsScreen';

import SplitScreen from '../screens/SplitScreen';

import ProfileScreen from '../screens/ProfileScreen';

// FORM SCREENS

import AddTransactionScreen from '../screens/AddTransactionScreen';

import IncomeScreen from '../screens/IncomeScreen';

const Stack =
    createNativeStackNavigator();

const Tab =
    createBottomTabNavigator();

function BottomTabs() {

    return (

        <Tab.Navigator

            screenOptions={({ route }) => ({

                headerShown: false,

                tabBarStyle: {

                    backgroundColor: '#0f172a',

                    borderTopWidth: 0,

                    height: 70,

                    paddingBottom: 10,

                },

                tabBarActiveTintColor:
                    '#2563eb',

                tabBarInactiveTintColor:
                    '#cbd5e1',

                tabBarIcon: ({
                    color,
                    size,
                }) => {

                    let iconName;

                    if (
                        route.name === 'Home'
                    ) {

                        iconName = 'home';

                    }

                    else if (
                        route.name === 'History'
                    ) {

                        iconName = 'time';

                    }

                    else if (
                        route.name === 'Savings'
                    ) {

                        iconName = 'bar-chart';

                    }

                    else if (
                        route.name === 'Split'
                    ) {

                        iconName = 'people';

                    }

                    else if (
                        route.name === 'Profile'
                    ) {

                        iconName = 'person';

                    }

                    return (

                        <Ionicons
                            name={iconName}
                            size={size}
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

export default function AppNavigator() {

    return (

        <Stack.Navigator>

            <Stack.Screen

                name="Main"

                component={BottomTabs}

                options={{
                    headerShown: false,
                }}

            />

            <Stack.Screen

                name="AddTransaction"

                component={
                    AddTransactionScreen
                }

                options={{
                    headerShown: false,
                }}

            />

            <Stack.Screen

                name="AddIncome"

                component={IncomeScreen}

                options={{
                    headerShown: false,
                }}

            />

        </Stack.Navigator>

    );

}