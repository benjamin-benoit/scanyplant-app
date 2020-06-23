import React from 'react';
import { Button, Card, Subheading, Text, TextInput } from 'react-native-paper';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AppBar } from '../components';


const styles = StyleSheet.create({
    button: {
        textDecorationColor: '#ffffff',
        marginLeft: 20,
        marginRight: 20,
        marginVertical: 10
    },
    textSpan: {
        fontSize: 20,
        color: '#c7f9cc',
        flex: 1,
        alignItems: 'center',
        textAlign: 'center'
    },
});

export default function RegisterScreen({ navigation }) {
    const registerUser = (body) => {
        // console.log('fetch');
        fetch('https://scanyplantback.herokuapp.com/api/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body,
        })
            .then(response => response.json())
            .then(result => {
                console.log(result);
            })
            .catch(err => console.log(err));
    };
    return (
        <SafeAreaView>
            <AppBar title ='REGISTER'/>
            <>
                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                    }}
                    validationSchema={Yup.object().shape({
                        lastName: Yup.string().required('This field is required'),
                        firstName: Yup.string().required('This field is required'),
                        email: Yup.string().email().required('This field is required'),
                        password: Yup.string().required('This field is required'),
                        confirmPassword: Yup.string().when('password', {
                            is: val => (val && val.length > 0 ? true : false),
                            then: Yup.string().oneOf(
                                [Yup.ref('password')],
                                'Both password need to be the same'
                            )
                        })
                    })}
                    onSubmit={values => {
                        console.log(values);
                        registerUser({ email: values.email , firstname : values.firstName })
                       return values.confirmPassword && navigation.navigate('Login')
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
                        <>
                            <TextInput
                                label='Nom'
                                value={values.lastName}
                                onBlur={handleBlur('lastName')}
                                onChangeText={handleChange('lastName')}
                            />
                            {errors.lastName &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.lastName}</Text>
                            }
                            <TextInput
                                label='Prenom'
                                value={values.firstName}
                                onBlur={handleBlur('firstName')}
                                onChangeText={handleChange('firstName')}
                            />
                            {errors.firstName &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.firstName}</Text>
                            }
                            <TextInput
                                label='Email'
                                value={values.email}
                                onBlur={handleBlur('email')}
                                onChangeText={handleChange('email')}
                            />
                            {errors.email &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.email}</Text>
                            }
                            <TextInput
                                label='Password'
                                value={values.password}
                                onBlur={handleBlur('password')}
                                secureTextEntry={true}
                                onChangeText={handleChange('password')}
                            />
                            {errors.password &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.password}</Text>
                            }
                            <TextInput
                                label='confirm Password'
                                value={values.confirmPassword}
                                onBlur={handleBlur('confirmPassword')}
                                secureTextEntry={true}
                                onChangeText={handleChange('confirmPassword')}
                            />
                            {errors.confirmPassword &&
                            <Text style={{ fontSize: 10, color: 'red' }}>{errors.confirmPassword}</Text>
                            }
                            <Button disabled={!isValid} style={styles.button} mode="contained" onPress={handleSubmit}  >Register</Button>
                        </>
                    )}
                </Formik>
                <Button onPress={() => navigation.navigate('Login')} >Login</Button>
            </>
        </SafeAreaView>
    );
}
