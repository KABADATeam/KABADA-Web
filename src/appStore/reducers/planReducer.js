export const privatePlansReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCHING_PLANS_SUCCESS":
            return action.payload.map(obj=> ({ ...obj, coverImage: null }));
        case 'SAVING_PLAN_SUCCESS':
            return [ ...state, action.payload ];
        case 'FETCHING_IMAGE_SUCCESS':
            return state.map(x => x.id === action.payload.id ? action.payload : x);
        case "REMOVING_PLAN_SUCCESS":
            return action.payload.data.filter(plan => plan.id !== action.payload.id);
        default:
            return state;
    }
};

export const selectedplanFetchReducer = (state = { id: null }, action) => {
    switch (action.type) {
        case "FETCHING_SELECTED_PLAN_SUCCESS":
            return action.payload;
        case "UPDATING_SELECTED_PLAN_SUCCESS":
            return action.payload;
        case "CLEARING_SELECTED_PLAN_SUCCESS":
            return action.payload;
        case "UPDATING_SELECTED_PLAN_STATUS_SUCCESS":
            return { ...state, "public": action.payload };
        case "FETCHING_PLAN_MEMBERS_SUCCESS":
            return { ...state, "members": action.payload.members }
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
            return action.payload.publicBusinessPlans.businessPlan.map(item => ({ ...item, "key": item.id  }) );
        default:
            return state;
    }
};
