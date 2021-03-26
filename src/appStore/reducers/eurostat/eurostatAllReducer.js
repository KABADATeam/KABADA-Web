export const eurostatAllDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCHING_EUROSTAT_ALL_DATA_SUCCESS':
            const valuesObj = JSON.parse(JSON.stringify(action.payload)).value
            console.log(action.payload);
            const legendDataObj = JSON.parse(JSON.stringify(action.payload)).dimension.indic_sb.category.label;
            const yearObj = JSON.parse(JSON.stringify(action.payload)).dimension.time.category.label;
            const DataAll = [];
            const statusObj = JSON.parse(JSON.stringify(action.payload)).status;
            var legendData = '';
            var i = 0;

            if (statusObj && Object.keys(statusObj).length === 0) {
                for (const property in legendDataObj){
                    legendData = legendDataObj[property]
                }
    
                for (const property in valuesObj){
                    DataAll.push({ name: '', [legendData]: valuesObj[property]})
                }
                
                i = 0;
                for (const property in yearObj){
                    DataAll[i].name = yearObj[property]
                    i++
                }
                return [ ...state, { title: legendData, data: DataAll } ];
            } else {
                for (const property in legendDataObj){
                    legendData = legendDataObj[property]
                }
    
                for (const property in statusObj){
                    statusObj[property] = 0;
                }

                const fixedValues = Object.assign({}, valuesObj, statusObj);

                for (const property in fixedValues){
                    DataAll.push({ name: '', [legendData]: fixedValues[property]})
                }

                i = 0;
                for (const property in yearObj){
                    DataAll[i].name = yearObj[property]
                    i++
                }
                return [ ...state, { title: legendData, data: DataAll } ];
            }

            
        case 'RESET_EUROSTAT_ALL_DATA':
            return [];
        default:
            return state;
    }
}