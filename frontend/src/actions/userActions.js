import axios from 'axios';
import {
	LOGIN_START,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	REGISTER_USER_START,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAIL,
	LOAD_USER_START,
	LOAD_USER_SUCCESS,
	LOAD_USER_FAIL,
	LOGOUT_SUCCESS,
	LOGOUT_FAIL,
	CLEAR_ERRORS,
} from '../constants/userConstants';

// Register User
export const register = (userData) => async (dispatch) => {
	try {
		dispatch({ type: REGISTER_USER_START });
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		const { data } = await axios.post(
			'/api/v1/auth/register',
			userData,
			config,
		);
		dispatch({
			type: REGISTER_USER_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		console.log(error.response.data.error);
		dispatch({
			type: REGISTER_USER_FAIL,
			payload: error.response.data.error,
		});
	}
};

export const login = (email, password) => async (dispatch) => {
	try {
		dispatch({ type: LOGIN_START });
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const { data } = await axios.post(
			'/api/v1/auth/login',
			{ email, password },
			config,
		);
		dispatch({
			type: LOGIN_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		dispatch({
			type: LOGIN_FAIL,
			payload: error.response.data.error,
		});
	}
};
// Load user
export const loadUser = () => async (dispatch) => {
	try {
		dispatch({ type: LOAD_USER_START });

		const { data } = await axios.get('/api/v1/auth/me');

		dispatch({
			type: LOAD_USER_SUCCESS,
			payload: data.user,
		});
	} catch (error) {
		dispatch({
			type: LOAD_USER_FAIL,
			payload: error.response.data.error,
		});
	}
};
// Logout user
export const logout = () => async (dispatch) => {
	try {
		await axios.get('/api/v1/auth/logout');

		dispatch({
			type: LOGOUT_SUCCESS,
		});
	} catch (error) {
		dispatch({
			type: LOGOUT_FAIL,
			payload: error.response.data.message,
		});
	}
};

// CLEAR ERRORS
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
