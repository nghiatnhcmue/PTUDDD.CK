import React from 'react'
import { View} from 'react-native'
import HeaderNewPost from '../component/newpost/HeaderNewPost'
import PostUploader from '../component/newpost/PostUploader'

const NewPostScreen = ({navigation, image}) => {
    return (
        <View style={{backgroundColor:'black', flex:1}}>
            <HeaderNewPost navigation={navigation}/>
            <PostUploader navigation={navigation} image={image}/>
        </View>
    )
}


export default NewPostScreen
