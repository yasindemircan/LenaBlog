import React, { useContext, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView,Image,Dimensions } from 'react-native'
import { WebView } from 'react-native-webview';

import {BlogContext} from "../context/context"

  const screenHeight = Dimensions.get('window').height

 
export default function detail({route}) {

    const {id} = route.params
    // useEffect(()=>{
    //      function getDetail(id) {
    //         try{
    //             dispatch({type: 'GET_DETAIL', payload: id })
    //         }catch(err){
    //             console.log("hata :",err)
    //         }
    //     }
    //     getDetail(id)
    // },[])
    const data = useContext(BlogContext);
    const detailBlog  = () =>{
        return data[0].data.find(text => text.postId === id)
    } 
    const Blog = detailBlog();
    const webViewContent = {
         html: `
         <head>
         <style>
        
         body { font-size: 200%; word-wrap: break-word; overflow-wrap: break-word; }
     </style>
          </head>
          <body>${Blog.content}</body>
          </html>`
              }
          

      
    
 
    
                return (
            <SafeAreaView style={styles.container}>
                <ScrollView scrollEnabled={false}>
                <View style={styles.textContainer}>
                    <View style={styles.bannerView}>
                        <Image style={styles.bannerImage} resizeMethod="resize" resizeMode="stretch"
                            source={{ uri: Blog.banner }} />
                    </View>
                      
                    <View style={styles.blogViewContent}>  
                     <ScrollView style={{flex:1,height:screenHeight}} nestedScrollEnabled={true} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.title}>{Blog.title}</Text>
                            <Text style={styles.readingTime}>{Blog.totalReadingTime} min read </Text>
                        </View>
                    
                        <View style={styles.contentText}>
                     
                       <WebView source={webViewContent} style={styles.contentText}  />
                               
                          </View>
      </ScrollView>
                </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
            }
          





const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 1,
        height: screenHeight,
        width:'100%'

    },
    textContainer: {
     //   marginTop: '3%',
     //   marginLeft: 'auto',
       // marginRight: 'auto',

        width: '100%',
        height: screenHeight,

        justifyContent: 'flex-start',
      //  borderRadius: 25,
      
          borderWidth:1,
        borderColor: 'red',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 0


    },
    bannerView: {
        borderWidth:1,
        width: '100%',
        height: screenHeight/3,
        top: 0,
        position: 'relative',
        elevation: 2,
    //    justifyContent: "flex-start",
     //   alignItems: "flex-start",
        flex:1,
    },
    bannerImage: {
        width: '100%',
        height: screenHeight/3 
      //  borderTopLeftRadius: 25,
      //  borderTopRightRadius: 25
    },

    blogViewContent: {
        flex:2,
         elevation:7,
        marginLeft: 'auto',
        marginRight: 'auto',
     //   backgroundColor: '#fff',
     backgroundColor: '#F6F8FA',
        width: '100%',
        height: '50%',
        opacity: 1,
        
        // borderWidth:10,
      //  borderBottomLeftRadius: 25,
       // borderBottomRightRadius: 25,
        padding: 20,
    },
    title:{
        flex: 0.8,
        borderWidth: 0,
        lineHeight:20,
        fontSize: 17,
        color:'black',
        fontWeight:"bold" 
    },
    readingTime:{
        backgroundColor:'#468847',
        color:'white',
        fontWeight:"bold",
        borderWidth: 0,
        flex: 0.2,
        fontSize: 13,
        padding: 7,
        textAlignVertical: "center",
        textAlign: "center",

        borderRadius:5
    
    },
    contentText:{
        flex:1,
        width:'100%',
        minHeight:'auto',
        backgroundColor: '#F6F8FA',
      //  textAlign:"justify",

        paddingTop:10,
       
        //backgroundColor:'red'
    },
});