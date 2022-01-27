import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getFinancialProjectionsCosts = (planId) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try{
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/cost/costsvf/'+planId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_FINANCIAL_PROJECTION_SUCCESS", payload: response.data });
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

export const updateFixedCosts = (inputName,givenValue,record) => {
    return async(dispatch,getState)=>{
        try{
            dispatch({
                type: 'FIXED_COSTS_UPDATE_SUCCESS',
                payload: {name:inputName,value:givenValue, item:record}
            })
        }catch (error) {
            if (error.response === undefined) {
                dispatch({
                    type: "ERROR",
                    payload: { message: "Oopsie... System error. Try again, later" },
                });
            } else {
                dispatch({ type: "ERROR", payload: error.response.data });
            }
        } finally {
        }
    }
}

export const updateVariableCosts = (inputName,givenValue,record)=>{
    return async(dispatch,getState)=>{
        try{
            dispatch({
                type: 'VARIABLE_COSTS_UPDATE_SUCCESS',
               payload: {name:inputName,value:givenValue, item:record}
            })
        }catch (error) {
            if (error.response === undefined) {
                dispatch({
                    type: "ERROR",
                    payload: { message: "Oopsie... System error. Try again, later" },
                });
            } else {
                dispatch({ type: "ERROR", payload: error.response.data });
            }
        } finally {
        }
    }
}

export const discardChanges = () => {
    return async(dispatch,getState)=>{
        dispatch({
            type: 'DISCARD_CHANGES_SUCCESS'
        })
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



export const getBusinessStartUpInvestmentInformation = (planId,callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/kres/investment/' + planId, { headers: { Authorization: `Bearer ${token}` } });
            console.log(response);
            dispatch({ type: "FETCHING_INVESTMENT_SUCCESS", payload: response.data });
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
