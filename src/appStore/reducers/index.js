import { combineReducers } from 'redux';
import languageReducer from './languageReducer';
import authenticationReducer from './authenticationReducer';
import loadingReducer from './loadingReducer';
import messageReducer from './messageReducer';
import { planReducer, planFetchReducer } from './planReducer';
import { industriesReducer, activitiesReducer, industrySelectedReducer, activitySelectedReducer, activitySelectedForEurostatReducer } from './naceReducer';
import { countrySelectedReducer, countriesReducer } from './countryReducer';
import { eurostatDataReducer, eurostatDataReducerProduction, eurostatDataReducerPersonnel } from '../reducers/eurostat/eurostatReducer'

export default combineReducers({
    activities: activitiesReducer,
    businessPlan: planReducer,
    countries: countriesReducer,
    eurostatData: eurostatDataReducer,
    eurostatData2: eurostatDataReducerProduction,
    eurostatDataPersonnel: eurostatDataReducerPersonnel,
    industries: industriesReducer,
    language: languageReducer,
    loading: loadingReducer,
    message: messageReducer,
    selectedActivity: activitySelectedReducer,
    selectedActivityForEurostat: activitySelectedForEurostatReducer,
    selectedCountry: countrySelectedReducer,
    selectedIndustry: industrySelectedReducer,
    user: authenticationReducer,
    savedBusinessPlans: planFetchReducer,
});