export const eurostatDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCHING_EUROSTATDATA_SUCCESS':
            const valuesObj = JSON.parse(JSON.stringify(action.payload)).value
            console.log(valuesObj)
            const legendDataObj = JSON.parse(JSON.stringify(action.payload)).dimension.indic_sb.category.label 
            const yearObj = JSON.parse(JSON.stringify(action.payload)).dimension.time.category.label
            const Data = []
            var legendData = ''
            for (const property in legendDataObj){
                legendData = legendDataObj[property]
            }
            console.log(legendDataObj)
            for (const property in valuesObj){
                Data.push({ name: '', [legendData]: valuesObj[property]})
            }
            var i = 0
            for (const property in yearObj){
                Data[i].name = yearObj[property]
                i++
            }
            console.log(Data)
            console.log(legendData)
            return [ ...state, Data ];
        case 'RESET_EUROSTATDATA':
            return [];
        default:
            return state;
    }
}

export const eurostatDataReducerProduction = (state = [], action) => {
    switch (action.type) {
        case 'FETCHING_EUROSTATDATA_SUCCESS_PRODUCTION_VALUE':
                const valuesObj = JSON.parse(JSON.stringify(action.payload)).value
                const yearObj = JSON.parse(JSON.stringify(action.payload)).dimension.time.category.label
                const Data = []
                for (const property in valuesObj){
                    Data.push({ name: '', uv: valuesObj[property]})
                }
                var i = 0
                for (const property in yearObj){
                    Data[i].name = yearObj[property]
                    i++
                }
                console.log(Data)
                return Data
        default:
            return state;
    }
}

export const eurostatDataReducerPersonnel = (state = [], action) => {
    switch (action.type) {
        case 'FETCHING_EUROSTATDATA_SUCCESS_PERSONNEL_VALUE':
                const valuesObj = JSON.parse(JSON.stringify(action.payload)).value
                const yearObj = JSON.parse(JSON.stringify(action.payload)).dimension.time.category.label
                const Data = []
                for (const property in valuesObj){
                    Data.push({ name: '', uv: valuesObj[property]})
                }
                var i = 0
                for (const property in yearObj){
                    Data[i].name = yearObj[property]
                    i++
                }
                return Data
        default:
            return state;
    }
}

