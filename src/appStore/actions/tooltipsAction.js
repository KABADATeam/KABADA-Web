import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getTooltips = () => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/Technical/tooltips', { headers: { Authorization: `Bearer ${token}` } });
            console.log(response);
            dispatch({ type: "FETCHING_TOOLTIPS_SUCCESS", payload: response.data});
        }
        finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
}