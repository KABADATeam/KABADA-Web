import eurostatAPI from './eurostatAPI';
import { dataSetForSurvivalRate } from './dataSetsSurvivalRate';

export const getSurvivalRate = () => {
    return async (dispatch, getState) => {
        //dispatch({ type: 'LOADING', payload: true });
        dispatch({ type: 'RESET_EUROSTATDATA', payload: null });
        console.log(getState());
        const nace_code = getState().selectedBusinessPlan.overview.nace.activity_code;
        console.log(nace_code);
        const geo = getState().selectedBusinessPlan.countryShortCode;
        console.log(geo);
        const geoTitle = getState().selectedBusinessPlan.countryTitle;
        const split_nace_code = nace_code.split('.');
        console.group(split_nace_code)
        const industry = split_nace_code[0];
        console.group(industry)
        const activityCode = industry.concat('', split_nace_code[1]);
        console.log(activityCode);
        let queryData = dataSetForSurvivalRate[industry].dataSets;
        console.log(queryData)

        
        if (queryData[0].industries.includes(activityCode)) {
            const tableCode = queryData[0].tableCode;
            const variable = queryData[0].variable[0];
            console.log(variable);
            try {
                var response = await eurostatAPI.get(tableCode + "?sinceTimePeriod=2008&precision=1&geo=" + geo + "&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=" + activityCode);
                console.log(response)
                dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_EUROSTATDATA_SUCCESS', payload: {"data": response.data, "geoTitle": geoTitle, "industry": activityCode} });   
            } catch (error){
                //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
            }
            try {
                var response = await eurostatAPI.get(tableCode + "?sinceTimePeriod=2008&precision=1&geo=" + geo + "&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=TOTAL");
                if(response.data.error.label !== "Dataset contains no data. One or more filtering elements (query parameters) are probably invalid."){
                    console.log('Country total')
                    dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_TOTAL_EUROSTATDATA_SUCCESS', payload: {data: response.data, geoTitle: geoTitle } });
                }    
            } catch (error){
                //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
            }
            try {
                var response = await eurostatAPI.get(tableCode + "?sinceTimePeriod=2008&precision=1&geo=EU27_2020&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=TOTAL");
                if(response.data.error.label !== "Dataset contains no data. One or more filtering elements (query parameters) are probably invalid."){
                    console.log(' total')
                    dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_ALL_EUROPE_EUROSTATDATA_SUCCESS', payload: {data: response.data, geoTitle: 'Europe' } });
                }
                dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_TOTAL1_EUROSTATDATA_SUCCESS', payload: {data: 'work'}});
            } catch (error){
                //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
            }
            //bd_9bd_sz_cl_r2?sinceTimePeriod=2008&precision=1&geo=LT&indic_sb=V97043&sizeclas=TOTAL&nace_r2=TOTAL
            
        }
        /*for (var code of queryData[0].industries){
            var _activityCode = activityCode;
            if (queryData[0].industries.includes(code)){
                _activityCode = code;
                break;
            }
            console.log(_activityCode);
        }*/
        /*let queryData = dataSet[industry];
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
                    var response = await eurostatAPI.get(data.tableCode + "?sinceTimePeriod=2010&precision=1&size_emp=TOTAL&geo=" + geo + "&indic_sb=" + variable + "&nace_r2=" + activityCode);
                    dispatch({ type: 'FETCHING_EUROSTATDATA_SUCCESS', payload: response.data });   
                } catch (error){
                    dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
            }
        }*/
        dispatch({ type: 'LOADING', payload: false });
    }
}
