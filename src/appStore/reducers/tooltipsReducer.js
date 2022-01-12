export const tooltipsReducer = ( state = {tooltips: []}, action ) => {
    switch (action.type) {
        case 'FETCHING_TOOLTIPS_SUCCESS':
            console.log(action.payload);
            return {
                ...state,
                tooltips: action.payload
            }
        default: 
            return state
    }
}