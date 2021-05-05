const initialState = {
    allPlanList: [],
    inProgressPlanList: [],
    completedPlanList: [],
    sharedPlanList: []
}
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
            return all_plans_data;
        default:
            return state;
    }
};
export const allPublicPlansForFilterFetchReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCHING_ALL_PLANS_FOR_FILTER_SUCCESS":
            console.log('Reducer' + action.payload);
            if (action.payload === "1") {
                console.log('Reducer get tabkey: ' + action.payload)
                return all_plans_data
            } else if (action.payload === "2") {
                const inProgressPlans = all_plans_data.filter(item => item.completed < 100);
                console.log(inProgressPlans);
                return inProgressPlans
            }
             else if (action.payload === "3") {
                const completedPlans = all_plans_data.filter(item => item.completed === 100);
                console.log(completedPlans);
                return completedPlans
            }
            else 
                return state;            
            default:
            return state;
    }
};
 /*
 case "FETCHING_ALL_PLANS_SUCCESS_JZ":
            console.log('Reducer' + action.payload);
            if (action.payload === "1") {
                console.log('Reducer get tabkey: ' + action.payload)
                return all_plans_data
            } else if (action.payload === "2") {
                const inProgressPlans = all_plans_data.filter(item => item.completed < 100);
                console.log(inProgressPlans);
                return inProgressPlans
            }
             else if (action.payload === "3") {
                const completedPlans = all_plans_data.filter(item => item.completed === 100);
                console.log(completedPlans);
                return completedPlans
            }
            else 
                return state;
 */
/*
if (action.payload === "1") {
                return {
                    allPlanList: [...state.allPlanList, all_plans_data]
                }
            } else if (action.payload === "2") {
                const inProgressPlans = all_plans_data.filter(item => item.completed < 100);
                console.log(inProgressPlans);
                return {
                    inProgressPlanList: [...state.inProgressPlanList, inProgressPlans]
                }
            }
             else if (action.payload === "3") {
                const completedPlans = all_plans_data.filter(item => item.completed === 100);
                console.log(completedPlans);
                return {
                    completedPlanList: [...state.completedPlanList, completedPlans]
                }
            }
            else 
                return { sharedPlanList: []};            
            default:
            return state;
*/
const all_plans_data = [
    {
        key: '1',
        name: 'Unicod Inc.',
        industry: 'Forests',
        country: 'Portugal',
        dateCreated: '2021-03-17',
        owner: 'Kaspars Naglis', 
        img: 'http://icons.iconseeker.com/png/fullsize/fruity-apples/seablue-512.png',
        completed: 100,
        planType: 'Public'
    },
    {
        key: '2',
        name: 'Kabada Intelligence Ltd.',
        industry: 'IT services',
        country: 'Germany',
        dateCreated: '2021-03-12',
        owner: 'Kaspars Naglis',
        img: 'http://icons.iconseeker.com/png/fullsize/fruity-apples/seablue-512.png',
        completed: 75,
        planType: 'Private'
    },
    {
        key: '3',
        name: 'Naglis SIA',
        industry: 'IT services',
        country: 'Germany',
        dateCreated: '2021-03-17',
        owner: 'Kaspars Naglis',
        img: 'http://icons.iconseeker.com/png/fullsize/fruity-apples/seablue-512.png',
        completed: 5,
        planType: 'Private'
    },
    {
        key: '4',
        name: 'Unicod Inc.',
        industry: 'Forests',
        country: 'Portugal',
        dateCreated: '2021-03-17',
        owner: 'Kaspars Naglis', 
        img: 'http://icons.iconseeker.com/png/fullsize/fruity-apples/seablue-512.png',
        completed: 100,
        planType: 'Public'
    },
    {
        key: '5',
        name: 'Kabada Intelligence Ltd.',
        industry: 'IT services',
        country: 'Germany',
        dateCreated: '2021-03-12',
        owner: 'Kaspars Naglis',
        img: 'http://icons.iconseeker.com/png/fullsize/fruity-apples/seablue-512.png',
        completed: 75,
        planType: 'Private'
    },
    {
        key: '6',
        name: 'Naglis SIA',
        industry: 'IT services',
        country: 'Germany',
        dateCreated: '2021-03-17',
        owner: 'Kaspars Naglis',
        img: 'http://icons.iconseeker.com/png/fullsize/fruity-apples/seablue-512.png',
        completed: 5,
        planType: 'Private'
    },
];