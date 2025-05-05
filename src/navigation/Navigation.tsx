import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import SplashScreen from "../screens/SplashScreen";
import HomePage from "../screens/HomePage";
import MovieScreen from "../screens/MovieScreen";
import SeeAll from "../screens/SeeAll";
import DrawerNavigation from "./DrawerNavigation";
import PremiumScreen from "../screens/PremiumScreen";
import EditScreen from "../components/EditScreen";
import GenreMovies from "../screens/GenreMovies";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginPage" component={Login} />
        <Stack.Screen name="SignupPage" component={Signup} />
        <Stack.Screen name="HomePage" component={DrawerNavigation} />
        <Stack.Screen name="Movie" component={MovieScreen} />
        <Stack.Screen name="SeeAll" component={SeeAll} />
        <Stack.Screen name="Edit" component={EditScreen} />
        <Stack.Screen name="GenreMovies" component={GenreMovies} />
        <Stack.Screen name="Premium" component={PremiumScreen}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
