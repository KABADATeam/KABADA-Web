import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const saveInitialPlanData = (title, activityId, countryId, callback, callback2) => {
    return async (dispatch, getState) => {
        //dispatch({ type: 'LOADING', payload: true });
        try
        {
            const token = getState().user.access_token;
            const postObject = {
                'Title': title,
                'ActivityId': activityId,
                'CountryId': countryId
            }
            const response = await kabadaAPI.post('api/plans', postObject, { headers: { Authorization: `Bearer ${token}` }});
            dispatch({ type: 'SAVING_PLAN_SUCCESS', payload: response.data });  
            callback();     
        } catch (error) {
            dispatch( { type: 'ERROR', payload: errorHandler(error) });
            callback2();
        } finally {
            //dispatch({ type: 'LOADING', payload: false });
        }
    }
};