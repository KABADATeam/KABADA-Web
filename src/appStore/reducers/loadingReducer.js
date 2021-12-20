const loadingReducer = (state = false, action) => {
    switch (action.type) {
        case 'LOADING':
            return action.payload;
        default:
            return state;
    }
}

export const imageLoadingReducer = (state = false, action) => {
    switch (action.type) {
        case 'IMAGE_LOADING':
            return action.payload;
        default:
            return state;
    }
}

export const downloadLoadingReducer = (state = false, action) => {
    switch (action.type) {
        case 'DOWNLOAD_LOADING': 
            return action.payload;
        default: 
            return state;
    }
}

export const chartsLoadingReducer = (
    state = {
        survival_rate: false,
        greatness_industry: false,
        costs_productivity: false,
        company_size: false
    }, action) => {
    switch (action.type) {
        case 'SURVIVAL_RATE_LOADING':
            console.log(action.payload);
            return {
                ...state,
                'survival_rate': action.payload
            }
        case 'GREATNESS_INDUSTRY_LOADING':
            console.log(action.payload);
            return {
                ...state,
                'greatness_industry': action.payload
            }
        case 'COSTS_PRODUCTIVITY_INDUSTRY_LOADING':
            console.log(action.payload);
            return {
                ...state,
                'costs_productivity': action.payload
            }
        case 'COMPANY_SIZE_LOADING':
            console.log(action.payload);
            return {
                ...state,
                'company_size': action.payload
            }
        case 'RESET_LOADING':
            return {
                ...state,
                survival_rate: false,
                greatness_industry: false,
                costs_productivity: false,
                company_size: false
            }
        default:
            return state;
    }
}
export default loadingReducer;