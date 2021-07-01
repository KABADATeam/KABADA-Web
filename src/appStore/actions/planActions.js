import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const saveInitialPlanData = (title, activityId, countryId, languageId, fileId) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const postObject = {
                'title': title,
                'activityId': activityId,
                'countryId': countryId,
                'img': fileId,
                'languageId': languageId
            }
            const response = await kabadaAPI.post('api/plans', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVING_PLAN_SUCCESS', payload: { ...response.data, "percentage": 0, "dateCreated": response.data.created, "name": response.data.title, "planImage": response.data.img } });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const getAllPublicPlans = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: "FETCHING_ALL_PLANS_SUCCESS", payload: {} });
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

const getURL = (bufferArray) => {
    var blob = new Blob([ bufferArray ], { type: "image/png" } );
    return URL.createObjectURL(blob);
}

export const getImage = (plan) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;

            const response = await kabadaAPI.get("api/files/" + plan.planImage, { headers: { Authorization: `Bearer ${token}` }, responseType: 'arraybuffer' });
            dispatch({ type: "FETCHING_IMAGE_SUCCESS", payload: { ...plan, coverImage: getURL(response.data)  }});
        } catch (error) {
            console.log(error);
        }
    }
}

export const getPlans = () => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get("api/plans", { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_PLANS_SUCCESS", payload: response.data.privateBusinessPlans.businessPlan });
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
            await kabadaAPI.delete("api/plans/remove/" + planId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "REMOVING_PLAN_SUCCESS", payload: { data: getState().savedBusinessPlans, id: planId } });
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
    }
};

export const getSelectedPlan = (plan) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: 'FETCHING_SELECTED_PLAN_SUCCESS', payload: plan });
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
    }
};

export const updatePlanData = (planId, title, activityId, countryId, callback, callback2) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const postObject = {
                'Id': planId,
                'Title': title,
                'ActivityId': activityId,
                'CountryId': countryId
            }
            const response = await kabadaAPI.post('api/plans/edit', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'UPDATING_PLAN_SUCCESS', payload: response.data });
            callback();
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
            callback2();
        } finally {
        }
    }
};

export const clearSelectedPlan = () => {
    return async (dispatch, getState) => {
        dispatch({ type: 'CLEARING_SELECTED_PLAN_SUCCESS', payload: {} });
    }
};