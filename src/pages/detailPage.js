import React, { useContext } from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview';

import { BlogContext } from "../context/context"

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width


export default function detail({ route }) {

    const { id } = route.params
    const data = useContext(BlogContext);
    const dispatch = data[1];
    const value = data[0];

    const detailBlog = () => {
        return value.data.find(text => text.postId === id)     // Navigatordan gelen id ile context api'daki state içinde arama yapıp eşleşeni return ediyoruz
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
                        <ScrollView style={{ flex: 1, height: screenHeight }} nestedScrollEnabled={true} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.title}>{Blog.title}</Text>
                                <Text style={styles.readingTime}>{Blog.totalReadingTime} min read </Text>
                            </View>
                            <View style={styles.contentText}>
                                <WebView source={webViewContent} style={styles.contentText} />
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
        height: screenHeight,
        width: '100%'
    },
    textContainer: {
        width: '100%',
        height: screenHeight,
        justifyContent: 'flex-start',
    },
    bannerView: {
        width: '100%',
        height: screenHeight / 3,
        top: 0,
        position: 'relative',
        elevation: 2,
        flex: 1,
    },
    bannerImage: {
        width: '100%',
        height: screenHeight / 3
    },
    blogViewContent: {
        flex: 2,
        elevation: 3,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#F6F8FA',
        width: '100%',
        height: '50%',
        padding: 20,
    },
    title: {
        flex: 0.8,
        lineHeight: 20,
        fontSize: screenWidth / 23,
        color: 'black',
        fontWeight: "bold"
    },
    readingTime: {
        backgroundColor: '#468847',
        color: 'white',
        fontWeight: "bold",
        flex: 0.2,
        fontSize: 13,
        padding: 7,
        textAlignVertical: "center",
        textAlign: "center",
        borderRadius: 5
    },
    contentText: {
        flex: 1,
        width: '100%',
        minHeight: 'auto',
        backgroundColor: '#F6F8FA',
        paddingTop: 10,
    },
});