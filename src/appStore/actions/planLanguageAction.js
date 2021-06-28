import kabadaAPI from './kabadaAPI';

export const getPlanLanguages = () => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        try {
            const response = await kabadaAPI.get('api/languages');
            dispatch({ type: 'PLAN_LANGUAGES_FETCH_SUCCESS', payload: response.data });
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
