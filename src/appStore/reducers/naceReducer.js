export const industriesReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCHING_INDUSTRIES_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}

export const activitiesReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCHING_ACTIVITIES_SUCCESS':
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
            return action.payload;
        default:
            return state;
    }
}

export const activitySelectedForEurostatReducer = (state = null, action) => {
    switch (action.type) {
        case 'ACTIVITY_SELECT_FOR_EUROSTAT_SUCCESS':
            var naceSplit = action.payload.split(".")
            const naceJoin = naceSplit.join("")
            console.log(naceJoin)
            return naceJoin;
        default:
            return state;
    }
}