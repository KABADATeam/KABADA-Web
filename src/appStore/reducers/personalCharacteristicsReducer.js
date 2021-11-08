export const personalCharacteristicsReducer = (state = {choices: [] },action)=>{
    switch(action.type){
        case 'LOADING':
            return {...state,'loading':action.payload}
        case 'FETCHING_PERSONAL_CHARACTERISTICS_SUCCESS':
            const newChoices = action.payload.choices;
            return {...state, 'loading':false, 'choices':newChoices}
        case 'SAVE_PERSONAL_CHARACTERISTICS_SUCCESS':
            return {...state, 'loading':false, 'choices':action.payload}
        case 'ERROR':
            return {...state, 'loading':false, 'error':action.payload}
        default:
            return state;
    }
}