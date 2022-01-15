import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

const HeaderNewPost = ({navigation}) => {
    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.push('HomeScreen')}>
                <Image 
                source={{ uri :'https://img.icons8.com/ios-glyphs/90/ffffff/back.png'}}
                style={{ width: 30, height: 30}}/>
            </TouchableOpacity>
            <Text style={styles.headerText}>New Post</Text>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        marginHorizontal: 10,
    },

    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        marginRight: 25,
    }
})

export default HeaderNewPost
