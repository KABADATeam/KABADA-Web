import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getSwotList = (planId) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/swot/' + planId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_SWOT_SUCCESS", payload: response.data });
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

export const updateSwotState = (is_completed) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: 'UPDATE_SWOT_STATE_SUCCESS', payload: { state: is_completed } });
            //callback();
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
            //callback2();
        } finally {
        }
    }
};

export const updateSwotList = (type, item) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: 'UPDATE_SWOT_LIST_SUCCESS', payload: { "type": type, "item": item } });
            //callback();
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
            //callback2();
        } finally {
        }
    }
};

export const createNewItem = (type, item) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: 'CREATE_NEW_ITEM_SUCCESS', payload: { "type": type, "item": item } });
            //callback();
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
            //callback2();
        } finally {
        }
    }
};

export const updateNewItem = (type, item) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: 'UPDATE_NEW_ITEM_SUCCESS', payload: { "type": type, "item": item } });
            //callback();
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
            //callback2();
        } finally {
        }
    }
};

export const deleteNewItem = (type, item) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: 'DELETE_NEW_ITEM_SUCCESS', payload: { "type": type, "item": item } });
            //callback();
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
            //callback2();
        } finally {
        }
    }
};

export const discardChanges = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: 'DISCARD_CHANGES_SUCCESS', payload: {} });
            //callback();
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
            //callback2();
        } finally {
        }
    }
};

export const saveChanges = (planId, callback) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const updates = getState().swotList.updates;
            const strengths = updates.strengths.map(obj=> ({ "id": isNaN(obj.id) ? obj.id : null, "name": obj.title, "operation": obj.value }));
            const opportunities = updates.opportunities.map(obj=> ({ "id": isNaN(obj.id) ? obj.id : null, "name": obj.title, "operation": obj.value }));

            const postObj = {
                "business_plan_id": planId,
                "opportunities_threats": opportunities,
                "strengths_weakness": strengths
            }

            await kabadaAPI.post('api/swot/update', postObj, { headers: { Authorization: `Bearer ${token}` } });
            if (updates.is_swot_completed !== null) {
                await kabadaAPI.post('api/plans/changeSwotCompleted', { "business_plan_id": planId, "is_swot_completed": updates.is_swot_completed }, { headers: { Authorization: `Bearer ${token}` } });
            }

            if (callback !== null) {
                callback();
            }
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
            //callback2();
        } finally {
        }
    }
};