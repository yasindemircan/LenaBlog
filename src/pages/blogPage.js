import React from 'react'
import { StyleSheet, Text, View,Image, SafeAreaView ,FlatList,Dimensions} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import BlogConsumer from "../context/context"

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export default function blog({navigation}) {

    const handleDetail = (id) => {
        console.log(id)
        navigation.navigate('Detail',{id})
    }
    

    const renderItem = (post) => (
        // <Item title={post} navigation={navigation} /> 
        <View style={styles.textContainer}>
        {/* {console.log("item içi ",post)} */}
        <View style={styles.bannerView}>
            <Image style={styles.bannerImage} resizeMethod="resize" resizeMode="stretch"
            source={{uri: post.item.banner}} />
       </View>
       
       <View style={styles.blogViewContent}>
           <View style={{flexDirection:"row"}}>
                <Text style={styles.title}>{post.item.title}</Text>
           <Text style={styles.readingTime}>{post.item.totalReadingTime} read time</Text>
           </View>
          <View style={styles.contentText}>
              <Text onPress={() => handleDetail(post.item.postId)}>
            {post.item.summary}
        </Text>   
          </View>
         
       </View>
       
    </View>

    )
    return (
        <BlogConsumer>
            {
                value =>{
                   const {data} = value[0];
                 // console.log("::",value)
                   if(!value[0].loading && !value[0].error){
                    //  console.log("value::",data)
                      return(
                       <SafeAreaView style={styles.container}>
                        <FlatList showsVerticalScrollIndicator={false} 
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.postId.toString()}
                         /> 
                        </SafeAreaView>  
                         )
                   }

                }
            }
        </BlogConsumer>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
       // borderWidth: 1,
        height: screenHeight,
        width:'100%'

    },
    textContainer: {
        marginTop: '3%',
        marginLeft: 'auto',
        marginRight: 'auto',

        width: '95%',
        height: 'auto',
       // flexDirection:"column",
      //  justifyContent: 'flex-start',
      //  alignSelf:'flex-start',
      //  position:"relative",
        borderRadius: 20,
      
        //  borderWidth:1,
       // borderColor: 'red',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
       shadowRadius: 2,
      //  elevation: 1,

        flex:1
    },
    bannerView: {
      //  borderWidth:1,
        width: '100%',
        height: screenHeight/3 -30,
        top: 0,
        position: 'relative',
        elevation: 0,
    //    justifyContent: "flex-start",
      //  alignItems: "flex-start",
       // flex:1,
       // borderWidth:1,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },
    bannerImage: {
        width: '100%',
        minHeight: screenHeight/3 - 30,
        borderWidth:0,
        borderTopLeftRadius:20,
        borderTopRightRadius:20,
    },

    blogViewContent: {
        flex:1,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#F6F8FA',
        width: '100%',
        height:'auto',
      //  elevation:1,
     
      //  opacity: 1,
        borderWidth:1,
        borderColor:'#E1E4E8',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingLeft: 15,
        paddingRight:15,
        paddingBottom:10,
        paddingTop:10,
     //   bottom:0,

    },
    title:{
        flex: 0.8,
        borderWidth: 0,
        lineHeight:20,
        fontSize: screenWidth/25,
        color:'black',
        fontWeight:"bold",
        padding:5,
        textAlign:"center",
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
        minHeight:50,
        textAlign:"justify",
        paddingTop:10,
       
        //backgroundColor:'red'
    },
  });