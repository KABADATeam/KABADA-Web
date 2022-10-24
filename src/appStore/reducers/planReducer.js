const getPercentage = (overview) => {
    const total = 15;
    let k = 0;


    k = overview.value_proposition.is_completed === true ? k + 1 : k;
    k = overview.customer_segments.is_completed === true ? k + 1 : k;
    k = overview.channels.is_completed === true ? k + 1 : k;
    k = overview.customer_relationship.is_completed === true ? k + 1 : k;
    k = overview.revenue_streams.is_completed === true ? k + 1 : k;
    k = overview.key_resources.is_completed === true ? k + 1 : k;
    k = overview.key_activities.is_completed === true ? k + 1 : k;
    k = overview.key_partners.is_completed === true ? k + 1 : k;
    k = overview.cost_structure.is_completed === true ? k + 1 : k;
    k = overview.swot.is_completed === true ? k + 1 : k;
    k = overview.assets.is_completed === true ? k + 1 : k;
    k = overview.fixed_and_variables_costs.is_completed === true ? k + 1 : k;
    k = overview.sales_forecast.is_completed === true ? k + 1 : k;
    k = overview.business_start_up_investments.is_completed === true ? k + 1 : k;
    //k = overview.cash_flow.is_completed === true ? k + 1 : k;
    k = overview.personal_characteristics.is_completed === true ? k + 1 : k;
    return Math.round((k / total) * 100);
}


export const privatePlansReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCHING_PLANS_SUCCESS":
            return action.payload.map(obj => ({ ...obj, "coverImage": null }));
        case 'SAVING_PLAN_SUCCESS':
            return [...state, action.payload];
        case 'FETCHING_IMAGE_SUCCESS':
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

export const selectedplanFetchReducer = (state = {
    'id': null,
    'name': null,
    'coverImage': null,
    'dateCreated': null,
    'overview': null,
    'percentage': 0,
    'planImage': null,
    'public': false,
    'sharedWithMe': false,
    'countryShortCode': null,
    'countryTitle': null,
    'activityCode': '',
    'members': []
}, action) => {
    switch (action.type) {
        case "FETCHING_SELECTED_PLAN_SUCCESS":
            console.log(action.payload);
            return {
                ...state,
                "id": action.payload.id,
                "name": action.payload.name,
                "coverImage": action.payload.coverImage,
                "dateCreated": action.payload.dateCreated,
                "overview": action.payload.overview,
                "percentage": action.payload.percentage,
                "planImage": action.payload.planImage,
                "public": action.payload.public,
                "sharedWithMe": action.payload.sharedWithMe,
            }
        // case "REFRESH_FETCHING_SELECTED_PLAN_SUCCESS":
        //     console.log(action.payload);
        //     return {
        //         ...state,
        //         "id": action.payload.plan.id,
        //         "name": action.payload.plan.name,
        //         "coverImage": action.payload.plan.coverImage,
        //         "dateCreated": action.payload.plan.dateCreated,
        //         "overview": action.payload.overview,
        //         "percentage": action.payload.plan.percentage,
        //         "planImage": action.payload.plan.planImage,
        //         "public": action.payload.plan.public,
        //         "sharedWithMe": action.payload.plan.sharedWithMe,
        //         "activityCode": action.payload.overview.nace.activity_code,
        //     }
        case "FETCHING_SELECTED_PLAN_DETAILS_SUCCESS":
            return { ...state, "countryShortCode": action.payload.country.shortCode, "countryTitle": action.payload.country.title, "planImage": action.payload.img ? action.payload.img : null, "activityID": action.payload.activityID };
        case "UPDATING_SELECTED_PLAN_SUCCESS":
            return { ...state, ...action.payload };
        case "UPDATING_IMAGE_SUCCESS":
            return { ...state, "coverImage": action.payload };
        case "FETCHING_IMAGE_SUCCESS":
            return { ...state, "coverImage": action.payload.coverImage };
        case "CLEARING_SELECTED_PLAN_SUCCESS":
            return action.payload;
        case "UPDATING_SELECTED_PLAN_STATUS_SUCCESS":
            return { ...state, "public": action.payload };
        case "FETCHING_PLAN_MEMBERS_SUCCESS":
            return { ...state, "members": action.payload.members }
        case "FETCHING_SELECTED_PLAN_OVERVIEW_SUCCESS":
            const obj = action.payload.overview
            const percentage = getPercentage(action.payload.overview);
            const new_overview = { ...action.payload.overview, "percentage": percentage };
            return {
                ...state,
                "overview": new_overview,
                "percentage": percentage,
                "activityCode": obj.nace.activity_code,
                "value_proposition_state": obj.value_proposition.is_completed,
                "value_proposition_description": obj.value_proposition.description,
                "customer_segments_state": obj.customer_segments.is_completed,
                "customer_segments_description": obj.customer_segments.description,
                "channels_state": obj.channels.is_completed,
                "channels_description": obj.channels.description,
                "customer_relationship_state": obj.customer_relationship.is_completed,
                "customer_relationship_description": obj.customer_relationship.description,
                "revenue_streams_state": obj.revenue_streams.is_completed,
                "revenue_streams_description": obj.revenue_streams.description,
                "key_resources_state": obj.key_resources.is_completed,
                "key_resources_description": obj.key_resources.description,
                "key_activities_state": obj.key_activities.is_completed,
                "key_activities_description": obj.key_activities.description,
                "key_partners_state": obj.key_partners.is_completed,
                "key_partners_description": obj.key_partners.description,
                "cost_structure_state": obj.cost_structure.is_completed,
                "cost_structure_description": obj.cost_structure.description,
                "swot_state": obj.swot.is_completed,
                "swot_description": obj.swot.description,
                "assets_state": obj.assets.is_completed,
                "fixed_and_variables_costs_state": obj.fixed_and_variables_costs.is_completed,
                "sales_forecast_state": obj.sales_forecast.is_completed,
                "business_start_up_investments_state": obj.business_start_up_investments.is_completed,
                "personal_characteristics_state": obj.personal_characteristics.is_completed,
                "personal_characteristics_description": obj.personal_characteristics.description,
            }
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
