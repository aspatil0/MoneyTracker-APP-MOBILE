// navigation/AppNavigator.js

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";

// SPLASH

import SplashScreen from "../screens/SplashScreen";

// MAIN SCREENS

import DashboardScreen from "../screens/DashboardScreen";

import HistoryScreen from "../screens/HistoryScreen";

import SavingsScreen from "../screens/SavingsScreen";

import SplitScreen from "../screens/SplitScreen";

import ProfileScreen from "../screens/ProfileScreen";

import InvestmentScreen from "../screens/InvestmentScreen";

// INVESTMENT SCREENS

import SipScreen from "../screens/SipScreen";

import FdScreen from "../screens/FdScreen";

import SwpScreen from "../screens/SwpScreen";

// FORM SCREENS

import AddTransactionScreen from "../screens/AddTransactionScreen";

import IncomeScreen from "../screens/IncomeScreen";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

// BOTTOM TABS

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#0f172a",

          borderTopWidth: 0,

          height: 70,

          paddingBottom: 10,
        },

        tabBarActiveTintColor: "#2563eb",

        tabBarInactiveTintColor: "#cbd5e1",

        tabBarLabelStyle: {
          fontSize: 11,

          marginBottom: 4,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName;

          // HOME

          if (route.name === "Home") {
            iconName = "home";
          }

          // HISTORY
          else if (route.name === "History") {
            iconName = "time";
          }

          // SAVINGS
          else if (route.name === "Savings") {
            iconName = "bar-chart";
          }

          // SPLIT
          else if (route.name === "Split") {
            iconName = "people";
          }

          // INVESTMENT
          else if (route.name === "Investment") {
            iconName = "trending-up";
          }

          // PROFILE
          else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* HOME */}

      <Tab.Screen name="Home" component={DashboardScreen} />

      {/* HISTORY */}

      <Tab.Screen name="History" component={HistoryScreen} />

      {/* SAVINGS */}

      <Tab.Screen name="Savings" component={SavingsScreen} />

      {/* SPLIT */}

      <Tab.Screen name="Split" component={SplitScreen} />

      {/* INVESTMENT */}

      <Tab.Screen name="Investment" component={InvestmentScreen} />

      {/* PROFILE */}

      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// MAIN APP NAVIGATOR

export default function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* SPLASH */}

      <Stack.Screen name="Splash" component={SplashScreen} />

      {/* MAIN */}

      <Stack.Screen name="Main" component={BottomTabs} />

      {/* ADD TRANSACTION */}

      <Stack.Screen name="AddTransaction" component={AddTransactionScreen} />

      {/* ADD INCOME */}

      <Stack.Screen name="AddIncome" component={IncomeScreen} />

      {/* SIP */}

      <Stack.Screen name="Sip" component={SipScreen} />

      {/* FD */}

      <Stack.Screen name="FD" component={FdScreen} />

      {/* SWP */}

      <Stack.Screen name="SWP" component={SwpScreen} />
    </Stack.Navigator>
  );
}
