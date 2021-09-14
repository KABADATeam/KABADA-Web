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
        dispatch({ type: "LOADING", payload: true });
        try {
            const response = await kabadaAPI.get("api/plans/public");
            dispatch({ type: "FETCHING_ALL_PLANS_SUCCESS", payload: response.data });
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
        dispatch({ type: "IMAGE_LOADING", payload: true });
        try {
            if (plan.planImage !== null) {
                const token = getState().user.access_token;

                const response = await kabadaAPI.get("api/files/" + plan.planImage, { headers: { Authorization: `Bearer ${token}` }, responseType: 'arraybuffer' });
                dispatch({ type: "FETCHING_IMAGE_SUCCESS", payload: { ...plan, coverImage: getURL(response.data)  }});
            } else {
                return;
            }
        } finally {
            dispatch({ type: "IMAGE_LOADING", payload: false });
        }
    }
}

export const getPlans = () => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get("api/plans", { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_PLANS_SUCCESS", payload: response.data.privateBusinessPlans.businessPlan });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const getPlansOverview = (planId) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get("api/plans/overview/" + planId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_PLAN_OVERVIEW_SUCCESS", payload: { "id": planId, "overview": response.data } });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const getSelectedPlanOverview = (planId) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get("api/plans/overview/" + planId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_SELECTED_PLAN_OVERVIEW_SUCCESS", payload: { "overview": response.data } });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const removePlan = (planId) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            await kabadaAPI.delete("api/plans/remove/" + planId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "REMOVING_PLAN_SUCCESS", payload: { data: getState().savedBusinessPlans, id: planId } });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const getSelectedPlan = (plan) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: false });
        try {
            dispatch({ type: 'FETCHING_SELECTED_PLAN_SUCCESS', payload: plan });
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

export const updateStatus = (planId, status) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const postObject = {
                "business_plan_id": planId,
                "is_private": !status
            }
            await kabadaAPI.post('api/plans/changeStatus', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'UPDATING_SELECTED_PLAN_STATUS_SUCCESS', payload: status });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const inviteMember = (postObject) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/plans/inviteMember', postObject, { headers: { Authorization: `Bearer ${token}` } });
            //dispatch({ type: 'UPDATING_SELECTED_PLAN_STATUS_SUCCESS', payload: status });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const getMembers = (planId) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get("api/plans/members/" + planId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_PLAN_MEMBERS_SUCCESS", payload: response.data });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const deleteMember = (planId, postObject, callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            await kabadaAPI.delete('api/plans/' + planId + '/member/' + postObject.user_id, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "DELETING_PLAN_MEMBERS_SUCCESS", payload: null });
            callback();
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};