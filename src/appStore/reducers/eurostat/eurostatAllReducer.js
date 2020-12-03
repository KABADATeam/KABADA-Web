export const eurostatAllDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCHING_EUROSTAT_ALL_DATA_SUCCESS':
            const valuesObj = JSON.parse(JSON.stringify(action.payload)).value
            const legendDataObj = JSON.parse(JSON.stringify(action.payload)).dimension.indic_sb.category.label 
            const yearObj = JSON.parse(JSON.stringify(action.payload)).dimension.time.category.label
            const DataAll = []
            var legendData = ''
            for (const property in legendDataObj){
                legendData = legendDataObj[property]
            }

            for (const property in valuesObj){
                DataAll.push({ name: '', [legendData]: valuesObj[property]})
            }
            var i = 0
            for (const property in yearObj){
                DataAll[i].name = yearObj[property]
                i++
            }
            console.log('ALL: ' + DataAll);
            return [ ...state, DataAll ];
        case 'RESET_EUROSTAT_ALL_DATA':
            return [];
        default:
            return state;
    }
}

