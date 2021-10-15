import kabadaAPI from './kabadaAPI';

export const refreshPlan = (planId, callback) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const [response] = await Promise.all([kabadaAPI.get("api/plans", { headers: { Authorization: `Bearer ${token}` } })]);
            dispatch({ type: "FETCHING_PLANS_SUCCESS", payload: response.data.privateBusinessPlans.businessPlan });
            const plan = getState().personalBusinessPlans.find(x => x.id === planId);
            dispatch({ type: 'FETCHING_SELECTED_PLAN_SUCCESS', payload: plan });
            const response2 = await kabadaAPI.get("api/files/" + plan.planImage, { headers: { Authorization: `Bearer ${token}` }, responseType: 'arraybuffer' });
            dispatch({ type: "UPDATING_SELECTED_PLAN_SUCCESS", payload: { ...plan, coverImage: getURL(response2.data) } });
        } finally {
            if (callback !== null && callback !== undefined) {
                callback();
            }
        }
    };
};

export const refreshPublicPlan = (planId, callback) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const [response] = await Promise.all([kabadaAPI.get("api/plans/public")]);
            dispatch({ type: "FETCHING_ALL_PLANS_SUCCESS", payload: response.data });
            const plan = getState().publicPlans.find(x => x.id === planId);
            dispatch({ type: 'FETCHING_SELECTED_PLAN_SUCCESS', payload: plan });
        } finally {
            if (callback !== null && callback !== undefined) {
                callback();
            }
        }
    };
};

const getURL = (bufferArray) => {
    var blob = new Blob([bufferArray], { type: "image/png" });
    return URL.createObjectURL(blob);
}
