import eurostatAPI from './eurostatAPI';
import { dataSet } from './dataSets';

export const getEurostatData = () => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        dispatch({ type: 'RESET_EUROSTATDATA', payload: null });
        const geo = getState().selectedCountry.shortCode;
        const codes = getState().selectedActivity.formatedCodes;
        const industry = getState().selectedActivity.industry;
        console.log(getState().selectedActivity.industry);
        let queryData = dataSet[industry];
        for (var data of queryData.dataSets) {
            var industries = data.industries;
            var activityCode = industry;
            for (var code of codes) {
                if (industries.includes(code)) {
                    activityCode = code;
                    break;
                }
            }

            for (var variable of data.variables) {
                try {
                    var response = await eurostatAPI.get(data.tableCode + "?sinceTimePeriod=2010&precision=1&geo=" + geo + "&indic_sb=" + variable + "&nace_r2=" + activityCode);
                    dispatch({ type: 'FETCHING_EUROSTATDATA_SUCCESS', payload: response.data });   
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all requested data could be downloaded" });
                    console.log(error);
                }
            }
        }
        dispatch({ type: 'LOADING', payload: false });
    }
}
