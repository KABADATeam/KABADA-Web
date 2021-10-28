import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getFinancialProjectionsCosts = (planId,callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try{
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/cost/costsvf/'+planId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_FINANCIAL_PROJECTION_SUCCESS", payload: response.data });
            callback()
        }catch(error){
            if (error.response === undefined) {
                dispatch({
                    type: "ERROR",
                    payload: { message: "Oopsie... System error. Try again, later" },
                });
            }else{
                dispatch({
                    type: "ERROR", payload: error.response.data
                });
            }
        }
        finally{
            dispatch({ type: "LOADING", payload: false });
        }
    }
}

export const updateFixedAndVarCosts = (postObject) => {
    return async(dispatch, getState)=>{
        try{
            const token = getState().user.access_token;
            await kabadaAPI.post('api/cost/costsvf/save', postObject, {headers: {Authorization: `Bearer ${token}` }});
            dispatch({type: 'UPDATE_FIXED_AND_VAR_COSTS_SUCCESS', payload: {postObject}});
        }
        finally{
            dispatch({type: 'LOADING', payload: false})
        }
    }
}

export const saveState = (planId, is_completed, callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/plans/changeFixedVariableCompleted', { "business_plan_id": planId, "is_fixed_variable_completed": is_completed }, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_STATE_SUCCESS', payload: is_completed });
            callback();
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};
