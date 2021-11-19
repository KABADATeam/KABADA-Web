import eurostatAPI from './eurostatAPI';
import { dataSetCostsProductivity } from './dataSetsCostsProductivity';

export const getCostsProductivity = () => {
    return async(dispatch, getState) => {
        dispatch({ type: 'RESET_COSTS_PRODUCTIVITY_DATA', payload: null });
        const nace_code = getState().selectedBusinessPlan.overview.nace.activity_code;
        const geo = getState().selectedBusinessPlan.countryShortCode;
        const geoTitle = getState().selectedBusinessPlan.countryTitle;
        const split_nace_code = nace_code.split('.');
        const industry = split_nace_code[0];
        const activityCode = industry.concat('', split_nace_code[1]);
        
        if (dataSetCostsProductivity[industry] === undefined){
            return 
        } else {
            let queryData = dataSetCostsProductivity[industry].dataSets;
            if (queryData[0].industries.includes(activityCode)) {
                const tableCode = queryData[0].tableCode;
                for (var variable of queryData[0].variables) {
                    try {
                        var response = await eurostatAPI.get(tableCode + "?sinceTimePeriod=2005&precision=1&geo=" + geo + "&indic_sb=" + variable + "&nace_r2=" + activityCode);
                        var response1 = await eurostatAPI.get(tableCode + "?sinceTimePeriod=2005&precision=1&geo=" + geo + "&indic_sb=" + variable + "&nace_r2=B-N_S95_X_K");
                        var response2 = await eurostatAPI.get(tableCode + "?sinceTimePeriod=2005&precision=1&geo=EU27_2020&indic_sb=" + variable + "&nace_r2=" +activityCode);
                        dispatch({ type: 'FETCHING_COSTS_PRODUCTIVITY_EUROSTATDATA_SUCCESS', 
                            payload: {"activityData": response.data, "totalActivitiesData": response1.data, "euActivitiesData": response2.data ,"geoTitle": geoTitle, "industry": activityCode, "variable": variable, "geo": geo} });   
                    } catch (error){
                        //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                    }
                }    
            }
        }
        
    }
}