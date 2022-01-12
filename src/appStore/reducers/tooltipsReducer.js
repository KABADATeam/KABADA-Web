export const tooltipsReducer = ( state = [], action ) => {
    switch (action.type) {
        case 'FETCHING_TOOLTIPS_SUCCESS':
            console.log(action.payload);
            return {
                state: action.payload
            }
        default: 
            return state
    }
}