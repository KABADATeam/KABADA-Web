import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';


export const getAssets = (planId) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        dispatch({ type: "RESET_ASSETS", payload: null})
        try {
            const token = getState().user.access_token;
            const defaultVATValue = getState().vat.defaultVAT;
            console.log(defaultVATValue);
            const response = await kabadaAPI.get('api/kres/assets/' + planId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_ASSETS_SUCCESS", payload: {data: response.data, defaultVAT: defaultVATValue} });
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

export const saveChanges = (planId, callback) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const updates = getState().assets
            const postObject = {
                business_plan_id: planId,
                total_investments: updates.total_investments,
                own_assets: updates.own_assets,
                investment_amount: updates.investment_amount,
                physical_assets: updates.physical_assets_updated
            }
            console.log(postObject);
            await kabadaAPI.post('/api/kres/assets/save', postObject, { headers: { Authorization: `Bearer ${token}` } })
            if (callback !== null) {
                callback();
            }
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

export const updateAssetsItemAmount = (value, obj) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: 'UPDATE_ASSETS_ITEM_AMOUNT', payload: {"value": value, "asset": obj}})
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error)})
        } finally {
        }
    }
}
export const updateAssetsItemVat = (value, obj) => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: 'UPDATE_ASSETS_ITEM_VAT', payload: {"value": value, "asset": obj}})
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error)})
        } finally {
        }
    }
}
export const saveState = (planId, is_completed, callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/plans/changeAssetsCompleted', { "business_plan_id": planId, "is_assets_completed": is_completed }, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_STATE_SUCCESS', payload: is_completed });
            callback();
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};