export const setMessage = (messageText) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'INFO', payload: messageText });
    }
};

export const setError = (messageText) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'ERROR', payload: messageText });
    }
};