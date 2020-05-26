import { combineReducers } from 'redux';
import languageReducer from './languageReducer';
import authenticationReducer from './authenticationReducer';
import loadingReducer from './loadingReducer';
import errorReducer from './errorReducer';
import { industryReducer, activityReducer, industrySelectedReducer, activitySelectedReducer, activitySelectedForEurostatReducer } from './naceReducer';
import {countrySelectedReducer, countriesReducer} from './countryReducer';
import {eurostatDataReducer} from '../reducers/eurostat/eurostatReducer'

export default combineReducers({
    activities: activityReducer,
    countries: countriesReducer,
    error: errorReducer,
    eurostatData: eurostatDataReducer,
    industries: industryReducer,
    language: languageReducer,
    loading: loadingReducer,
    selectedActivity: activitySelectedReducer,
    selectedActivityForEurostat: activitySelectedForEurostatReducer,
    selectedCountry:countrySelectedReducer,
    selectedIndustry: industrySelectedReducer,
    user: authenticationReducer,
});