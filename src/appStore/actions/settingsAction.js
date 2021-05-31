import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getUserSettings = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: "FETCHING_SETTINGS_SUCCESS", payload: {} });
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

export const updateUserSettings = (settings) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const postObject = settings;
            //const response = await kabadaAPI.post('api/user/editSettings', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'UPDATE_SETTINGS_SUCCESS', payload: settings });
            //callback();
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
            //callback2();
        } finally {
        }
    }
};
