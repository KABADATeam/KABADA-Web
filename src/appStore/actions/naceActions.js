import kabadaAPI from './kabadaAPI';

export const getIndustries = (language) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        try
        {
            const response = await kabadaAPI.get('https://localhost:5001/api/NACE/industry/of/' + language);
            dispatch({ type: 'FETCHING_INDUSTRIES_SUCCESS', payload: response.data });       
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

export const getActivities = (language, industry) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        try
        {
            const response = await kabadaAPI.get('https://localhost:5001/api/NACE/activity/of/' + language + '/' + industry);
            dispatch({ type: 'FETCHING_ACTIVITIES_SUCCESS', payload: response.data });       
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
export const selectIndustry = (industry) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        try
        {
            
            dispatch({ type: 'INDUSTRY_SELECT_SUCCESS', payload: industry });       
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
export const selectActivity = (activity) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        try
        {
            
            dispatch({ type: 'ACTIVITY_SELECT_SUCCESS', payload: activity });       
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