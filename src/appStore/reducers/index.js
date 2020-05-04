import { combineReducers } from 'redux';
import languageReducer from './languageReducer';
import authenticationReducer from './authenticationReducer';
import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';

export default combineReducers({
    error: errorReducer,
    language: languageReducer,
    loading: loadingReducer,
    user: authenticationReducer
});