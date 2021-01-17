import {Text, View,ActivityIndicator} from 'react-native';
import React from 'react'

export default function loading (){
    return(
    <View style={{justifyContent:"center",alignItems:'center',flex:1,flexDirection:"column"}}>
    <ActivityIndicator size="large" color="#0000ff" />
    <Text> loading..</Text>
    </View>  
    )

}






