import React, { useContext, useEffect, useCallback, useState } from 'react'
import { StyleSheet, Text, View, Image, SafeAreaView, FlatList, Dimensions, RefreshControl, ToastAndroid, ActivityIndicator } from 'react-native';
import Loading from "../component/loading"

import { BlogContext } from "../context/context"

const screenHeight = Dimensions.get('window').height
const screenWidth = Dimensions.get('window').width

export default function blog({ navigation }) {
    const [refreshing, setRefreshing] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    // ----------- Refresh Error
    const showToast = () => {
        return new Promise(resolve => {
            ToastAndroid.show("Oppps!", ToastAndroid.SHORT);
        });
    };
    // ---------  Refresh
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        try {
            setPageNum(1)
            await fetchData()
                .then(() => setRefreshing(false));
        } catch (error) {
            showToast()
                .then(() =>
                    setRefreshing(false));
        }

    }, []);
    // --------Context Api connect
    const data = useContext(BlogContext);
    const dispatch = data[1];
    const value = data[0];


    const URL_CREATOR = (params) => {
        const BASE_URL = "https://www.lenasoftware.com/api/v1/en/maestro/1"
        const Query = `?page=${params}&count=10`
        return (
            params ? `${BASE_URL}${Query}`
                : "https://www.lenasoftware.com/api/v1/en/maestro/1"
        )
    }
    //--------------- RESPONSE-----------------
    const fetchData = async (signal) => {
        try {
            let response = await fetch(URL_CREATOR(pageNum),{signal:signal});
            let jsonData = await response.json();
            pageNum === 1 ? dispatch({ type: 'FETCH_SUCCESS', payload: jsonData.result }) :
                dispatch({ type: 'FETCH_SUCCESS_MORE', payload: jsonData.result })
        } catch (err) {
            dispatch({ type: 'FETCH_ERROR' })
        }
    }
    useEffect(() => {
        const abortControlller = new AbortController()
        const signal = abortControlller.signal
        fetchData(signal)
        return function cleanup(){
            abortControlller.abort()
        }
    }, [pageNum])

    const getMoreText = () => {
        setPageNum(pageNum + 1)
    }
    const handleDetail = (id) => {
        navigation.navigate('Detail', { id })      // post id yakalayıp detay sayfasına yönlendirir
    }


    const renderItem = (post) => (
        <View style={styles.textContainer}>
            <View style={styles.bannerView}>
                <Image style={styles.bannerImage} resizeMethod="resize" resizeMode="stretch"
                    source={{ uri: post.item.banner }} />
            </View>

            <View style={styles.blogViewContent}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={styles.title}>{post.item.title}</Text>
                    <Text style={styles.readingTime}>{post.item.totalReadingTime} read time</Text>
                </View>
                <View style={styles.contentText}>
                    <Text onPress={() => handleDetail(post.item.postId)}>
                        {post.item.summary}. Read More ..
                    </Text>
                </View>

            </View>

        </View>

    )
    return (
        <SafeAreaView style={styles.container}>
            { !value.loading && !value.error ?
                <FlatList showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            colors={["#9Bd35A", "#689F38"]}
                            refreshing={refreshing}
                            onRefresh={onRefresh} />}
                    data={data[0].data}
                    renderItem={renderItem}
                    keyExtractor={item => item.postId.toString()}
                    onEndReached={getMoreText}
                    onEndReachedThreshold={0.1}
                /> : <Loading />
            }
        </SafeAreaView>
    )





}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: screenHeight,
        width: '100%'

    },
    textContainer: {
        marginTop: '3%',
        marginLeft: 'auto',
        marginRight: 'auto',

        width: '95%',
        height: 'auto',
        borderRadius: 20,
        flex: 1
    },
    bannerView: {
        width: '100%',
        height: screenHeight / 3 - 30,
        top: 0,
        position: 'relative',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    bannerImage: {
        width: '100%',
        minHeight: screenHeight / 3 - 30,
        borderWidth: 0,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    blogViewContent: {
        flex: 1,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#F6F8FA',
        width: '100%',
        height: 'auto',


        borderWidth: 1,
        borderColor: '#E1E4E8',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        paddingTop: 10,

    },
    title: {
        flex: 0.8,
        lineHeight: 20,
        fontSize: screenWidth / 25,
        color: 'black',
        fontWeight: "bold",
        padding: 5,
        textAlign: "center",
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
        minHeight: 50,
        textAlign: "justify",
        paddingTop: 10,

    },
});