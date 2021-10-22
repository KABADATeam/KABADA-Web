const getPercentage = (overview) => {
    const total = 12;
    let k = 0;

    k = overview.channels.is_completed === true ? k + 1 : k;
    k = overview.cost_structure.is_completed === true ? k + 1 : k;
    k = overview.customer_relationship.is_completed === true ? k + 1 : k;
    k = overview.customer_segments.is_completed === true ? k + 1 : k;
    //k = overview.financial_projections.is_completed === true ? k + 1 : k;     // not implemented, yet
    k = overview.key_activities.is_completed === true ? k + 1 : k;
    k = overview.key_partners.is_completed === true ? k + 1 : k;
    k = overview.key_resources.is_completed === true ? k + 1 : k;
    k = overview.revenue_streams.is_completed === true ? k + 1 : k;
    k = overview.swot.is_completed === true ? k + 1 : k;
    //k = overview.team_competencies.is_completed === true ? k + 1 : k;         // not implemented, yet
    k = overview.value_proposition.is_completed === true ? k + 1 : k;

    return Math.round((k / total) * 100);
}


export const privatePlansReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCHING_PLANS_SUCCESS":
            return action.payload.map(obj => ({ ...obj, "coverImage": null }));
        case 'SAVING_PLAN_SUCCESS':
            return [...state, action.payload];
        case 'FETCHING_IMAGE_SUCCESS':
            console.log(action.payload)
            const plan_ = state.filter(x => x.id === action.payload.id)[0];
            return state.map(x => x.id === action.payload.id ? { ...plan_, "coverImage": action.payload.coverImage } : x);
        case "REMOVING_PLAN_SUCCESS":
            return state.filter(plan => plan.id !== action.payload.id);
        case "FETCHING_PLAN_OVERVIEW_SUCCESS":
            const plan = state.filter(x => x.id === action.payload.id)[0];
            const percentage = getPercentage(action.payload.overview);
            const new_overview = { ...action.payload.overview, "percentage": percentage };
            return state.map(x => x.id === action.payload.id ? { ...plan, "overview": new_overview, "percentage": percentage } : x);
        default:
            return state;
    }
};

export const selectedplanFetchReducer = (state = { 'id': null }, action) => {
    switch (action.type) {
        case "FETCHING_SELECTED_PLAN_SUCCESS":
            return action.payload;
        case "FETCHING_SELECTED_PLAN_DETAILS_SUCCESS":
            return { ...state, "name": action.payload.title, "activityId": action.payload.activity ? action.payload.activity.id : null, "industryId": action.payload.activity ? action.payload.activity.industryId : null, "countryId": action.payload.country ? action.payload.country.id : null, "planImage": action.payload.img ? action.payload.img : null, "languageId": action.payload.language ? action.payload.language.id : null };
        case "UPDATING_SELECTED_PLAN_SUCCESS":
            return { ...state, ...action.payload };
        case "UPDATING_IMAGE_SUCCESS":
            return { ...state, "coverImage": action.payload };
        case "FETCHING_IMAGE_SUCCESS":
            return { ...state, "coverImage": action.payload };
        case "CLEARING_SELECTED_PLAN_SUCCESS":
            return action.payload;
        case "UPDATING_SELECTED_PLAN_STATUS_SUCCESS":
            return { ...state, "public": action.payload };
        case "FETCHING_PLAN_MEMBERS_SUCCESS":
            return { ...state, "members": action.payload.members }
        case "FETCHING_SELECTED_PLAN_OVERVIEW_SUCCESS":
            const percentage = getPercentage(action.payload.overview);
            const new_overview = { ...action.payload.overview, "percentage": percentage };
            return { ...state, "overview": new_overview, "percentage": percentage }
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
            return action.payload.publicBusinessPlans.businessPlan.map(item => ({ ...item, "key": item.id }));
        default:
            return state;
    }
};

export const overviewTestReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCHING_OVERVIEW_TEST":
            console.log(action.payload);
            return state
        default:
            return state;
    }
};
