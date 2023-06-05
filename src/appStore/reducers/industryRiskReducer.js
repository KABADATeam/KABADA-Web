export const industryRiskReducer = (
    state = {
        risks: [],
        activeKey: ''
    }, action) => {
    switch (action.type) {
        case "FETCHING_RISKS_SUCCESS":
            return { ...state, 'risks': action.payload };

        case "FETCHING_RISKS_ACTIVE_KEY":
            return { ...state, 'activeKey': action.payload };

        default:
            return state;
    }
};