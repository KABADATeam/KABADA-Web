export const eurostatSurvivalRateReducer = (
    state = {
        survival_rate_data: []
    }, action) => {
    switch (action.type) {
        case 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_EUROSTATDATA_SUCCESS':
            console.log(action.payload);
            const valuesObj = JSON.parse(JSON.stringify(action.payload.data)).value;
            const valuesObjValues = Object.values(valuesObj);
            const lastTwoValues = valuesObjValues.slice(-2);
            //const lastValue = lastTwoValues[1];
            //const compareValue = Math.abs(Math.round(lastTwoValues[1] - lastTwoValues[0]));
            const viewObj = {
                id: 1,
                title: 'Your industry in ' + action.payload.geoTitle + ' (' + action.payload.industry + ')',
                lastValues: lastTwoValues,
            }
            console.log(viewObj);
            const test = [...state.survival_rate_data, viewObj]
            console.log(test);
            return {
                ...state,
                survival_rate_data: [...state.survival_rate_data, viewObj]
            }
        case 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_TOTAL_EUROSTATDATA_SUCCESS':
            console.log(action.payload);
            const _valuesObj = JSON.parse(JSON.stringify(action.payload.data)).value;
            const _valuesObjValues = Object.values(_valuesObj);
            const _lastTwoValues = _valuesObjValues.slice(-2);
            const _compareValue = Math.abs(Math.round(_lastTwoValues[1] - _lastTwoValues[0]));
            const _viewObj = {
                id: 2,
                title: 'All industries in ' + action.payload.geoTitle,
                lastValues: _lastTwoValues,
            }
            console.log(_viewObj)
            return {
                ...state,
                survival_rate_data: [...state.survival_rate_data, _viewObj]
            }
        case 'FETCHING_SURVIVAL_RATE_FOR_ALL_EUROPE_EUROSTATDATA_SUCCESS':
            console.log(action.payload);
            const valuesObj_ = JSON.parse(JSON.stringify(action.payload.data)).value;
            const valuesObjValues_ = Object.values(valuesObj_);
            const lastTwoValues_ = valuesObjValues_.slice(-2);
            const compareValue_ = Math.abs(Math.round(lastTwoValues_[1] - lastTwoValues_[0]));
            const viewObj_ = {
                id: 3,
                title: 'All industries in Europe',
                lastValues: lastTwoValues_,
            }
            console.log(viewObj_)
            return {
                ...state,
                survival_rate_data: [...state.survival_rate_data, viewObj_]
            }
        case 'RESET':
            return {
                ...state,
                survival_rate_data: []
            };
        default:
            return state;
    }
}
