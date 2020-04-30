export const changeLanguage = (language) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LANGUAGE_CHANGE_SUCCESS', payload: language });        
    }
};
