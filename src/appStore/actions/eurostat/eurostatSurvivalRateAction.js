import eurostatAPI from './eurostatAPI';
import { dataSetForSurvivalRate } from './dataSetsSurvivalRate';


export const getSurvivalRate = () => {
    return async (dispatch, getState) => {
        //dispatch({ type: 'LOADING', payload: true });
        dispatch({ type: 'RESET', payload: null });
        dispatch({ type: 'RESET_LOADING' });
        const nace_code = getState().selectedBusinessPlan.overview.nace.activity_code;
        const geo = getState().selectedBusinessPlan.countryShortCode;
        const geoTitle = getState().selectedBusinessPlan.countryTitle;
        const split_nace_code = nace_code.split('.');
        const industry = split_nace_code[0];
        const activityCode = industry.concat('', split_nace_code[1]);
        
        if (dataSetForSurvivalRate[industry] !== undefined) {
            let queryData = dataSetForSurvivalRate[industry].dataSets;
        if (queryData[0].industries.includes(activityCode)) {
            const tableCode = queryData[0].tableCode;
            console.log('Table code ', tableCode);
            const variable = queryData[0].variable[0];
            try {
                var response = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=" + geo + "&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=" + activityCode);
                dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_EUROSTATDATA_SUCCESS', payload: {"data": response.data, "geoTitle": geoTitle, "industry": activityCode} });  
                console.log('Gauti data: ', response); 
            } catch (error){
                //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
            }
            try {
                var responseAllCountry = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=" + geo + "&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=B-S_X_K642");
                if(responseAllCountry.data.source === "ESTAT"){
                    dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_TOTAL_EUROSTATDATA_SUCCESS', payload: {data: responseAllCountry.data, geoTitle: geoTitle } });
                    console.log('Response with all country survival rate', responseAllCountry)
                }  else {
                }  
            } catch (error){
                //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
            }
            try {
                var responseEurope = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=EU27_2020&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=B-N_X_K642");
                if(responseEurope.data.source === "ESTAT"){
                    dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_ALL_EUROPE_EUROSTATDATA_SUCCESS', payload: {data: responseEurope.data, geoTitle: 'Europe' } });
                    console.log('Response result from all Europe', responseEurope)
                } else {
                }
                
            } catch (error){
                //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
            }
            //bd_9bd_sz_cl_r2?sinceTimePeriod=2008&precision=1&geo=LT&indic_sb=V97043&sizeclas=TOTAL&nace_r2=TOTAL
            dispatch({ type: 'SURVIVAL_RATE_LOADING', payload: true})
        } else {
            const tableCode = queryData[0].tableCode;
            const variable = queryData[0].variable[0];
            const industryCode = queryData[0].industries[0];
            if (activityCode === 'C10' || activityCode === 'C11' || activityCode === 'C12') {
                try {
                    var response10 = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=" + geo + "&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=C10-C12");
                    dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_EUROSTATDATA_SUCCESS', payload: {"data": response10.data, "geoTitle": geoTitle, "industry": 'C10-C12'} });   
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                try {
                    var response11 = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=" + geo + "&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=B-S_X_K642");
                    if(response11.data.source === "ESTAT"){
                        dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_TOTAL_EUROSTATDATA_SUCCESS', payload: {data: response11.data, geoTitle: geoTitle } });
                    }  else {
                    }  
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                try {
                    var response12 = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=EU27_2020&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=B-N_X_K642");
                    if(response12.data.source === "ESTAT"){
                        dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_ALL_EUROPE_EUROSTATDATA_SUCCESS', payload: {data: response12.data, geoTitle: 'Europe' } });
                    } else {
                    }
                    
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                dispatch({ type: 'SURVIVAL_RATE_LOADING', payload: true})
            } else if (activityCode === 'C13' || activityCode === 'C14') {
                try {
                    var response13 = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=" + geo + "&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=C13_C14");
                    dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_EUROSTATDATA_SUCCESS', payload: {"data": response13.data, "geoTitle": geoTitle, "industry": 'C13-C14'} });   
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                try {
                    var response14 = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=" + geo + "&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=B-S_X_K642");
                    if(response.data.source === "ESTAT"){
                        dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_TOTAL_EUROSTATDATA_SUCCESS', payload: {data: response14.data, geoTitle: geoTitle } });
                    }  else {
                    }  
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                try {
                    var response13_4 = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=EU27_2020&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=B-N_X_K642");
                    console.log(response13_4.data)
                    if(response.data.source === "ESTAT"){
                        dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_ALL_EUROPE_EUROSTATDATA_SUCCESS', payload: {data: response13_4.data, geoTitle: 'Europe' } });
                    } else {
                    }
                    
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                dispatch({ type: 'SURVIVAL_RATE_LOADING', payload: true})
            } else if (activityCode === 'C17' || activityCode === 'C18') {
                try {
                    var response17 = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=" + geo + "&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=C17_C18");
                    dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_EUROSTATDATA_SUCCESS', payload: {"data": response17.data, "geoTitle": geoTitle, "industry": 'C17-C18'} });   
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                try {
                    var response18 = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=" + geo + "&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=B-S_X_K642");
                    if(response.data.source === "ESTAT"){                        
                        dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_TOTAL_EUROSTATDATA_SUCCESS', payload: {data: response18.data, geoTitle: geoTitle } });
                    }  else {
                    }  
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                try {
                    var response17_18 = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=EU27_2020&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=B-N_X_K642");
                    if(response17_18.data.source === "ESTAT"){
                        dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_ALL_EUROPE_EUROSTATDATA_SUCCESS', payload: {data: response17_18.data, geoTitle: 'Europe' } });
                    } else {
                    }
                    
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                dispatch({ type: 'SURVIVAL_RATE_LOADING', payload: true})
            } else if (activityCode === 'C20' || activityCode === 'C21') {
                try {
                    var response = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=" + geo + "&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=C20_C21");
                    dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_EUROSTATDATA_SUCCESS', payload: {"data": response.data, "geoTitle": geoTitle, "industry": 'C20-C21'} });   
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                try {
                    var response = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=" + geo + "&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=B-S_X_K642");
                    if(response.data.source === "ESTAT"){
                        dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_TOTAL_EUROSTATDATA_SUCCESS', payload: {data: response.data, geoTitle: geoTitle } });
                    }  else {
                    }  
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                try {
                    var response = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=EU27_2020&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=B-N_X_K642");
                    if(response.data.source === "ESTAT"){
                        dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_ALL_EUROPE_EUROSTATDATA_SUCCESS', payload: {data: response.data, geoTitle: 'Europe' } });
                    } else {
                    }
                    
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                dispatch({ type: 'SURVIVAL_RATE_LOADING', payload: true})
            } else if (activityCode === 'C24' || activityCode === 'C25') {
                try {
                    var response = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=" + geo + "&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=C24_C25");
                    dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_EUROSTATDATA_SUCCESS', payload: {"data": response.data, "geoTitle": geoTitle, "industry": 'C24-C25'} });   
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                try {
                    var response = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=" + geo + "&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=B-S_X_K642");
                    if(response.data.source === "ESTAT"){
                        dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_TOTAL_EUROSTATDATA_SUCCESS', payload: {data: response.data, geoTitle: geoTitle } });
                    }  else {
                    }  
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                try {
                    var response = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=EU27_2020&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=B-N_X_K642");
                    if(response.data.source === "ESTAT"){
                        dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_ALL_EUROPE_EUROSTATDATA_SUCCESS', payload: {data: response.data, geoTitle: 'Europe' } });
                    } else {
                    }
                    
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                dispatch({ type: 'SURVIVAL_RATE_LOADING', payload: true})
            } else if (activityCode === 'C26' || activityCode === 'C27') {
                try {
                    var response = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=" + geo + "&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=C26_C27");
                    dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_EUROSTATDATA_SUCCESS', payload: {"data": response.data, "geoTitle": geoTitle, "industry": 'C26-C27'} });   
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                try {
                    var response = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=" + geo + "&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=B-S_X_K642");
                    if(response.data.source === "ESTAT"){
                        dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_TOTAL_EUROSTATDATA_SUCCESS', payload: {data: response.data, geoTitle: geoTitle } });
                    }  else {
                    }  
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                try {
                    var response = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=EU27_2020&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=B-N_X_K642");
                    if(response.data.source === "ESTAT"){
                        dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_ALL_EUROPE_EUROSTATDATA_SUCCESS', payload: {data: response.data, geoTitle: 'Europe' } });
                    } else {
                    }
                    
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                dispatch({ type: 'SURVIVAL_RATE_LOADING', payload: true})
            }else if (activityCode === 'C29' || activityCode === 'C30') {
                try {
                    var response = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=" + geo + "&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=C29_C30");
                    dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_EUROSTATDATA_SUCCESS', payload: {"data": response.data, "geoTitle": geoTitle, "industry": 'C29-C30'} });   
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                try {
                    var response = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=" + geo + "&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=B-S_X_K642");
                    if(response.data.source === "ESTAT"){
                        dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_TOTAL_EUROSTATDATA_SUCCESS', payload: {data: response.data, geoTitle: geoTitle } });
                    }  else {
                    }  
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                try {
                    var response = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=EU27_2020&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=B-N_X_K642");
                    if(response.data.source === "ESTAT"){
                        dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_ALL_EUROPE_EUROSTATDATA_SUCCESS', payload: {data: response.data, geoTitle: 'Europe' } });
                    } else {
                    }
                    
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                dispatch({ type: 'SURVIVAL_RATE_LOADING', payload: true})
            }
            else if (activityCode === 'C31' || activityCode === 'C32') {
                try {
                    var response = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=" + geo + "&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=C31_C32");
                    dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_EUROSTATDATA_SUCCESS', payload: {"data": response.data, "geoTitle": geoTitle, "industry": 'C31-C32'} });   
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                try {
                    var response = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=" + geo + "&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=B-S_X_K642");
                    if(response.data.source === "ESTAT"){
                        dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_TOTAL_EUROSTATDATA_SUCCESS', payload: {data: response.data, geoTitle: geoTitle } });
                    }  else {
                    }  
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                try {
                    var response = await eurostatAPI.get(tableCode + "??format=JSON&lang=EN&sinceTimePeriod=2008&geo=EU27_2020&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=B-N_X_K642");
                    if(response.data.source === "ESTAT"){
                        dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_ALL_EUROPE_EUROSTATDATA_SUCCESS', payload: {data: response.data, geoTitle: 'Europe' } });
                    } else {
                    }
                    
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                dispatch({ type: 'SURVIVAL_RATE_LOADING', payload: true})
            }
            
            else {
                try {
                    var response = await eurostatAPI.get(tableCode + "?format=JSON&lang=EN&sinceTimePeriod=2008&geo=" + geo + "&indic_sb=" + variable + "&sizeclas=TOTAL&nace_r2=" + industryCode);
                    dispatch({ type: 'FETCHING_SURVIVAL_RATE_FOR_COUNTRY_EUROSTATDATA_SUCCESS', payload: {"data": response.data, "geoTitle": geoTitle, "industry": industryCode} });  
                    console.log('if statement',response) 
                } catch (error){
                    //dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
                dispatch({ type: 'SURVIVAL_RATE_LOADING', payload: true})
            }
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
    } else {
        console.log('Survival')
        dispatch({ type: 'SURVIVAL_RATE_ERROR', payload: {state: true, error: 'No data'}});
    }
        dispatch({ type: 'LOADING', payload: false });
    }
}
