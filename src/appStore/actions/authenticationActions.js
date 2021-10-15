import { errorHandler } from './errorHandler';
import kabadaAPI from './kabadaAPI';

export const login = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        dispatch({ type: 'INFO', payload: "" });
        try {
            const response = await kabadaAPI.post('api/auth/login', { 'Email': email, 'Password': password });
            dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
        } catch (error) {
            if (error.response === undefined) {
                dispatch({ type: 'ERROR', payload: { message: 'Oopsie... System error. Try again, later' } });
            } else {
                dispatch({ type: 'ERROR', payload: errorHandler(error) });
            }
        } finally {
            dispatch({ type: 'LOADING', payload: false });
        }
    }
};
export const googleLogin = (email, token) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        try {
            const response = await kabadaAPI.post('api/auth/google', { 'Email': email, 'GoogleToken': token });
            dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
        } catch (error) {
            if (error.response === undefined) {
                dispatch({ type: 'ERROR', payload: { message: 'Oopsie... System error. Try again, later' } });
            } else {
                dispatch({ type: 'ERROR', payload: error.response.data });
            }
        } finally {
            dispatch({ type: 'LOADING', payload: false });
        }
    }
};

export const facebookLogin = (access_token) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        try {
            dispatch({ type: 'LOGIN_SUCCESS', payload: { 'access_token': access_token } });
        } catch (error) {
            if (error.response === undefined) {
                dispatch({ type: 'ERROR', payload: { message: 'Oopsie... System error. Try again, later' } });
            } else {
                dispatch({ type: 'ERROR', payload: error.response.data });
            }
        } finally {
            dispatch({ type: 'LOADING', payload: false });
        }
    }
};

export const register = (name, email, password, callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        dispatch({ type: 'INFO', payload: "" });
        try {
            const response = await kabadaAPI.post('api/auth/register',
                {
                    'Name': name,
                    'Email': email,
                    'Password': password
                });
            dispatch({ type: 'REGISTER_USER_SUCCESS', payload: response.data });
            callback();
        } catch (error) {
            if (error.response === undefined) {
                dispatch({ type: 'ERROR', payload: { message: '' } });
            } else {
                dispatch({ type: 'ERROR', payload: errorHandler(error) });
            }
        } finally {
            dispatch({ type: 'LOADING', payload: false });
        }
    }
};

export const logout = () => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOGOUT_USER_SUCCESS', payload: {} });
    }
};

export const forgotPassword = (email, callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        try {
            await kabadaAPI.post('api/auth/reset', { 'Email': email });
            callback();
        } catch (error) {
            if (error.response === undefined) {
                dispatch({ type: 'ERROR', payload: { message: 'Oopsie... System error. Try again, later' } });
            } else {
                dispatch({ type: 'ERROR', payload: error.response.data });
            }
        } finally {
            dispatch({ type: 'LOADING', payload: false });
        }
    }
};

export const resetPassword = (requestString, password, callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        try {
            await kabadaAPI.post('api/auth/set_password', { 'Password': password, 'PasswordResetString': requestString });
            callback();
        } catch (error) {
            if (error.response === undefined) {
                dispatch({ type: 'ERROR', payload: { message: 'Oopsie... System error. Try again, later' } });
            } else {
                dispatch({ type: 'ERROR', payload: error.response.data });
            }
        } finally {
            dispatch({ type: 'LOADING', payload: false });
        }
    }
};
