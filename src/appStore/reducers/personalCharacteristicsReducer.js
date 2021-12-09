export const personalCharacteristicsReducer = (state = {is_personal_characteristics_completed: false,planId: null, choices: []},action)=>{
    switch(action.type){
        case 'LOADING':
            return {...state,'loading':action.payload}
        case 'FETCHING_PERSONAL_CHARACTERISTICS_SUCCESS':
            return {...state, 'loading':false, 'choices':action.payload.choices, 'planId':action.payload.plan_id, is_personal_characteristics_completed: action.payload.is_personal_characteristics_completed}
        case 'SAVE_PERSONAL_CHARACTERISTICS_SUCCESS':
            return {...state, 'loading':false, 'choices':action.payload}
        case 'ERROR':
            return {...state, 'loading':false, 'error':action.payload}
        default:
            return state;
    }
}