

export const eurostatGreatnessIndustryReducer = (
    state = {
        greatness_industry_data: []
    }, action) => {
    switch (action.type) {
        case 'FETCHING_GREATNESS_INDUSTRY_FOR_COUNTRY_EUROSTATDATA_SUCCESS':
            console.log(action.payload);
            const activityValuesObj = JSON.parse(JSON.stringify(action.payload.activityData)).value;
            console.log(activityValuesObj);
            const totalActivitiesValuesObj = JSON.parse(JSON.stringify(action.payload.totalActivitiesData)).value;
            console.log(totalActivitiesValuesObj);
            const euActivitiesValuesObj = JSON.parse(JSON.stringify(action.payload.euActivitiesData)).value;
            console.log(euActivitiesValuesObj);
            // const valuesObjValues = Object.values(valuesObj);
            // const lastTwoValues = valuesObjValues.slice(-2);
            // const lastValue = lastTwoValues[1];
            // const compareValue = Math.abs(Math.round(lastTwoValues[1] - lastTwoValues[0]));

            // const viewObj = {
            //     title: 'Name',
            //     lastValue: lastTwoValues,
            //     compareValue: compareValue
            // }

            return {
                ...state,
                geoTitle: action.payload.geoTitle,
                activityCode: action.payload.activityCode,
            }
        case 'RESET_GREATNESS_DATA':
            return {
                ...state,
                survival_rate_data: []
            };
        default:
            return state;
    }
}