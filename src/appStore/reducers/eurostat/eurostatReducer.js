export const eurostatDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCHING_EUROSTATDATA_SUCCESS':
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
                console.log(Data)
                return Data
        default:
            return state;
    }
}

