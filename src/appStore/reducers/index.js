import { combineReducers } from 'redux';
import languageReducer from './languageReducer';
import authenticationReducer from './authenticationReducer';
import loadingReducer from './loadingReducer';
import messageReducer from './messageReducer';
import { privatePlansReducer, selectedplanFetchReducer, updatePlanReducer, allPublicPlansFetchReducer } from './planReducer';
import { industriesReducer, activitiesReducer, industrySelectedReducer, activitySelectedReducer } from './naceReducer';
import { countrySelectedReducer, countriesReducer } from './countryReducer';
import { eurostatDataReducer } from '../reducers/eurostat/eurostatReducer';
import { eurostatAllDataReducer } from '../reducers/eurostat/eurostatAllReducer';
import { userSettingsReducer } from './settingsReducer';
import { swotReducer } from './swotReducer';
import { resourcesReducer, resourcesCategoriesReducer, selectedCategoryReducer, selectedResourceReducer } from './resourcesReducer';
import { partnersReducer, partnersCategoriesReducer, selectedPartnersCategoryReducer, selectedPartnersCategoryTypeReducer } from './partnersReducer';
import { fileReducer } from './userFileReducer';
import { planLanguagesReducer } from './planLanguageReducer';
import { productTypesReducer, productReducer, productFeatureLevelsReducer, additionalIncomeSourcesReducer, productFeaturesReducer, productsReducer } from './productReduces';
import { revenueTypesReducer, revenuesReducer } from './revenueStreamsReducer';
import { costStructureReducer, costStructureCategoriesReducer, selectedCostCategoryReducer } from './costStructureReducer'
import { channelTypesReducer, channelsReducer } from './channelsReducer';
import { customerSegmentReducer, customerSegmentPropertiesReducer } from './customerSegmentReducer';
import { customerRelationshipsCategoriesReducer, customerRelationshipsReducer } from './customerRelationshipsReducer'

export default combineReducers({
    activities: activitiesReducer,
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
    personalBusinessPlans: privatePlansReducer,
    selectedBusinessPlan: selectedplanFetchReducer,
    updatedPlan: updatePlanReducer,
    publicPlans: allPublicPlansFetchReducer,
    userSettings: userSettingsReducer,
    swotList: swotReducer,
    resourcesList: resourcesReducer,
    resourcesCategoriesList: resourcesCategoriesReducer,
    selectedResourcesCategory: selectedCategoryReducer,
    selectedResource: selectedResourceReducer,
    uploadedFile: fileReducer,
    planLanguages: planLanguagesReducer,
    partners: partnersReducer,
    partnersCategories: partnersCategoriesReducer,
    selectedPartnersCategory: selectedPartnersCategoryReducer,
    selectedPartnersCategoryType: selectedPartnersCategoryTypeReducer,
    productTypes: productTypesReducer,
    product: productReducer,
    productFeaturesLevels: productFeatureLevelsReducer,
    additionalIncomeSources: additionalIncomeSourcesReducer,
    productFeatures: productFeaturesReducer,
    products: productsReducer,
    revenueTypes: revenueTypesReducer,
    revenues: revenuesReducer,
    costStructure: costStructureReducer,
    costCategoriesList: costStructureCategoriesReducer,
    selectedCostCategory: selectedCostCategoryReducer,
    channels: channelsReducer,
    channelTypes: channelTypesReducer,
    customerSegmentProperties: customerSegmentPropertiesReducer,
    customerSegments: customerSegmentReducer,
    customerRelationshipsCategories: customerRelationshipsCategoriesReducer,
    customerRelationships: customerRelationshipsReducer,
});