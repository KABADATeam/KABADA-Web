import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getCountryVats = (countryCode, callback) => {
    return async(dispatch, getState) =>{
        dispatch({ type: "LOADING", payload: true });
        try{
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/cost/vat/'+countryCode, {headers: {Authorization: `Bearer ${token}` }});
            console.log(response.data);
            dispatch({ type: "FETCHING_COUNTRY_VAT_SUCCESS", payload: response.data });
            callback();
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