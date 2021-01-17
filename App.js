import { StatusBar } from 'expo-status-bar';
import React,{useState} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Blog from "./src/pages/blogPage";
import BlogDetail from "./src/pages/detailPage";

import { BlogContextProvider } from "./src/context/context";

const Stack = createStackNavigator();


export default function App() {
  return (
    <BlogContextProvider>
  <StatusBar hidden />
      <NavigationContainer>

        <Stack.Navigator initialRouteName="Blog" >

          <Stack.Screen name="Blog" component={Blog} options={{ headerTitle: "Lena Blog Viewer",
           headerStyle: { backgroundColor: '#34495e', }, headerTintColor: 'white',
           headerTitleStyle: { fontFamily: 'notoserif' }, headerTitleAlign: "center" }} />
          <Stack.Screen name="Detail" component={BlogDetail} options={{ headerShown: false }} />
        </Stack.Navigator>

      </NavigationContainer>

    </BlogContextProvider>
  );
}

