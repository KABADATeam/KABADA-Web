export const eurostatSurvivalRateReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCHING_SURVIVAL_RATE_EUROSTATDATA_SUCCESS':
            console.log(action.payload);
            /*const valuesObj = JSON.parse(JSON.stringify(action.payload)).value;
            const legendDataObj = JSON.parse(JSON.stringify(action.payload)).dimension.indic_sb.category.label;
            const yearObj = JSON.parse(JSON.stringify(action.payload)).dimension.time.category.label;
            const Data = [];
            const statusObj = JSON.parse(JSON.stringify(action.payload)).status;
            var legendData = '';
            var i = 0;*/
            

            /*if (statusObj && Object.keys(statusObj).length === 0) {
                for (const property in legendDataObj){
                    legendData = legendDataObj[property]
                }
    
                for (const property in valuesObj){
                    Data.push({ name: '', [legendData]: valuesObj[property]})
                }
                
                i = 0;
                for (const property in yearObj){
                    Data[i].name = yearObj[property]
                    i++
                }
                return [ ...state, { title: legendData, data: Data } ];
            } else {
                for (const property in legendDataObj){
                    legendData = legendDataObj[property]
                }
    
                for (const property in statusObj){
                    statusObj[property] = 0;
                }

                const fixedValues = Object.assign({}, valuesObj, statusObj);

                for (const property in fixedValues){
                    Data.push({ name: '', [legendData]: fixedValues[property]})
                }
                
                i = 0;
                for (const property in yearObj){
                    Data[i].name = yearObj[property]
                    i++
                }
                return [ ...state, { title: legendData, data: Data } ];
            }*/
            return state;
            
        case 'RESET_EUROSTATDATA':
            return [];
        default:
            return state;
    }
}
