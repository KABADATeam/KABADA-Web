import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getSwotList = (planId,callback) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/swot/' + planId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_SWOT_SUCCESS", payload: response.data });
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

export const updateSwotList = (type, item) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: 'UPDATE_SWOT_LIST_SUCCESS', payload: { "type": type, "item": item } });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const updateCheckedStrenghsAndOportunities = (type, item) => {
    return async (dispatch,getState)=>{
        try {
            console.log(item)
            dispatch({ type: 'UPDATE_CHECKED_STRENGHTS_OPORTUNITIES_SUCCESS', payload: { "type": type, "item": item } });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
}

export const createNewItem = (type, item) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/swot/save', item, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'CREATE_NEW_ITEM_SUCCESS', payload: { "type": type, "item": { "key": response.data, "id": response.data, "title": '', description: '', "value": 0, "isLocal": true } } });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const updateItem = (type, item) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/swot/save', item, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'UPDATE_ITEM_SUCCESS', payload: { "type": type, "item": { "key": item.swot.id, "id": item.swot.id, "title": item.swot.name, description: '', "value": item.swot.operation, "isLocal": true } } });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const discardChanges = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: 'DISCARD_CHANGES_SUCCESS', payload: {} });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const saveChanges = (planId, callback) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const updates = getState().swotList.updates;
            const strengths = updates.strengths.map(obj=> ({ "id": obj.id, "name": obj.title, "operation": obj.value }));
            const opportunities = updates.opportunities.map(obj=> ({ "id": obj.id, "name": obj.title, "operation": obj.value }));

            const postObj = {
                "business_plan_id": planId,
                "opportunities_threats": opportunities,
                "strengths_weakness": strengths
            }

            await kabadaAPI.post('api/swot/update', postObj, { headers: { Authorization: `Bearer ${token}` } });

            if (callback !== null) {
                callback();
            }
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const saveState = (planId, is_completed, callback) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/plans/changeSwotCompleted', { "business_plan_id": planId, "is_swot_completed": is_completed }, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_STATE_SUCCESS', payload: is_completed });
            callback();
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const deleteItem = (type, item) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const id = type === 1 ? item.strengths_weakness[0].id : item.opportunities_threats[0].id;
            await kabadaAPI.post('api/swot/update', item, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'DELETE_ITEM_SUCCESS', payload: { "type": type, "id": id } });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const getSwotAI = (postObject) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/plans/predict', postObject, { headers: { Authorization: `Bearer ${token}` } });
            console.log(response.data.plan.swot);
            dispatch({ type: 'GET_AI_SWOT_PREDICT_SUCCESS', payload: response.data.plan.swot });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const setSwotOpportunitiesAIPredict = () => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const aiPredict = getState().swotList.swotAIPredict.opportunities;
            const userInsertedData = {
                original: getState().swotList.original.oportunities_threats,
                updates: getState().swotList.updates.opportunities
            }
            console.log(aiPredict);
            console.log(userInsertedData)
            dispatch({ type: 'SET_SWOT_OPPORTUNITIES_AI_PREDICT', payload: {predict: aiPredict, userData: userInsertedData } })
        } catch {

        } finally {

        }
    }
}
