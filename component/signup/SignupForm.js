import React from 'react'
import { View, Button, TextInput, StyleSheet, Text, TouchableOpacity, Pressable, Alert} from 'react-native'
import Validator from 'email-validator'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { firebase, db } from '../../firebase'
import KeyboardScroll from '../keyboard/Keyboard'

const SignupForm = ({navigation}) => {
    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        username: Yup.string().required().min(2, 'A username is required'),
        password: Yup.string()
            .required()
            .min(8, 'Your password has to have at least 8 characters'),
        
    })

    const onSignup = async (email, password, username) => {
        try{
            const authUser = await firebase.auth().createUserWithEmailAndPassword(email, password)

            console.log('thanh cong')

            db.collection('users').doc(authUser.user.email).set({
                owner_uid: authUser.user.uid,
                username: username,
                email: authUser.user.email,
                profile_picture: 'https://vnn-imgs-f.vgcloud.vn/2020/03/23/11/trend-avatar-1.jpg',
                following: [],
                followers: []
            })
        }catch (error) {
            Alert.alert('Loi', error.message)
        }
    }

    return (
        <KeyboardScroll>
        <View style={{marginTop: 80}}>
            <Formik
            initialValues={{email:'',password:'', username:''}}
            onSubmit={values => {
                onSignup(values.email, values.password, values.username)
            }}
            validationSchema={SignupFormSchema}
            validateOnMount={true}
            >
            {({handleChange, handleBlur, handleSubmit, values, isValid}) => (
                <>
                <View style={[
                    styles.inputField,
                    {
                        borderColor:
                            values.email.length < 1 || Validator.validate(values.email)
                            ? '#ccc'
                            : 'red'
                    }
                ]}>
                    <TextInput
                        placeholderTextColor='#444'
                        placeholder='Email'
                        autoCapitalize='none'
                        keyboardType='email-address'
                        textContentType='emailAddress'
                        autoFocus={true}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />
                </View>
                <View style={[
                    styles.inputField,
                    {
                        borderColor:
                            values.username.length < 1 || values.username.length >=2
                            ? '#ccc'
                            : 'red'
                    }
                ]}>
                    <TextInput
                        placeholderTextColor='#444'
                        placeholder='Username'
                        autoCapitalize='none'
                        textContentType='username'
                        autoFocus={true}
                        onChangeText={handleChange('username')}
                        onBlur={handleBlur('username')}
                        value={values.username}
                    />
                </View>
                <View style={[
                    styles.inputField,
                    {
                        borderColor:
                            values.password.length < 1 || values.password.length >=8
                            ? '#ccc'
                            : 'red'
                    }
                ]}>
                    <TextInput
                        placeholderTextColor='#444'
                        placeholder='Password'
                        autoCapitalize='none'
                        autoCorrect={false}
                        secureTextEntry={true}
                        textContentType='password'
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                    />
                </View>
                <Pressable
                    title={20}
                    style={styles.button(isValid)}
                    onPress={handleSubmit}
                    disabled={!isValid}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'center',
                    marginTop:30,
                }}>
                    <Text>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.push('LoginScreen')}>
                        <Text style={{color:'#6BB0F5'}}>Login</Text>
                    </TouchableOpacity>
                </View>
                </>
                )}
            </Formik>
        </View>
        </KeyboardScroll>
    )
}

const styles = StyleSheet.create ({
    inputField: {
        borderRadius: 4,
        padding: 12,
        backgroundColor: '#FAFAFA',
        marginBottom: 10,
        borderWidth: 1,
    },
    button: isValid => ({
        backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 42,
        borderRadius: 4,
    }),

    buttonText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 20,
    }

})

export default SignupForm
