import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getUserSettings = () => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get("api/user/getSettings", {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch({ type: "FETCHING_SETTINGS_SUCCESS", payload: response.data });
        } catch (error) {
            if (error.response === undefined) {
                dispatch({
                    type: "ERROR",
                    payload: { message: "Oopsie... System error. Try again, later" },
                });
            } else {
                dispatch({ type: "ERROR", payload: error.response.data });
            }
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const updateUserSettings = (settings, isPhotoChanged) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            let postObject;
            let response;
            if (isPhotoChanged === true) {
                postObject = settings;
                response = await kabadaAPI.post('api/user/updateWithPhoto', postObject, { headers: { Authorization: `Bearer ${token}` } });
            }
            else {
                postObject = {
                    'facebook': settings.facebook,
                    'google': settings.google,
                    'firstName': settings.firstName,
                    'lastName': settings.lastName,
                    'recieveEmail': settings.recieveEmail,
                    'recieveNotification': settings.recieveNotification,
                    'isEmailConfirmed': settings.isEmailConfirmed,
                };
                response = await kabadaAPI.post('/api/user/updateWithoutPhoto', postObject, { headers: { Authorization: `Bearer ${token}` } });
            }
            dispatch({ type: 'UPDATE_SETTINGS_SUCCESS', payload: response.data });
            dispatch({ type: 'CHANGE_USERNAME', payload: settings.firstName});
            //callback();
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
            //callback2();
        } finally {
        }
    }
};

export const changeUserPassword = (password, newPassword) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            let postObject = {
                "password": password,
                "newValue": newPassword
            };
            const response = await kabadaAPI.post('api/auth/change_password', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'CHANGE_PASSWORD_SUCCESS', payload: response.data });
        } catch (error) {
            if (error.response === undefined) {
                dispatch({ type: 'ERROR', payload: { message: 'Oopsie... System error. Try again, later' } });
            } else {
                dispatch({ type: 'ERROR', payload: error.response.data });
            }
        } finally {

        }
    }
};

export const changeUserEmail = (email, password) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            let postObject = {
                "password": password,
                "newValue": email
            };
            const response = await kabadaAPI.post('api/auth/change_email', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'CHANGE_EMAIL_SUCCESS', payload: response.data });
        } catch (error) {
            if (error.response === undefined) {
                dispatch({ type: 'ERROR', payload: { message: 'Oopsie... System error. Try again, later' } });
            } else {
                dispatch({ type: 'ERROR', payload: error.response.data });
            }
        } finally {

        }
    }
};

export const resendVerificationEmail = () => {
    return async (dispatch, getState) => {
        try {
            //const token = getState().user.access_token;
            //const response = await kabadaAPI.post('api/auth/change_email', { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'CHANGE_EMAIL_SUCCESS', payload: {} });
        } catch (error) {
            if (error.response === undefined) {
                dispatch({ type: 'ERROR', payload: { message: 'Oopsie... System error. Try again, later' } });
            } else {
                dispatch({ type: 'ERROR', payload: error.response.data });
            }
        } finally {

        }
    }
};