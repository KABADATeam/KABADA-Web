import { combineReducers } from 'redux';
import languageReducer from './languageReducer';
import authenticationReducer from './authenticationReducer';
import loadingReducer from './loadingReducer';
import messageReducer from './messageReducer';
import { planReducer } from './planReducer';
import { industriesReducer, activitiesReducer, industrySelectedReducer, activitySelectedReducer, activitySelectedForEurostatReducer } from './naceReducer';
import {countrySelectedReducer, countriesReducer} from './countryReducer';
import {eurostatDataReducer} from '../reducers/eurostat/eurostatReducer'

export default combineReducers({
    activities: activitiesReducer,
    businessPlan: planReducer,
    countries: countriesReducer,
    eurostatData: eurostatDataReducer,
    industries: industriesReducer,
    language: languageReducer,
    loading: loadingReducer,
    message: messageReducer,
    selectedActivity: activitySelectedReducer,
    selectedActivityForEurostat: activitySelectedForEurostatReducer,
    selectedCountry:countrySelectedReducer,
    selectedIndustry: industrySelectedReducer,
    user: authenticationReducer,
});