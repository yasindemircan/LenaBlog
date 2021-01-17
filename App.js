import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Blog from "./src/pages/blogPage";
import BlogDetail from "./src/pages/detailPage";

import {BlogContextProvider} from "./src/context/context";
import BlogConsumer from "./src/context/context"
const Stack = createStackNavigator();

function LogoTitle(){
  return(
    <View style={{flexDirection:"row",borderWidth:0, width:370,alignItems:'center'}}>

      <Image 
    style={{ width:50, height:50}}
      source={{
        uri: 'https://www.lenasoftware.com/Uploads/Avatar/lab-logo-bsvg-2jpi4cre-[1]svg-1w3bqfxq-.svg'
      }}
    />
      <Text style={{textAlign:"center",paddingLeft:"15%",color:'black',fontWeight:'bold',fontSize:18}}>Lena Blog Viewer</Text>
    </View>
    
  )
}

export default function App() {
  return (
    <BlogContextProvider>

   
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Blog" > 
    
    <Stack.Screen name="Blog" component={Blog} options={{ headerTitle:  props => <LogoTitle {...props}/> }} />
    <Stack.Screen name="Detail" component={BlogDetail} options={{headerShown: false}} />
    
    </Stack.Navigator>
  </NavigationContainer> 
  </BlogContextProvider>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
