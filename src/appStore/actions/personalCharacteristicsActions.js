import kabadaAPI from './kabadaAPI';

export const getPersonalCharacteristics = (planId,callback) => async(dispatch, getState) => {
    try {
        dispatch({
            type: 'LOADING',
            payload: true
        });
        //getting token
        const token = getState().user.access_token;
        const response = await kabadaAPI.get('api/quest/personal/' + planId, { headers: { Authorization: `Bearer ${token}` } });
        // dispatch({ type: "FETCHING_PARTNERS_SUCCESS", payload: response.data });
        dispatch({
            type: 'FETCHING_PERSONAL_CHARACTERISTICS_SUCCESS',
            payload: response.data
        });
        console.log('GOT personal characteristics:'+JSON.stringify(response.data))
        callback();
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


export const savePersonalCharacteristics = (postObject,callback) => async(dispatch,getState) => {
    try{
        dispatch({
            type: 'LOADING',
            payload: true
        });
        //get token from user redux state
        const token = getState().user.access_token;
        const response = await kabadaAPI.post('api/quest/personal/save', postObject, {headers: {Authorization: `Bearer ${token}`}})
        dispatch({
            type: 'SAVE_PERSONAL_CHARACTERISTICS_SUCCESS',
            payload: response.data
        });
        console.log('Added personal characteristics:'+JSON.stringify(response.data))
        callback();
    }catch (error) {
        if (error.response === undefined) {
            dispatch({ type: 'ERROR', payload: { message: 'Oopsie... System error. Try again, later' } });
        } else {
            dispatch({ type: 'ERROR', payload: error.response.data });
        }
    } finally {
        dispatch({ type: 'LOADING', payload: false });
    }
}