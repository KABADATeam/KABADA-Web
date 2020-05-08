import { combineReducers } from 'redux';
import languageReducer from './languageReducer';
import authenticationReducer from './authenticationReducer';
import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';
import { industryReducer, activityReducer } from './naceReducer';

export default combineReducers({
    activities: activityReducer,
    error: errorReducer,
    industries: industryReducer,
    language: languageReducer,
    loading: loadingReducer,
    user: authenticationReducer
});