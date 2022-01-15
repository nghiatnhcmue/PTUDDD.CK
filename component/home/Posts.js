import React from 'react'
import { View, Text, StyleSheet, Image, Touchable, TouchableOpacity } from 'react-native'
import { Divider } from 'react-native-elements'
import { db, firebase } from '../../firebase'
const postFooterIcon = [
    {
        name: 'Like',
        imageUrl:
        'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png',
        likedimageUrl:
        'https://img.icons8.com/ios-glyphs/60/fa314a/filled-like.png',
    },
    {
        name: 'Comment',
        imageUrl:
        'https://img.icons8.com/material-outlined/60/ffffff/speech-bubble--v1.png4',
    },
    {
        name: 'Share',
        imageUrl:
        'https://img.icons8.com/external-flatart-icons-outline-flatarticons/60/ffffff/external-send-email-flatart-icons-outline-flatarticons.png',
    },
    {
        name: 'Save',
        imageUrl:
        'https://img.icons8.com/pastel-glyph/60/ffffff/bookmark-ribbon.png',
    }
]



const Posts = ({post}) => {

    return (
        <View style={{margin: 5}}>
            <Divider width={1} orientation='vertical'/>
            <PostHeader post={post}/>
            <PotsImage post={post}/>
            <PostFooter post={post}/>
            <Likes post={post}/>
            <Caption post={post}/>
            <CommentSection post={post}/>
            <Comments post={post}/>
        </View>
    )
}



const PostHeader = ({post}) => (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 5,
                alignItems: 'center',
            }}
        >
            <View style={{ flexDirection:'row', alignItems:'center'}}>
                <Image source={{ uri: post.profile_picture }} style={styles.story}/>
                <Text style={{ color: 'white', fontWeight: '700'}}>
                    {post.user}
                </Text>
            </View>
            <View>
               <Text style={{color: 'white', fontWeight:'900', fontSize: 17}}>
                   ...
               </Text>
            </View>
        </View>
)

const PotsImage = ({post}) => (
    <View style={{ aspectRatio: 1 }}>
        <Image source={{ uri: post.imageUrl }} style={{ height: '100%', resizeMode:'cover'}}/>
    </View>
)

const PostFooter = ({post}) => {
    const handleLike = post => {
        const currentLikeStatus = !post.liked_by_users.includes(
            firebase.auth().currentUser.email
        )

        const unscribe = db.collection('users')
        .doc(post.owner_email)
        .collection('posts')
        .doc(post.owner_email + post.caption)
        .update({
            liked_by_users: currentLikeStatus
            ? firebase.firestore.FieldValue.arrayUnion(
                firebase.auth().currentUser.email
            )
            : firebase.firestore.FieldValue.arrayRemove(
                firebase.auth().currentUser.email
            ),
        })
        .then(() => {
            console.log('thanh cong')
        })
        .catch(error => {
            console.log('loi ', error)
        })
    return unscribe
    }
    return(
        <View style={{flexDirection:'row', marginTop:6}}>
            <View style={styles.leftFooterIconsContainer}>
                <TouchableOpacity onPress={() => handleLike(post)}>
                    <Image style={styles.footerIcon} 
                    source={{uri: post.liked_by_users.includes(firebase.auth().currentUser.email) 
                        ? postFooterIcon[0].likedimageUrl
                        : postFooterIcon[0].imageUrl}}/>
                </TouchableOpacity>
                <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcon[1].imageUrl}/>
                <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcon[2].imageUrl}/>
            </View>
            <View style={{ flex : 1, alignItems:'flex-end'}}>
                <Icon imgStyle={styles.footerIcon} imgUrl={postFooterIcon[3].imageUrl}/>
            </View>
        </View>
    )
}

const Icon = ({imgStyle, imgUrl}) => (
    <TouchableOpacity>
        <Image style={imgStyle} source={{uri:imgUrl}}/>
    </TouchableOpacity>
)

const numberLikes = ({post}) =>{
    var x = post.liked_by_users.length.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

const Likes = ({post}) => (
    <View style={{flexDirection:'row', marginTop:4}}>
        <Text style={{color:'white', fontWeight:'bold'}}>
            {numberLikes(post={post})} likes
        </Text>
    </View>
)

const Caption = ({post}) => (
    <View style={{margin:3}}>
        <Text style={{color:'white'}}>
            <Text style={{fontWeight:'bold'}}> {post.user}</Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
)

const CommentSection = ({post}) => (
    <View>
        {!!post.comments.length && (
            <Text style={{color:'gray'}}>
                View{post.comments.length > 1 ? ' all': ''} {post.comments.length}
                {post.comments.length > 1 ? ' comments' : ' comment'}
            </Text>
        )}
    </View>
)

const Comments = ({post}) => (
    <>
        {post.comments.map((comment, index) => (
            <View key={index} style={{flexDirection:'row', marginTop: 3}}>
                <Text style={{color:'white'}}>
                    <Text style={{fontWeight:'bold'}}>{comment.user} </Text>
                    {comment.comment}
                </Text>
            </View>
        ))}
    </>
)

const styles = StyleSheet.create({
    story: {
        width: 35,
        height: 35,
        borderRadius: 50,
        borderWidth: 1.6,
        borderColor: '#ff8501'
    },
    footerIcon: {
        width: 33,
        height: 33,
    },
    leftFooterIconsContainer: {
        flexDirection:'row',
        width: '32%',
        justifyContent: 'space-between',
    },
})

export default Posts
