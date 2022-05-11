import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getCustomerRelationshipsCategories = () => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/custRel/categories', { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_CUSTOMER_RELATIONSHIPS_CATEGORIES_SUCCESS", payload: response.data });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const getCustomerRelationships = (planId) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/custRel/' + planId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_CUSTOMER_RELATIONSHIPS_SUCCESS", payload: response.data });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const saveState = (planId, is_completed, callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/plans/changeRelationshipCompleted', { "business_plan_id": planId, "is_customer_relationship_completed": is_completed }, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_STATE_SUCCESS', payload: is_completed });
            callback();
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const selectRelationshipCategory = (item) => {
    return async (dispatch, getState) => {
        dispatch({ type: "SELECTING_RELATIONSHIP_CATEGORY_SUCCESS", payload: item });
    };
};

export const saveCustomerRelationship = (postObject, reducerObj) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            console.log(postObject)
            console.log(reducerObj)
            const response = await kabadaAPI.post('api/custRel/save', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_CUSTOMER_RELATIONSHIP_SUCCESS', payload: { ...reducerObj, "id": response.data, "key": response.data } });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const deleteCustomerRelationship = (obj) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.delete("api/custRel/" + obj.id, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "REMOVING_CUSTOMER_RELATIONSHIP_SUCCESS", payload: obj });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const updateCustomerRelationship = (postObject, reducerObject) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/custRel/save', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'UPDATE_CUSTOMER_RELATIONSHIP_SUCCESS', payload: reducerObject });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const getAICustomerRelationshipsPredict = (postObject) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true});
        dispatch({ type: 'ERROR_AI_MESSAGE', payload: false});
        dispatch({ type: 'RESET_AI_PREDICT'});
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/plans/predict', postObject, { headers: { Authorization: `Bearer ${token}` } });
            console.log(response.data.plan.custRelationship);
            dispatch({ type: 'GET_AI_CUSTOMER_RELATIONSHIP_PREDICT_SUCCESS', payload: response.data.plan.custRelationship });
        } catch {
            dispatch({ type: 'ERROR_AI_MESSAGE', payload: true});
        } finally {

        }
    }
}

export const setRelationshipCategory = (item) => {
    return async (dispatch, getState) => {
        dispatch({ type: "SET_RELATIONSHIP_CATEGORY_SUCCESS", payload: item });
    };
};