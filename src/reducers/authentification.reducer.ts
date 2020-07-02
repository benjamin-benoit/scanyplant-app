import { userConstants } from '../constants';
import AsyncStorage from '@react-native-community/async-storage';
import { readStorage } from '../utils/storage';

let user = readStorage('user')
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
	switch (action.type) {
		case userConstants.LOGIN_REQUEST:
			return {
				loggingIn: true,
				user: action.user,
			};
		case userConstants.LOGIN_SUCCESS:
			return {
				loggedIn: true,
				user: action.user,
			};
		case userConstants.LOGIN_FAILURE:
			return {};
		case userConstants.LOGOUT:
			return {};
		default:
			return state;
	}
}
