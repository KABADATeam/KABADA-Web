import kabadaAPI from './kabadaAPI';

export const getCountries = () => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        try
        {
            const response = await kabadaAPI.get('api/countries' );
            dispatch({ type: 'COUNTRIES_FETCH_SUCCESS', payload: response.data });       
        } catch (error) {
            if (error.response === undefined) {
                dispatch({ type: 'ERROR', payload: { message: 'Oopsie... System error. Try again, later' } });
            } else {
                dispatch({ type: 'ERROR', payload: error.response.data });
            }            
        } finally {
            dispatch({ type: 'LOADING', payload: false });
        }
    }
};

export const selectCountry = (country) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        try
        {
            dispatch({ type: 'COUNTRY_CHANGE_SUCCESS', payload: country });       
        } catch (error) {
            if (error.response === undefined) {
                dispatch({ type: 'ERROR', payload: { message: 'Oopsie... System error. Try again, later' } });
            } else {
                dispatch({ type: 'ERROR', payload: error.response.data });
            }            
        } finally {
            dispatch({ type: 'LOADING', payload: false });
        }
    }
};

export const getCountryShortCode = (postObject,callback) => {
    return async(dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true })
        try{
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/plans/fetch', postObject, {headers: {Authorization: `Bearer ${token}` }});
            dispatch({type: 'FETCH_SHORT_COUNTRY_CODE', payload: response.data});
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
//action without callback function, using in the Overview.js file
export const getCountryShortCodeV2 = (postObject) => {
    return async(dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true })
        try{
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/plans/fetch', postObject, {headers: {Authorization: `Bearer ${token}` }});
            dispatch({type: 'FETCH_SHORT_COUNTRY_CODE_V2', payload: response.data});
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