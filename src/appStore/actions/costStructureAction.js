import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getCostStructureList = (planId, callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/cost/' + planId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_COST_STRUCTURE_SUCCESS", payload: response.data });
            callback();
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
            const response = await kabadaAPI.get('api/cost/categories');
            dispatch({ type: "FETCHING_COST_STRUCTURE_CATEGORIES_SUCCESS", payload: response.data });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const selectCostCategory = (item, callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: "SELECTING_COST_CATEGORY_SUCCESS", payload: item });
        callback();
    };
};

export const saveFixedCost = (postObject, reducerObject) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            console.log(postObject);
            const response = await kabadaAPI.post('api/cost/fixed/save', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_COST_SUCCESS', payload: { ...reducerObject, "id": response.data, "key": response.data } })
        } catch (error) {
            dispatch({ type: 'LOADING', payload: false })
        } finally {

        }
    }
}
export const saveVariableCost = (postObject, reducerObject) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/cost/var/save', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_COST_SUCCESS', payload: { ...reducerObject, "id": response.data, "key": response.data } })
        } catch (error) {
            dispatch({ type: 'LOADING', payload: false })
        } finally {

        }
    }
}

export const updateFixedCost = (postObject, reducerObject) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/cost/fixed/save', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'UPDATE_COST_SUCCESS', payload: reducerObject });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const updateVariableCost = (postObject, reducerObject) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/cost/var/save', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'UPDATE_COST_SUCCESS', payload: reducerObject });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const deleteFixedCost = (obj) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.delete("api/cost/fixed/" + obj.id, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "REMOVING_COST_SUCCESS", payload: obj });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};
export const deleteVariableCost = (obj) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.delete("api/cost/var/" + obj.id, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "REMOVING_COST_SUCCESS", payload: obj });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};
export const saveState = (planId, is_completed, callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/plans/changeCostCompleted', { "business_plan_id": planId, "is_cost_completed": is_completed }, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_STATE_SUCCESS', payload: is_completed });
            callback();
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const setCostStructureCategory = (item) => {
    return async (dispatch) => {
        dispatch({ type: "SET_COST_STRUCTURE_CATEGORY_SUCCESS", payload: item });
    };
};

export const getCostStructureAIValues = (postObject) => async (dispatch, getState) => {
    try {
        const token = getState().user.access_token;
        const response = await kabadaAPI.post('api/plans/predict', postObject, { headers: { Authorization: `Bearer ${token}` } });
        dispatch({ type: 'GET_COST_STRUCTURE_AI_PREDICT', payload: response.data.plan.costs});
    } catch {
        dispatch({ type: 'GET_COST_STRUCTURE_AI_PREDICT_FAIL', payload: false});
    }
}

