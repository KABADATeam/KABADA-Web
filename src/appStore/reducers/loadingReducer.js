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
        company_size: false,
        surivival_error: null,
        greatness_industry_error: null,
        costs_productivity_error: null,
        company_size_error: null,
    }, action) => {
    switch (action.type) {
        case 'SURVIVAL_RATE_LOADING':
            return {
                ...state,
                "survival_rate": action.payload
            }
        case 'GREATNESS_INDUSTRY_LOADING':
            return {
                ...state,
                "greatness_industry": action.payload
            }
        case 'COSTS_PRODUCTIVITY_INDUSTRY_LOADING':
            return {
                ...state,
                "costs_productivity": action.payload
            }
        case 'COMPANY_SIZE_LOADING':
            return {
                ...state,
                "company_size": action.payload
            }
        case 'SURVIVAL_RATE_ERROR':
            return {
                ...state,
                "survival_rate": action.payload.state,
                "survival_error": action.payload.error
            }
        case 'COMPANY_SIZE_ERROR':
            return {
                ...state,
                "company_size": action.payload.state,
                "company_size_error": action.payload.error
            }
        case 'GREATNESS_INDUSTRY_ERROR':
            return {
                ...state,
                "greatness_industry": action.payload.state,
                "greatness_industry_error": action.payload.error
            }
        case 'RESET_LOADING':
            return {
                ...state,
                survival_rate: false,
                greatness_industry: false,
                costs_productivity: false,
                company_size: false,
                surivival_error: null,
                greatness_industry_error: null,
                costs_productivity_error: null,
                company_size_error: null,
            }
        default:
            return state;
    }
}
export default loadingReducer;