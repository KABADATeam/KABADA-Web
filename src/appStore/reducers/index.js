import { combineReducers } from 'redux';
import languageReducer from './languageReducer';
import authenticationReducer from './authenticationReducer';
import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';
import { industryReducer, activityReducer, industrySelectedReducer, activitySelectedReducer } from './naceReducer';
import {countrySelectedReducer, countriesReducer} from './countryReducer';

export default combineReducers({
    activities: activityReducer,
    countries: countriesReducer,
    error: errorReducer,
    industries: industryReducer,
    language: languageReducer,
    loading: loadingReducer,
    selectedActivity: activitySelectedReducer,
    selectedCountry:countrySelectedReducer,
    selectedIndustry: industrySelectedReducer,
    user: authenticationReducer,
});