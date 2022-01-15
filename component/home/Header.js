import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { firebase } from '../../firebase'

const handleSignout = async () => {
    try {
        await firebase.auth().signOut()
        console.log('thanh cong')
    } catch (error) {
        console.log(error)
    }
}


const Header = ({navigation}) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleSignout}>
                <Image
                    style={styles.logo}
                    source={require('../../assets/Header-logo.png')}
                />
            </TouchableOpacity>

            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => navigation.push('CameraScreen')}>
                    <Image
                        style={styles.icon}
                        source={{uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png'}}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        style={styles.icon}
                        source={{uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png'}}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View>
                        <Text style={styles.unreadBadgeText}>11</Text>
                    </View>
                    <Image
                        style={styles.icon}
                        source={{uri: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png'}}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20,
    },

    iconsContainer: {
        flexDirection: "row",
    },

    logo: {
        width: 100,
        height: 50,
        resizeMode: 'contain',
    },

    icon: {
        width: 35,
        height: 35,
        marginLeft: 10,
        resizeMode: 'contain',
    },
    unreadBadgeText: {
        backgroundColor: 'rgba(255, 0, 0, 0.7)',
        color: 'white',
        fontWeight: '600',
        position: 'absolute',
        left: 30,
        bottom: -15,
        width: 20,
        height: 20,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    }
})

export default Header
