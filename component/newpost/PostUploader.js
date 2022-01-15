import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Image, Button } from 'react-native'
import {firebase, db} from '../../firebase'


export default function PostUploader({navigation, image}) {
    const [caption, setCaption] = useState("")
    const [currentLoggedInUser, setcurrentLoggedInUser] = useState('')

    const getUsername = () => {
        const user = firebase.auth().currentUser
        const unsubcribe = db.collection('users').where('email', '==', user.email).limit(1).onSnapshot(
            snapshot => snapshot.docs.map(doc => {
                setcurrentLoggedInUser({
                    username: doc.data().username,
                    profilePicture: doc.data().profile_picture
                })
            })
        )
        return unsubcribe
    }


    useEffect(() => {
        getUsername()
    }, [])

    const uploadImage = async () => {
        const uri = image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        console.log(childPath)

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log('url', snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const savePostData = (downloadURL) => {

        const unsubcribe = db
        .collection('users')
        .doc(firebase.auth().currentUser.email)
        .collection('posts')
        .doc(firebase.auth().currentUser.email + caption)
        .set({
            imageUrl: downloadURL,
            caption: caption,
            liked_by_users: [],
            comments: [],
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            owner_email: firebase.auth().currentUser.email,
            user: currentLoggedInUser.username,
            profile_picture: currentLoggedInUser.profilePicture,
        })
        .then(() => navigation.goBack())
        return unsubcribe
    }
    return (
        <View>
            <View style={{marginTop:20, marginBottom:50, justifyContent:'space-between', flexDirection:'row'}}>
                <Image source={{uri : image}} style={{width:100, height:100}}/>
                <View style={{flex:1, marginLeft:12}}>
                    <TextInput style={{color:'white', fontSize:20}}
                        placeholder='Write a caption ...' 
                        placeholderTextColor='gray'
                        multiline={true}
                        onChangeText={(txt) => {setCaption(txt)}}
                        value={caption}
                    />
                </View>
            </View>
            <Button onPress={() => uploadImage()} title='Share'/>
        </View>   
    )
}