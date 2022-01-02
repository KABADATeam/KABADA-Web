import eurostatAPI from './eurostatAPI';
import { dataSetsCompanySize } from './dataSetsCompanySizeInTheIndustry';

export const getCompanySize = () => {
    return async (dispatch, getState) => {
        dispatch({ type: 'RESET_COMPANY_SIZE_DATA', payload: null });
        const nace_code = getState().selectedBusinessPlan.overview.nace.activity_code;
        const geo = getState().selectedBusinessPlan.countryShortCode;
        const geoTitle = getState().selectedBusinessPlan.countryTitle;
        const split_nace_code = nace_code.split('.');
        const industry = split_nace_code[0];
        const activityCode = industry.concat('', split_nace_code[1]);
        const test = dataSetsCompanySize[industry];
        console.log(test);
        try {
            if (dataSetsCompanySize[industry] !== undefined) {
                let queryData = dataSetsCompanySize[industry].dataSets;
                console.log('querydata', queryData);
                if (queryData[0].industries.includes(activityCode)) {
                    const tableCode = queryData[0].tableCode;
                    for (var variable of queryData[0].variables) {
                        try {
                            var response = await eurostatAPI.get(tableCode + "?sinceTimePeriod=2005&precision=1&geo=" + geo + "&indic_sb=" + variable + "&nace_r2=" + activityCode);
                            var response1 = await eurostatAPI.get(tableCode + "?sinceTimePeriod=2005&precision=1&geo=" + geo + "&indic_sb=" + variable + "&nace_r2=B-N_S95_X_K");
                            var response2 = await eurostatAPI.get(tableCode + "?sinceTimePeriod=2005&precision=1&geo=EU27_2020&indic_sb=" + variable + "&nace_r2=" + activityCode);
                            dispatch({
                                type: 'FETCHING_COMPANY_SIZE_EUROSTATDATA_SUCCESS',
                                payload: { "activityData": response.data, "totalActivitiesData": response1.data, "euActivitiesData": response2.data, "geoTitle": geoTitle, "industry": activityCode, "variable": variable, "geo": geo }
                            });
                        } catch (error) {
                            //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                        }
                    }
                }
                dispatch({ type: 'COMPANY_SIZE_LOADING', payload: true });
            } throw "Don't find industry in dataset";
        } catch (err) {
            console.log(err);
            console.log('company size')
            dispatch({ type: 'COMPANY_SIZE_ERROR', payload: { state: true, error: 'No data' } });
        }
        // if (dataSetsCompanySize[industry] === undefined) {
        //     console.log('company size')
        //     dispatch({ type: 'COMPANY_SIZE_ERROR', payload: { state: true, error: 'No data' } });
        // } else {
        //     let queryData = dataSetsCompanySize[industry].dataSets;
        //     console.log('querydata', queryData);
        //     if (queryData[0].industries.includes(activityCode)) {
        //         const tableCode = queryData[0].tableCode;
        //         for (var variable of queryData[0].variables) {
        //             try {
        //                 var response = await eurostatAPI.get(tableCode + "?sinceTimePeriod=2005&precision=1&geo=" + geo + "&indic_sb=" + variable + "&nace_r2=" + activityCode);
        //                 var response1 = await eurostatAPI.get(tableCode + "?sinceTimePeriod=2005&precision=1&geo=" + geo + "&indic_sb=" + variable + "&nace_r2=B-N_S95_X_K");
        //                 var response2 = await eurostatAPI.get(tableCode + "?sinceTimePeriod=2005&precision=1&geo=EU27_2020&indic_sb=" + variable + "&nace_r2=" + activityCode);
        //                 dispatch({
        //                     type: 'FETCHING_COMPANY_SIZE_EUROSTATDATA_SUCCESS',
        //                     payload: { "activityData": response.data, "totalActivitiesData": response1.data, "euActivitiesData": response2.data, "geoTitle": geoTitle, "industry": activityCode, "variable": variable, "geo": geo }
        //                 });
        //             } catch (error) {
        //                 //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
        //             }
        //         }
        //     }
        //     dispatch({ type: 'COMPANY_SIZE_LOADING', payload: true });
        // }
    }
}