export const industryReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCHING_INDUSTRIES_SUCCESS':
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
