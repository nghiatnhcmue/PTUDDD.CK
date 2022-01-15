import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';
import { Camera } from 'expo-camera';
import NewPostScreen from './NewPostScreen';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen({navigation}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [image, setImage] = useState('');
  const [showcamera, setShowcamera] = useState(true);
  const cameraRef = useRef(null);
  

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');

      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');

    })();
  }, []);


  const takePhoto = async () => {
    if(cameraRef) {
      console.log('in take picture');
      try{
        let photo = await cameraRef.current.takePictureAsync({
          allowsEditing: true,
          aspest: [4,3],
          quality:1,
        });
        return photo;
      }
      catch (e) {
        console.log(e);
      }
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  
  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if (showcamera) {
  return (   
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}/>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              const r = await takePhoto();
              setImage(r.uri)
              console.log(image)
              setShowcamera(false)
            }}>
            <Text style={styles.text}> Photo </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={async () => {
              pickImage()
              setShowcamera(false)
            }}>
            <Text style={styles.text}> Pick </Text>
          </TouchableOpacity>
        </View>
    </View>
  )}
  else{
    return(
      <NewPostScreen image={image} navigation={navigation} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    height: 100,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 50,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});