import eurostatAPI from './eurostatAPI';
import { dataSet } from './dataSets';

export const getEurostatAllData = () => {
    return async (dispatch, getState) => {
        dispatch({ type: 'LOADING', payload: true });
        dispatch({ type: 'RESET_EUROSTAT_ALL_DATA', payload: null });
        const codes = getState().selectedActivity.formatedCodes;
        const industry = getState().selectedActivity.industry;
        //console.log(getState().selectedActivity.industry);
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
                    var response = await eurostatAPI.get(data.tableCode + "?format=JSON&lang=EN&size_emp=TOTAL&geo=EU27_2020&indic_sb=" + variable + "&time=2011&time=2012&time=2013&time=2014&time=2015&time=2016&time=2017&nace_r2=" + activityCode);
                    //sbs_sc_sca_r2?sinceTimePeriod=2011&precision=1&size_emp=TOTAL&geo=EU27_2020&indic_sb=V11110&nace_r2=C10
                    //sbs_sc_sca_r2?precision=1&size_emp=TOTAL&geo=EU27_2020&indic_sb=V11110&time=2011&time=2012&time=2013&time=2014&time=2015&time=2016&time=2017&nace_r2=C10
                    //(data.tableCode + "?sinceTimePeriod=2010&precision=1&size_emp=TOTAL&geo=EU27_2020&indic_sb=" + variable + "&nace_r2=" + activityCode)
                    dispatch({ type: 'FETCHING_EUROSTAT_ALL_DATA_SUCCESS', payload: response.data });   
                } catch (error){
                    dispatch({ type: 'ERROR', payload: "Not all the data could be taken from the Eurostat" });
                }
            }
        }
        dispatch({ type: 'LOADING', payload: false });
    }
}
