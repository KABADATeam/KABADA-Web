import kabadaAPI from './kabadaAPI';

export const getCountries = (language) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        try
        {
            const response = await kabadaAPI.get('api/countries/countriesList/' + language);
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