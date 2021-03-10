export const eurostatDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCHING_EUROSTATDATA_SUCCESS':
            const valuesObj = JSON.parse(JSON.stringify(action.payload)).value
            const legendDataObj = JSON.parse(JSON.stringify(action.payload)).dimension.indic_sb.category.label 
            const yearObj = JSON.parse(JSON.stringify(action.payload)).dimension.time.category.label
            const Data = []
            var legendData = ''
            for (const property in legendDataObj){
                legendData = legendDataObj[property]
            }

            for (const property in valuesObj){
                Data.push({ name: '', [legendData]: valuesObj[property]})
            }
            var i = 0
            for (const property in yearObj){
                Data[i].name = yearObj[property]
                i++
            }
            return [ ...state, { title: legendData, data: Data } ];
        case 'RESET_EUROSTATDATA':
            return [];
        default:
            return state;
    }
}

