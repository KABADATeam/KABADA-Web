import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getFinancialProjectionsCostsList = (planId) => {
    return async(dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try{
            const token = getState().user.access.token;
            const response = await kabadaAPI.get('api/costsvf/'+planId, {headers: {Authorization: `Bearer ${token}` }});
            dispatch({ type: "FETCHING_FINANCIAL_PROJECTION_SUCCESS", payload: response.data });
        }catch(error){
            if(error.response === undefined){
                dispatch({
                    type: "ERROR",
                    payload: {message : "Oopsie... System error. Try again, later"}
                });
            }else{
                dispatch({
                    type: "ERROR", payload: error.response.data
                });
            }
        }
        finally{
            dispatch({type: "LOADING", payload: false})
        }
    }
}
//country(string) for ex. "LT"
export const getCountryVat = (countryCode) => {
    return async(dispatch, getState) =>{
        dispatch({ type: "LOADING", payload: true });
        try{
            const token = getState().user.access.token;
            const response = await kabadaAPI.get('api/cost/vat/'+countryCode, {headers: {Authorization: `Bearer ${token}` }});
            dispatch({ type: "FETCHING_FINANCIAL_PROJECTION_VAT_SUCCESS", payload: response.data });
        }catch(error){
            if(error.response === undefined){
                dispatch({
                    type: "ERROR",
                    payload: {message: "Oopsie... System error. Try again, later"}
                });
            }else{
                dispatch({
                    type: "ERROR",
                    payload: error.response.data
                });
            }
        }
        finally{
            dispatch({type: "LOADING", payload: false})
        }
    }
}

export const saveFinansialProjectionsCost = (postObject, reducerObject) => {
    return async(dispatch, getState) => {
        try{
            const token = getState().user.access.token;
            console.log(postObject);
            const response = await kabadaAPI.post('api/cost/costsvf/save', postObject, {headers: {Authorization: `Bearer ${token}` }});
            dispatch({type: 'SAVE_FINANCIAL_PROJECTION_COST_SUCCESS', payload: {...reducerObject, "id": response.data, "key": response.data}})
        }catch(error){
            dispatch({type: "LOADING", payload: false})
        }
        finally{

        }
    }
}
