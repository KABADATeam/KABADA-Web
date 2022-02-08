export const personalCharacteristicsReducer = (state = { is_personal_characteristics_completed: false, planId: null, choices: [], completed_choices: 0 }, action) => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, 'loading': action.payload }
        case 'FETCHING_PERSONAL_CHARACTERISTICS_SUCCESS':
            return { ...state, 'loading': false, 'choices': action.payload.choices, 'planId': action.payload.plan_id, is_personal_characteristics_completed: action.payload.is_personal_characteristics_completed }
        case 'FETCHING_COMPLETED_PERSONAL_CHARACTERISTICS_SUCCESS':
            const choices_clone = [...action.payload.choices]
            const completed = choices_clone.filter(x => x.selection_code !== null && x.selection_code !== undefined && x.selection_code !== "").length;
            return { ...state, 'loading': false, completed_choices: completed, 'choices': action.payload.choices, 'planId': action.payload.plan_id, is_personal_characteristics_completed: action.payload.is_personal_characteristics_completed }
        case 'SAVE_PERSONAL_CHARACTERISTICS_SUCCESS':
            return { ...state, 'loading': false, 'choices': action.payload }
        case 'FETCHING_COMPLETED_PERSONAL_CHARACTERISTICS_ERROR':
            return { ...state, 'loading': false, 'error': action.payload, completed_choices: 0, choices: [], is_personal_characteristics_completed: false }
        case 'ERROR':
            return { ...state, 'loading': false, 'error': action.payload }
        default:
            return state;
    }
}