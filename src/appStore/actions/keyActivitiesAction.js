import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getKeyActivitiesList = (planId) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/activities/' + planId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_KEY_ACTIVITIES_SUCCESS", payload: response.data });
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

export const getCategories = () => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const response = await kabadaAPI.get('api/activities/categories');
            dispatch({ type: "FETCHING_KEY_ACTIVITIES_CATEGORIES_SUCCESS", payload: response.data });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const selectActivityCategory = (item, callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: "SELECTING_ACTIVITY_CATEGORY_SUCCESS", payload: item });
        callback();
    };
};

export const saveActivity = (postObject, reducerObject) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/activities/save', postObject, {headers: {Authorization: `Bearer ${token}`}});
            console.log(response.data)
            dispatch({ type: 'SAVE_KEY_ACTIVITY_SUCCESS', payload: { ...reducerObject, "id": response.data, "key": response.data }})
        } catch (error) {
            dispatch({ type: 'LOADING', payload: false})
        } finally {

        }
    }
}

export const deleteActivity = (obj) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.delete("api/activities/" + obj.id, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "REMOVING_ACTIVITY_SUCCESS", payload: obj });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};
export const updateKeyActivity = (postObject, reducerObject) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/activities/save', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'UPDATE_KEY_ACTIVITY_SUCCESS', payload: reducerObject });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const saveState = (planId, is_completed) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/plans/changeActivitiesCompleted', { "business_plan_id": planId, "is_activities_completed": is_completed }, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_ACTIVITIES_STATE_SUCCESS', payload: is_completed });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};