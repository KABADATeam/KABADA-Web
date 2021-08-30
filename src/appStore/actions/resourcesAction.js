import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getResourcesList = (planId) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/kres/' + planId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_RESOURCES_SUCCESS", payload: response.data });
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

export const getResourcesCategoriesList = () => {
    return async (dispatch, getState) => {
        try {
            const response = await kabadaAPI.get('api/kres/categories');
            dispatch({ type: "FETCHING_RESOURCES_CATEGORIES_SUCCESS", payload: response.data });
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

export const selectCategory = (item, callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: "SELECTING_RESOURCES_CATEGORY_SUCCESS", payload: item });
        callback();
    };
};


export const deleteItem = (id) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.delete("api/kres/" + id, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "REMOVING_RESOURCE_SUCCESS", payload: id });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
            //callback2();
        } finally {
        }
    }
};

export const saveResource = (postObject, category) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/kres/update', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_RESOURCE_SUCCESS', payload: { ...postObject, "resource_id": response.data, "type_id": postObject.resource_type_id, "key": response.data,
                "category" : {
                    "description": category.title,
                    "id": category.id,
                    "title": category.description
                }
            } });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
            //callback2();
        } finally {
        }
    }
};

export const updateResource = (postObject, category) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/kres/update', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'UPDATE_RESOURCE_SUCCESS', payload: { ...postObject, "key": postObject.resource_id, "type_id": postObject.resource_type_id,
                "category" : {
                    "description": category.title,
                    "id": category.id,
                    "title": category.description
                }
            } });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
            //callback2();
        } finally {
        }
    }
};

export const saveChanges = (planId, is_completed, callback) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/plans/changeResourcesCompleted', { "business_plan_id": planId, "is_resources_completed": is_completed }, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_CHANGES_SUCCESS', payload: is_completed });
            callback();
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
            //callback2();
        } finally {
        }
    }
};

export const saveEditable = (item) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: 'SAVE_EDITABLE_SUCCESS', payload: item });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
            //callback2();
        } finally {
        }
    }
};
