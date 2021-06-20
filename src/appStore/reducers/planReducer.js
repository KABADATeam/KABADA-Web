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
        case "REMOVING_PLAN_SUCCESS":
            return action.payload.data.filter(plan => plan.id !== action.payload.id);
        default:
            return state;
    }
};

export const selectedplanFetchReducer = (state = {}, action) => {
    switch (action.type) {
        case "FETCHING_SELECTED_PLAN_SUCCESS":
            return action.payload;
        case "CLEARING_SELECTED_PLAN_SUCCESS":
            return action.payload;
        default:
            return state;
    }
};

export const updatePlanReducer = (state = null, action) => {
    switch (action.type) {
        case "UPDATING_PLAN_SUCCESS":
            return action.payload;
        default:
            return state;
    }
}

export const allPublicPlansFetchReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCHING_ALL_PLANS_SUCCESS":
            return state;
        default:
            return state;
    }
};
