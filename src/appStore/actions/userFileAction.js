import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const uploadFile = (file, callback) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/files', file, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'UPLOADING_FILE_SUCCESS', payload: response.data });
            callback();
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });

        } finally {

        }
    }
};