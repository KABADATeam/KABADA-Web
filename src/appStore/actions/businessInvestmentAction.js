import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getBusinessInvestmentInformation = (planId) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/kres/investment/' + planId, { headers: { Authorization: `Bearer ${token}` } });
            console.log(response.data);
            dispatch({ type: "FETCHING_INVESTMENT_SUCCESS", payload: response.data });
        } catch (error) {
            if (error.response === undefined) {
                dispatch({
                    type: "ERROR",
                    payload: { message: "Oopsie... System error. Try again, later" },
                });
            } else {
                dispatch({ type: "ERROR", payload: error.response.data });
            }
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};