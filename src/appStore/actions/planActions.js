import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const saveInitialPlanData = (title, activityId, countryId, callback, callback2) => {
    return async (dispatch, getState) => {
        //dispatch({ type: 'LOADING', payload: true });
        try {
            const token = getState().user.access_token;
            const postObject = {
                'Title': title,
                'ActivityId': activityId,
                'CountryId': countryId
            }
            const response = await kabadaAPI.post('api/plans', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVING_PLAN_SUCCESS', payload: response.data });
            callback();
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
            callback2();
        } finally {
            //dispatch({ type: 'LOADING', payload: false });
        }
    }
};

export const getPlans = () => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get("api/plans", {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch({ type: "FETCHING_PLAN_SUCCESS", payload: response.data });
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

export const removePlan = (planId) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const postObject = {
                'Id': planId
            }
            const response = await kabadaAPI.post('api/plans/remove', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'REMOVING_PLAN_SUCCESS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

