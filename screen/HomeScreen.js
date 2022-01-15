import React, { useEffect, useState } from 'react'
import { View, ScrollView } from 'react-native'
import BottomTabs, { bottomTabIcons } from '../component/home/BottomTabs'
import Header from '../component/home/Header'
import Posts from '../component/home/Posts'
import { db } from '../firebase'

const HomeScreen = ({navigation}) => {

    const [posts, setPosts] = useState([])
    useEffect(() => {
        db.collectionGroup('posts')
        .orderBy('createdAt', 'desc')
        .onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => doc.data()))
        })
    }, [])

    return (
        <View style={{backgroundColor:'black'}}>
            <Header navigation={navigation}/>
            <BottomTabs icons={bottomTabIcons} navigation={navigation} />
            <ScrollView style={{height:620}}>
                {posts.map((post,index) => (
                    <Posts post={post} key={index}/>
                ))}  
            </ScrollView>
            <View style={{marginBottom:50}}/>
            
        </View>
    )
}



export default HomeScreen
