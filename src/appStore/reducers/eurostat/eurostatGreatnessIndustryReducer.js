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
            console.log(euActivitiesValuesObj);
            const activityValuesObjValues = Object.values(activityValuesObj);
            const activitylastTwoValues = activityValuesObjValues.slice(-2);
            const activityCompareValue = Math.abs(Math.round(activitylastTwoValues[1] - activitylastTwoValues[0]));
            const activityTimeLabelObjValues = Object.values(activityTimeLabelObj);
            const totalActivitiesValuesObjValues = Object.values(totalActivitiesValuesObj);
            const totalActivitiesLastTwoValues = totalActivitiesValuesObjValues.slice(-2);
            const totalActivitiesCompareValue = Math.abs(Math.round(totalActivitiesLastTwoValues[1] - totalActivitiesLastTwoValues[0]));
            const euActivitiesValuesObjValues = euActivitiesValuesObj !== null ? Object.values(euActivitiesValuesObj) : [];
            const euActivitiesLastTwoValues = euActivitiesValuesObjValues.length > 0 ? euActivitiesValuesObjValues.slice(-2) : [];
            const euActivitiesCompareValue = euActivitiesLastTwoValues.length > 0 ? Math.abs(Math.round(euActivitiesLastTwoValues[1] - euActivitiesLastTwoValues[0])) : null;
            console.log(activityValuesObjValues);
            console.log(totalActivitiesValuesObjValues);
            const activityTimeLabels = (activityTimeLabelObjValues.slice(- activityValuesObjValues.length));
            const Data = [];
            var legendData = '';
    
            var i = activityValuesObjValues.lenght;
            for (const property in activityTimeLabels){
                legendData = activityTimeLabels[property]
                console.log(legendData);
                Data.push({ name: activityTimeLabels[property], uv: '', pv: ''})
            }
            console.log(legendData);
            i = 0 ;
            for (const property in activityValuesObj){
                Data[i].uv = activityValuesObj[property]
                i++;
            }
            i = 0;
            for (const property in totalActivitiesValuesObj){
                Data[i].pv = totalActivitiesValuesObj[property]
                i++;
            }
            console.log(Data);
            
            // i = 0;
            // for (const property in yearObj){
            //     Data[i].name = yearObj[property]
            //     i++
            // }
            //console.log(euActivitiesValuesObjValues);
            // const lastTwoValues = valuesObjValues.slice(-2);
            // const lastValue = lastTwoValues[1];
            // const compareValue = Math.abs(Math.round(lastTwoValues[1] - lastTwoValues[0]));
            const variableTitle = getVariableShortTitle(action.payload.variable)
            console.log(variableTitle)
            const viewObj = {
                variableTitle: variableTitle,
                industry: action.payload.industry,
                geo: action.payload.geo,
                activityValue: activitylastTwoValues, 
                activityProgress: activityCompareValue,
                totalActivitiesValue: totalActivitiesLastTwoValues,
                totalActivitiesProgress: totalActivitiesCompareValue, 
                euActivitiesValue: euActivitiesLastTwoValues,
                euActivitiesProgress: euActivitiesCompareValue,
                data: Data, 
                timeLabels: activityTimeLabels,
                activityValues: activityValuesObjValues,
                totalActivitiesValues: totalActivitiesValuesObjValues,
            }
            console.log(viewObj)
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