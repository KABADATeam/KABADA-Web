import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getRevenues = (planId) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/revenue/' + planId, { headers: { Authorization: `Bearer ${token}` } });
            console.log('Revenues:'+JSON.stringify(response.data))
            dispatch({ type: "FETCHING_REVENUE_STREAMS_SUCCESS", payload: response.data });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const getStreamTypes = () => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const response = await kabadaAPI.get('api/revenue/streamTypes');
            console.log('GOT stream types :'+JSON.stringify(response.data))
            dispatch({ type: "FETCHING_REVENUE_TYPES_SUCCESS", payload: response.data });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const getPrices = () => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const response = await kabadaAPI.get('api/revenue/prices');
            dispatch({ type: "FETCHING_REVENUE_PRICES_SUCCESS", payload: response.data });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const saveRevenue = (postObject, reducerObject) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/revenue/save', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_REVENUE_SUCCESS', payload: { ...reducerObject, "id": response.data, "key": response.data } });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const updateRevenue = (postObject, reducerObject) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/revenue/save', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'UPDATE_REVENUE_SUCCESS', payload: reducerObject });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const saveState = (planId, is_completed, callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/plans/changeRevenueCompleted', { "business_plan_id": planId, "is_revenue_completed": is_completed }, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_STATE_SUCCESS', payload: is_completed });
            callback();
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const deleteRevenue = (obj) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.delete("api/revenue/" + obj.id, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "REMOVING_REVENUE_SUCCESS", payload: obj });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};