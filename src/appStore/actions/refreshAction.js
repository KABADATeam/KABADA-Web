import kabadaAPI from './kabadaAPI';

export const refreshPlan = (planId, callback) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const [response] = await Promise.all([kabadaAPI.get("api/plans", { headers: { Authorization: `Bearer ${token}` } })]);
            dispatch({ type: "FETCHING_PLANS_SUCCESS", payload: response.data.privateBusinessPlans.businessPlan });
            // const response_tooltip = await kabadaAPI.get('api/Technical/tooltips', { headers: { Authorization: `Bearer ${token}` } });
            // dispatch({ type: "FETCHING_TOOLTIPS_SUCCESS", payload: response_tooltip.data});
            const response_nace = await kabadaAPI.get('/api/nace/wood');
            dispatch({ type: 'FETCHING_NACE_SUCCESS', payload: response_nace.data });
            const response_countries = await kabadaAPI.get('api/countries' );
            dispatch({ type: 'COUNTRIES_FETCH_SUCCESS', payload: response_countries.data });
            const response_languages = await kabadaAPI.get('api/languages');
            dispatch({ type: 'PLAN_LANGUAGES_FETCH_SUCCESS', payload: response_languages.data }); 
            const plan = getState().personalBusinessPlans.find(x => x.id === planId);
            dispatch({ type: 'FETCHING_SELECTED_PLAN_SUCCESS', payload: plan });
            const response_plan_details = await kabadaAPI.post("api/plans/fetch", { "Id": planId }, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_SELECTED_PLAN_DETAILS_SUCCESS", payload: response_plan_details.data });
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
            const response_plan_details = await kabadaAPI.post("api/plans/fetch", { "Id": planId }, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_SELECTED_PLAN_DETAILS_SUCCESS", payload: response_plan_details.data });
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
