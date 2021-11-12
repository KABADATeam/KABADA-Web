import eurostatAPI from './eurostatAPI';
import { dataSetGreatnessIndustry } from './dataSetsGreatnessIndustry';

export const getGreatnessIndustry = () => {
    return async(dispatch, getState) => {
        dispatch({ type: 'RESET_GREATNESS_DATA', payload: null });
        console.log(getState());
        const nace_code = getState().selectedBusinessPlan.overview.nace.activity_code;
        const geo = getState().selectedBusinessPlan.countryShortCode;
        const geoTitle = getState().selectedBusinessPlan.countryTitle;
        const split_nace_code = nace_code.split('.');
        const industry = split_nace_code[0];
        const activityCode = industry.concat('', split_nace_code[1]);
        let queryData = dataSetGreatnessIndustry[industry].dataSets;
        console.log(queryData)

        if (queryData[0].industries.includes(activityCode)) {
            const tableCode = queryData[0].tableCode;
            console.log(tableCode);
            for (var variable of queryData[0].variables) {
                console.log(variable)
                try {
                    var response = await eurostatAPI.get(tableCode + "?sinceTimePeriod=2005&precision=1&geo=" + geo + "&indic_sb=" + variable + "&nace_r2=" + activityCode);
                    console.log(response)
                    dispatch({ type: 'FETCHING_GREATNESS_INDUSTRY_FOR_COUNTRY_EUROSTATDATA_SUCCESS', payload: {"data": response.data, "geoTitle": geoTitle, "industry": activityCode} });   
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
            }    
        }
    }
}