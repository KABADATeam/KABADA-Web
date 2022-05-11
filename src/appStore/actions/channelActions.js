import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getChannels = (planId) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/channels/' + planId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_CHANNELS_SUCCESS", payload: response.data });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const getChannelTypes = () => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const response = await kabadaAPI.get('api/channels/types');
            dispatch({ type: "FETCHING_CHANNEL_TYPES_SUCCESS", payload: response.data });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const saveChannel = (postObject, reducerObject) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/channels/save', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_CHANNEL_SUCCESS', payload: { ...reducerObject, "id": response.data } });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const updateChannel = (postObject, reducerObject) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/channels/save', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'UPDATE_CHANNEL_SUCCESS', payload: { ...reducerObject, "id": postObject.id } });
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
            await kabadaAPI.post('api/plans/changeChannelsCompleted', { "business_plan_id": planId, "is_channels_completed": is_completed }, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_STATE_SUCCESS', payload: is_completed });
            callback();
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const deleteChannel = (id) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.delete("api/channels/" + id, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "REMOVING_CHANNEL_SUCCESS", payload: id });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const getAIChannelsPredict = (postObject) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true});
        dispatch({ type: 'ERROR_AI_MESSAGE', payload: false});
        dispatch({ type: 'RESET_AI_PREDICT'});
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/plans/predict', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'GET_AI_CHANNEL_PREDICT_SUCCESS', payload: response.data.plan.channels });
        } catch {
            dispatch({ type: 'ERROR_AI_MESSAGE', payload: true});
        } finally {

        }
    }
}