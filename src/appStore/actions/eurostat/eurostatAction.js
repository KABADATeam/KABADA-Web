import eurostatAPI from './eurostatAPI';

export const getEurostatDataEnterprisesNumber = (country, activityForEurostat) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        try
        {
            const response = await eurostatAPI.get(`sbs_na_sca_r2?sinceTimePeriod=2010&precision=1&geo=${country}&indic_sb=V11110&nace_r2=${activityForEurostat}`);
            //sbs_sc_sca_r2?sinceTimePeriod=2012&precision=1&size_emp=TOTAL&geo=$&indic_sb=V11110&nace_r2=${activityForEurostat}
            //`sbs_na_sca_r2?sinceTimePeriod=2010&precision=1&geo=PT&indic_sb=V11110&nace_r2=C13`
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
export const getEurostatDataProductionValue = (country, activityForEurostat) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        try
        {
            const response = await eurostatAPI.get(`sbs_na_sca_r2?sinceTimePeriod=2010&precision=1&geo=${country}&indic_sb=V12120&nace_r2=${activityForEurostat}`);
            //sbs_sc_sca_r2?sinceTimePeriod=2012&precision=1&size_emp=TOTAL&geo=$&indic_sb=V11110&nace_r2=${activityForEurostat}
            dispatch({ type: 'FETCHING_EUROSTATDATA_SUCCESS_PRODUCTION_VALUE', payload: response.data });       
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
export const getEurostatDataPersonnelCosts = (country, activityForEurostat) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        try
        {
            const response = await eurostatAPI.get(`sbs_na_sca_r2?sinceTimePeriod=2010&precision=1&geo=${country}&indic_sb=V13310&nace_r2=${activityForEurostat}`);
            //sbs_sc_sca_r2?sinceTimePeriod=2012&precision=1&size_emp=TOTAL&geo=$&indic_sb=V11110&nace_r2=${activityForEurostat}
            dispatch({ type: 'FETCHING_EUROSTATDATA_SUCCESS_PERSONNEL_VALUE', payload: response.data });       
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
//'sbs_sc_sca_r2?sinceTimePeriod=2012&precision=1&size_emp=TOTAL&geo=' + country + '&indic_sb=V11110&nace_r2=' + activity
//`sbs_sc_sca_r2?sinceTimePeriod=2012&precision=1&size_emp=TOTAL&geo=${country}&indic_sb=V11110&nace_r2=${activity}`