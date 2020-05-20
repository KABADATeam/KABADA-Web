export const eurostatDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCHING_EUROSTATDATA_SUCCESS':
            console.log(action.payload);
            return action.payload;
        default:
            return state;
    }
}