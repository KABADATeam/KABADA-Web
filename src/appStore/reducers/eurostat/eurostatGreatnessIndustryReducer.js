const getVariableShortTitle = (variable) => {
    if (variable === 'V11110') {
        let variableTitle = 'Enterprices'
        return variableTitle
    } else if (variable === 'V12110') {
        let variableTitle = 'Turnover'
        return variableTitle
    } else if (variable === 'V15110') {
        let variableTitle = 'Gross investment'
        return variableTitle
    } else if (variable === 'V16140') {
        let variableTitle = 'Employees in full time'
        return variableTitle
    }
}

const getUnitMeasurePercentage = (variable, penultimateValue, lastValue) => {
    if (variable === 'V11110') {
        let percentage = Math.abs(Math.round(((penultimateValue-lastValue)/penultimateValue)*100));
        return percentage
    } else if (variable === 'V12110') {
        let percentage = Math.abs(Math.round(((penultimateValue-lastValue)/penultimateValue)*100));
        return percentage
    } else if (variable === 'V15110') {
        let percentage = Math.abs(Math.round(((penultimateValue-lastValue)/penultimateValue)*100));
        return percentage
    } else if (variable === 'V16140') {
        let percentage = Math.abs(Math.round(((penultimateValue-lastValue)/penultimateValue)*100));
        return percentage
    }
}

const getUnitOfMeasurement = (variable) => {
    if (variable === 'V11110') {
        let variableTitle = ''
        return variableTitle
    } else if (variable === 'V12110') {
        let variableTitle = 'M'
        return variableTitle
    } else if (variable === 'V15110') {
        let variableTitle = 'M'
        return variableTitle
    } else if (variable === 'V16140') {
        let variableTitle = ''
        return variableTitle
    }
}

export const eurostatGreatnessIndustryReducer = (
    state = {
        greatness_industry_data: []
    }, action) => {
    switch (action.type) {
        case 'FETCHING_GREATNESS_INDUSTRY_FOR_COUNTRY_EUROSTATDATA_SUCCESS':
            console.log(action.payload);
            const activityValuesObj = JSON.parse(JSON.stringify(action.payload.activityData)).value;
            const activityTimeLabelObj = JSON.parse(JSON.stringify(action.payload.activityData)).dimension.time.category.label;
            const totalActivitiesValuesObj = JSON.parse(JSON.stringify(action.payload.totalActivitiesData)).value;
            const euActivitiesValuesObj = JSON.parse(JSON.stringify(action.payload.euActivitiesData)).value === undefined ? null : JSON.parse(JSON.stringify(action.payload.euActivitiesData)).value;
            const activityValuesObjValues = Object.values(activityValuesObj);
            const activitylastTwoValues = activityValuesObjValues.slice(-2);
            const activityTimeLabelObjValues = Object.values(activityTimeLabelObj);
            const totalActivitiesValuesObjValues = Object.values(totalActivitiesValuesObj);
            const totalActivitiesLastTwoValues = totalActivitiesValuesObjValues.slice(-2);
            const euActivitiesValuesObjValues = euActivitiesValuesObj !== null ? Object.values(euActivitiesValuesObj) : [];
            const euActivitiesLastTwoValues = euActivitiesValuesObjValues.length > 0 ? euActivitiesValuesObjValues.slice(-2) : [];
            const activityTimeLabels = (activityTimeLabelObjValues.slice(- activityValuesObjValues.length));
            const variableTitle = getVariableShortTitle(action.payload.variable);
            const unitOfMeasure = getUnitOfMeasurement(action.payload.variable);
            const activityProgressPercentage = getUnitMeasurePercentage(action.payload.variable, activitylastTwoValues[0], activitylastTwoValues[1]);
            const totalActivitiesProgressPercentage = getUnitMeasurePercentage(action.payload.variable, totalActivitiesLastTwoValues[0], totalActivitiesLastTwoValues[1]);
            const euActivitiesProgressPercentage = getUnitMeasurePercentage(action.payload.variable, euActivitiesLastTwoValues[0], euActivitiesLastTwoValues[1]);
            const viewObj = {
                variableTitle: variableTitle,
                industry: action.payload.industry,
                geo: action.payload.geo,
                geoTitle: action.payload.geoTitle,
                activityValue: activitylastTwoValues, 
                activityProgress: activityProgressPercentage,
                totalActivitiesValue: totalActivitiesLastTwoValues,
                totalActivitiesProgress: totalActivitiesProgressPercentage, 
                euActivitiesValue: euActivitiesLastTwoValues,
                euActivitiesProgress: euActivitiesProgressPercentage,
                unitOfMeasure: unitOfMeasure,
                timeLabels: activityTimeLabels,
                activityValues: activityValuesObjValues,
                totalActivitiesValues: totalActivitiesValuesObjValues,
            }
            return {
                ...state,
                greatness_industry_data: [...state.greatness_industry_data, viewObj]
            }
        case 'RESET_GREATNESS_DATA':
            return {
                ...state,
                greatness_industry_data: []
            };
        default:
            return state;
    }
}