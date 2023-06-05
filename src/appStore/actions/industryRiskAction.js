import kabadaAPI from './kabadaAPI';

export const getRisks = (activityId, callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/nace/risks/' + activityId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_RISKS_SUCCESS", payload: response.data });
            callback();
        } catch (error) {
            if (error.response === undefined) {
                dispatch({
                    type: "ERROR",
                    payload: { message: "Oops... System error. Try again, later" },
                });
            } else {
                dispatch({ type: "ERROR", payload: error.response.data });
            }
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const getSelectedPlanActiveKey = (planId, callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post("api/plans/fetch", { "Id": planId }, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_RISKS_ACTIVE_KEY", payload: response.data.activityID });
            callback();
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};