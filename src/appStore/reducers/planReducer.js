export const planReducer = (state = null, action) => {
    switch (action.type) {
        case 'SAVING_PLAN_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}

export const planFetchReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCHING_PLAN_SUCCESS":
            return action.payload;
        default:
            return state;
    }
};