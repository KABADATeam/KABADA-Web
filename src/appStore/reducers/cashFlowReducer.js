export const cashFlowReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCHING_CASHFLOW_SUCCESS":
            //return action.payload.map(obj => ({ ...obj, key: obj.id }));
            console.log(action.payload)
            return action.payload;
        default:
            return state;
    }
};