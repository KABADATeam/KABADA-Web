import kabadaAPI from './kabadaAPI';

export const login = (email, password) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        try
        {
            const response = await kabadaAPI.post('api/auth/login', { 'Email': email, 'Password': password});
            dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });        
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

export const register = (name, email, password, callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        try
        {
            const response = await kabadaAPI.post('api/auth/register', 
                { 
                    'Name': name, 
                    'Email': email, 
                    'Password': password
                });
            dispatch({ type: 'REGISTER_USER_SUCCESS', payload: response.data });   
            callback();       
        } catch (error) {
            if (error.response === undefined) {
                dispatch({ type: 'ERROR', payload: { message: '' } });
            } else {
                dispatch({ type: 'ERROR', payload: error.response.data });
            }           
        } finally {
            dispatch({ type: 'LOADING', payload: false });
        }
    }
};
