import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DashboardScreen from '../screens/DashboardScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SavingsScreen from '../screens/SavingsScreen';
import SplitScreen from '../screens/SplitScreen';
import ProfileScreen from '../screens/ProfileScreen';

import AddTransactionScreen from '../screens/AddTransactionScreen';
import IncomeScreen from '../screens/IncomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function BottomTabs() {

    return (

        <Tab.Navigator

            screenOptions={{

                headerShown: false,

                tabBarStyle: {
                    backgroundColor: '#0f172a',
                    borderTopWidth: 0,
                    height: 70,
                    paddingBottom: 10,
                },

                tabBarActiveTintColor: '#2563eb',
                tabBarInactiveTintColor: '#cbd5e1',

            }}
        >

            <Tab.Screen
                name="Home"
                component={DashboardScreen}

                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="home"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="History"
                component={HistoryScreen}

                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="time"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Savings"
                component={SavingsScreen}

                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="bar-chart"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Split"
                component={SplitScreen}

                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="people"
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Tab.Screen
                name="Profile"
                component={ProfileScreen}

                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="person"
                            size={size}
                            color={color}
                        />
                    )
                }}
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
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="AddTransaction"
                component={AddTransactionScreen}
                options={{
                    headerShown: false
                }}
            />

            <Stack.Screen
                name="AddIncome"
                component={IncomeScreen}
                options={{
                    headerShown: false
                }}
            />

        </Stack.Navigator>
    );
}