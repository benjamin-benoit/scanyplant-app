import React from 'react';
import { Button, Text, TextInput } from 'react-native-paper';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { AppBar } from '../components';
import { useDispatch } from 'react-redux';
import { userActions } from '../actions';

const styles = StyleSheet.create({
	button: {
		textDecorationColor: '#ffffff',
		marginLeft: 20,
		marginRight: 20,
		marginVertical: 10,
	},
	viewStyle: {
		marginLeft: "10%",
		// marginTop: "50%",
		width: "80%",
		display:'flex',
		alignContent:'center'
	}
});

export default function LoginScreen({ navigation }) {
	const uDispatch = useDispatch();
	const loginUser = (email, password) => {
		uDispatch(userActions.login(email, password));
	};
	return (
		<>
			<AppBar title="LOGIN" />
			<View style={styles.viewStyle} >
				<Formik
					initialValues={{
						email: '',
						password: '',
					}}
					validationSchema={Yup.object().shape({
						email: Yup.string().email().required('This field is required'),
						password: Yup.string().required('This field is required'),
					})}
					onSubmit={values => loginUser(values.email, values.password)}
				>
					{({
						handleChange,
						handleBlur,
						handleSubmit,
						values,
						errors,
						isValid,
						touched,
					}) => (
						<>
							<TextInput
								label="Email"
								accessibilityStates
								value={values.email}
								onBlur={handleBlur('email')}
								style={{backgroundColor:'transparent'}}
								onChangeText={handleChange('email')}
							/>
							{errors.email && touched.email && (
								<Text style={{ fontSize: 10, color: 'red' }}>
									{errors.email}
								</Text>
							)}
							<TextInput
								label="Password"
								value={values.password}
								accessibilityStates
								onBlur={handleBlur('password')}
								secureTextEntry={true}
								style={{backgroundColor:'transparent'}}
								onChangeText={handleChange('password')}
							/>
							{errors.password && touched.password && (
								<Text style={{ fontSize: 10, color: 'red' }}>
									{errors.password}
								</Text>
							)}
							<Button
								disabled={!isValid}
								style={styles.button}
								mode="contained"
								onPress={handleSubmit}
							>
								{' '}
								Login{' '}
							</Button>
						</>
					)}
				</Formik>
				<Button onPress={() => navigation.navigate('changePassword')}>
					Password forgotten
				</Button>
				<Button
					style={styles.button}
					onPress={() => navigation.navigate('Register')}
				>
					Register
				</Button>
			</View>
		</>
	);
}
