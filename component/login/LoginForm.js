import React from 'react'
import { View, Alert, TextInput, StyleSheet, Text, TouchableOpacity, Pressable} from 'react-native'
import Validator from 'email-validator'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { firebase } from '../../firebase'
import KeyboardScroll from '../keyboard/Keyboard'

const LoginForm = ({navigation}) => {
    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        password: Yup.string()
            .required()
            .min(8, 'Your password has to have at least 8 characters')
    })

    const onLogin = async (email, password) => {
        try{
            await firebase.auth().signInWithEmailAndPassword(email, password)
            console.log('roi', email, password)
        } catch (error) {
            Alert.alert(
                'Loi dang nhap',
                '\n\n ... ban co muon',
                [
                    {
                        text: 'OK',
                        onPress: () => console.log('OK'),
                        styles: 'camcel',
                    },
                    {
                        text: 'Sign Up', onPress: () => navigation.push('SignupScreen')
                    }
                ]
            )
        }
    }

    return (
        <KeyboardScroll>
        <View style={{marginTop: 80}}>
            <Formik
            initialValues={{email:'',password:''}}
            onSubmit={values => {
                onLogin(values.email, values.password)
            }}
            validationSchema={LoginFormSchema}
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
                        placeholder='Phone number, user or email'
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
                <View style={{alignItems:'flex-end', marginBottom:10}}>
                    <Text style={{color:'#6BB0F5'}}>Forgot Password?</Text>
                </View>
                <Pressable
                    title={20}
                    style={styles.button(isValid)}
                    onPress={handleSubmit}
                    disabled={!isValid}
                >
                    <Text style={styles.buttonText}>Log In</Text>
                </Pressable>
                <View style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'center',
                    marginTop:30,
                }}>
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
                        <Text style={{color:'#6BB0F5'}}>Sign Up</Text>
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

export default LoginForm
