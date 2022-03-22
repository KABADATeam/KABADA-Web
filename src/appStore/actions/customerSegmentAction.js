import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getCustomerSegmentProperties = () => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/custSegs/codifiers', { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_CUSTOMER_SEGMENT_PROPERTIES_SUCCESS", payload: response.data });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const saveConsumerSegment = (postObject, reducerObj) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/custSegs/updateConsumer', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_CONSUMER_SEGMENT_SUCCESS', payload: { ...reducerObj, "id": response.data, "key": response.data } });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const saveBusinessSegment = (postObject, reducerObj) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/custSegs/updateBusiness', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_BUSINESS_SEGMENT_SUCCESS', payload: { ...reducerObj, "id": response.data, "key": response.data } });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const saveNgoSegment = (postObject, reducerObj) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/custSegs/updatengo', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_NGO_SEGMENT_SUCCESS', payload: { ...reducerObj, "id": response.data, "key": response.data } });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const updateConsumerSegment = (postObject, reducerObj) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/custSegs/updateConsumer', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'UPDATE_CONSUMER_SEGMENT_SUCCESS', payload: reducerObj });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const updateBusinessSegment = (postObject, reducerObj) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/custSegs/updateBusiness', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'UPDATE_BUSINESS_SEGMENT_SUCCESS', payload: reducerObj });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const updateNgoSegment = (postObject, reducerObj) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/custSegs/updatengo', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'UPDATE_NGO_SEGMENT_SUCCESS', payload: reducerObj });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const getCustomerSegments = (planId) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/custSegs/' + planId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_CUSTOMER_SEGMENTS_SUCCESS", payload: response.data });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const deleteConsumerSegment = (obj) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.delete('api/custSegs/cons/' + obj.id, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "REMOVING_CONSUMER_SEGMENT_SUCCESS", payload: obj });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const deleteBusinessSegment = (obj) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.delete('api/custSegs/bus/' + obj.id, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "REMOVING_BUSINESS_SEGMENT_SUCCESS", payload: obj });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const deleteNgoSegment = (obj) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.delete('api/custSegs/ngo/' + obj.id, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "REMOVING_NGO_SEGMENT_SUCCESS", payload: obj });
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
            await kabadaAPI.post('api/plans/changeCustomerSegmentsCompleted', { "business_plan_id": planId, "is_customer_segments_completed": is_completed }, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_STATE_SUCCESS', payload: is_completed });
            callback();
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};

export const getAIValues = (postObject, itemID, segmentType) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true});
        dispatch({ type: 'ERROR_AI_MESSAGE', payload: false});
        dispatch({ type: 'RESET_AI_PREDICT'});
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/plans/predict', postObject, { headers: { Authorization: `Bearer ${token}` } });
            console.log(response.data);
            console.log(postObject)
            console.log(itemID)
            console.log(segmentType);
            dispatch({ type: 'GET_AI_PREDICT_SUCCESS', payload: { data: response.data, itemID: itemID, segments: getState().customerSegmentProperties, segmentType: segmentType}});
        } catch {
            dispatch({ type: 'ERROR_AI_MESSAGE', payload: true});
        } finally {

        }
    }
}

// export const getAIValues = (postObject, itemID) => {
//     return async (dispatch, getState) => {
//         dispatch({ type: "LOADING", payload: true});
//         dispatch({ type: 'ERROR_AI_MESSAGE', payload: false});
//         dispatch({ type: 'RESET_AI_PREDICT'});
//         try {
//             const token = getState().user.access_token;
//             const response = await kabadaAPI.post('api/plans/predict', postObject, { headers: { Authorization: `Bearer ${token}` } });
//             //console.log('Add ',response)
//             dispatch({ type: 'GET_AI_PREDICT_SUCCESS', payload: response.data });
//         } catch {
//             //console.log("Add not work")
//             dispatch({ type: 'ERROR_AI_MESSAGE', payload: true});
//         } finally {

//         }
//     }
// }