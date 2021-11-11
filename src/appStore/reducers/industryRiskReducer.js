export const industryRiskReducer = (
    state = {
        risks: [],
        activeKey: ''
    }, action) => {
    switch (action.type) {
        case "FETCHING_RISKS_SUCCESS":
            console.log(action.payload.risks);
            return { ...state, 'risks': action.payload };

        case "FETCHING_RISKS_ACTIVE_KEY":
            console.log(action.payload);
            return { ...state, 'activeKey': action.payload };

        default:
            return state;
    }
};