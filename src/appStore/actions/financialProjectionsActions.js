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

//country(string) for ex. "LT"
export const getCountryVat = (countryCode,callback) => {
    return async(dispatch, getState) =>{
        dispatch({ type: "LOADING", payload: true });
        try{
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/cost/vat/'+countryCode, {headers: {Authorization: `Bearer ${token}` }});
            dispatch({ type: "FETCHING_FINANCIAL_PROJECTION_VAT_SUCCESS", payload: response.data });
            callback()
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
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/cost/costsvf/save', postObject, {headers: {Authorization: `Bearer ${token}` }});
            dispatch({type: 'SAVE_FINANCIAL_PROJECTION_COST_SUCCESS', payload: {...reducerObject, "id": response.data, "key": response.data}});
        }catch(error){
            dispatch({type: "LOADING", payload: false})
        }
        finally{

        }
    }
}

export const updateFinansialProjectionCost = (postObject) => {
    return async(dispatch, getState)=>{
        try{
            const token = getState().user.access_token;
            await kabadaAPI.post('api/cost/costsvf/save', obj, {headers: {Authorization: `Bearer ${token}` }});
            const obj = {
                "cost_item_id":postObject.cost_item_id,
                "type_title": postObject.type_title,
                "type_id": postObject.type_id,
                "price" : postObject.price,
                "vat" : postObject.vat,
                "first_expenses": postObject.first_expenses,
            }
            dispatch({type: 'UPDATE_FINANCIAL_PROJECTION_COST_SUCCESS', payload: obj});
        }
        finally{
            dispatch({type: 'LOADING', payload: false})
        }
    }
}
