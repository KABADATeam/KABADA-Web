import eurostatAPI from './eurostatAPI';

export const getEurostatData = () => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        try
        {
            const response = await eurostatAPI.get('sbs_sc_sca_r2?sinceTimePeriod=2012&precision=1&size_emp=TOTAL&geo=LT&indic_sb=V11110&nace_r2=C10');
            dispatch({ type: 'FETCHING_EUROSTATDATA_SUCCESS', payload: response.data });       
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