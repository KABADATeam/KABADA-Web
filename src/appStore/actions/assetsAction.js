import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getAssets = (planId) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/kres/assets/' + planId, { headers: { Authorization: `Bearer ${token}` } });
            console.log(response.data);
            dispatch({ type: "FETCHING_ASSETS_SUCCESS", payload: response.data });
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

export const updateAssets = (postObject, reducerObject) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('/api/kres/assets/save', postObject, { headers: { Authorization: `Bearer ${token}` } })
            console.log(postObject);
            dispatch({ type: 'UPDATE_ASSETS_LIST_SUCCESS', payload: reducerObject});
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};