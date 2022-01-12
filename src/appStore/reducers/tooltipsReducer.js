export const tooltipsReducer = ( state = {tooltips: []}, action ) => {
    switch (action.type) {
        case 'FETCHING_TOOLTIPS_SUCCESS':
            return {
                ...state,
                tooltips: action.payload
            }
        default: 
            return state
    }
}