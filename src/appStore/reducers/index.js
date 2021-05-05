import { combineReducers } from 'redux';
import languageReducer from './languageReducer';
import authenticationReducer from './authenticationReducer';
import loadingReducer from './loadingReducer';
import messageReducer from './messageReducer';
import { planReducer, planFetchReducer, selectedplanFetchReducer, updatePlanReducer, allPublicPlansFetchReducer, allPublicPlansForFilterFetchReducer } from './planReducer';
import { industriesReducer, activitiesReducer, industrySelectedReducer, activitySelectedReducer } from './naceReducer';
import { countrySelectedReducer, countriesReducer } from './countryReducer';
import { eurostatDataReducer } from '../reducers/eurostat/eurostatReducer';
import { eurostatAllDataReducer } from '../reducers/eurostat/eurostatAllReducer'

export default combineReducers({
    activities: activitiesReducer,
    businessPlan: planReducer,
    countries: countriesReducer,
    eurostatData: eurostatDataReducer,
    eurostatAllData: eurostatAllDataReducer,
    industries: industriesReducer,
    language: languageReducer,
    loading: loadingReducer,
    message: messageReducer,
    selectedActivity: activitySelectedReducer,
    selectedCountry: countrySelectedReducer,
    selectedIndustry: industrySelectedReducer,
    user: authenticationReducer,
    savedBusinessPlans: planFetchReducer,
    selectedBusinessPlan: selectedplanFetchReducer,
    updatedPlan: updatePlanReducer,
    publicPlans: allPublicPlansFetchReducer,
    publicPlansForFilter: allPublicPlansForFilterFetchReducer,
});