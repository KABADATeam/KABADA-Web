export const industryRiskReducer = (
    state = {
        risks: []
    }, action) => {
    switch (action.type) {
        case "FETCHING_RISKS_SUCCESS":
            console.log(action.payload.risks);
            return { ...state, 'risks': action.payload };


        default:
            return state;
    }
};