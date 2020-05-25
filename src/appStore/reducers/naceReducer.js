export const industryReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCHING_INDUSTRIES_SUCCESS':
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
}

export const activityReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCHING_ACTIVITIES_SUCCESS':
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
}
export const industrySelectedReducer = (state = null, action) => {
    switch (action.type) {
        case 'INDUSTRY_SELECT_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}
export const activitySelectedReducer = (state = null, action) => {
    switch (action.type) {
        case 'ACTIVITY_SELECT_SUCCESS':
            var naceSplit = action.payload.split(".")
            const naceJoin = naceSplit.join("")
            console.log(naceJoin)
            return naceJoin;
        default:
            return state;
    }
}