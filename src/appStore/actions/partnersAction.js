import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getPartners = (planId) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/par/' + planId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_PARTNERS_SUCCESS", payload: response.data });
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

export const getPartnersCategories = () => {
    return async (dispatch, getState) => {
        try {
            const response = await kabadaAPI.get('api/par/categories');
            dispatch({ type: "FETCHING_PARTNERS_CATEGORIES_SUCCESS", payload: response.data });
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

export const selectCategory = (title, items, callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: "SELECTING_PARTNERS_CATEGORY_SUCCESS", payload: { title, items } });
        callback();
    };
};

export const selectCategoryType = (title, type, callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: "SELECTING_PARTNERS_CATEGORY_TYPE_SUCCESS", payload: { category_title: title, ...type } });
        callback();
    };
};


export const deleteDistributor = (id) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.delete("api/par/distr/" + id, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "REMOVING_DISTRIBUTOR_SUCCESS", payload: id });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const deleteSupplier = (id) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.delete("api/par/suppl/" + id, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "REMOVING_SUPPLIER_SUCCESS", payload: id });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const deleteOther = (id) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.delete("api/par/other/" + id, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "REMOVING_OTHER_SUCCESS", payload: id });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const saveDistributor = (postObject, type_title) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/par/distr/save', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_DISTRIBUTOR_SUCCESS', payload: { ...postObject, "id": response.data, "key": response.data, "priority": postObject.is_priority === false ? 'No' : 'Yes', type_title } });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
            //callback2();
        } finally {
        }
    }
};

export const saveSupplier = (postObject, type_title) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/par/suppl/save', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_SUPPLIER_SUCCESS', payload: { ...postObject, "id": response.data, "key": response.data, "priority": postObject.is_priority === false ? 'No' : 'Yes', type_title  } });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const saveOther = (postObject, type_title) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/par/other/save', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_OTHER_SUCCESS', payload: { ...postObject, "id": response.data, "key": response.data, "priority": postObject.is_priority === false ? 'No' : 'Yes', type_title  } });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
            //callback2();
        } finally {
        }
    }
};

export const updateDistributor = (postObject, type_title) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/par/distr/save', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'UPDATE_DISTRIBUTOR_SUCCESS', payload: { ...postObject, "key": postObject.id, "priority": postObject.is_priority === false ? 'No' : 'Yes', type_title } });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const updateSupplier = (postObject, type_title) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/par/suppl/save', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'UPDATE_SUPPLIER_SUCCESS', payload: { ...postObject, "key": postObject.id, "priority": postObject.is_priority === false ? 'No' : 'Yes', type_title  } });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const updateOther = (postObject, type_title) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/par/other/save', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'UPDATE_OTHER_SUCCESS', payload: { ...postObject, "key": postObject.id, "priority": postObject.is_priority === false ? 'No' : 'Yes', type_title  } });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const saveState = (planId, is_completed) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/plans/changePartnersCompleted', { "business_plan_id": planId, "is_partners_completed": is_completed }, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_STATE_SUCCESS', payload: is_completed });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
            //callback2();
        } finally {
        }
    }
};

