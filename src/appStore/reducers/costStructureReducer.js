export const costStructureReducer = (
    state = {
        is_cost_completed: false,
        fixed_costs: [],
        variable_costs: [],
        ai_cost_structure_predict: []
    }, action) => {
    switch (action.type) {
        case 'FETCHING_COST_STRUCTURE_SUCCESS':
            console.log(action.payload)
            const fixed_costs = action.payload.fixed_costs.map(obj => ({...obj, "key": obj.category_id}))
            const variable_costs = action.payload.variable_costs.map(obj => ({...obj, "key": obj.category_id}))
            return { ...action.payload, "fixed_costs": fixed_costs, "variable_costs": variable_costs};
        case "SAVE_COST_SUCCESS":
            if (action.payload.number === 1) {
                const fixed_costs = [ ...state.fixed_costs, { ...action.payload } ];
                return { ...state, "fixed_costs": fixed_costs };
            }
            if (action.payload.number === 2) {
                const variable_costs = [ ...state.variable_costs, { ...action.payload } ];
                return { ...state, "variable_costs": variable_costs };
            }
            return state;
        case "UPDATE_COST_SUCCESS":
            if (action.payload.number === 1) {
                const fixed_costs = state.fixed_costs.map(x => x.id === action.payload.id ? action.payload : x);
                return { ...state, "fixed_costs": fixed_costs };
            }
            if (action.payload.number === 2) {
                const variable_costs = state.variable_costs.map(x => x.id === action.payload.id ? action.payload : x);
                return { ...state, "variable_costs": variable_costs };
            }
            return state;
        case "REMOVING_COST_SUCCESS":
            if (action.payload.number === 1) {
                const fixed_costs = state.fixed_costs.filter(x => x.id !== action.payload.id);
                return { ...state, "fixed_costs": fixed_costs };
            }
            if (action.payload.number === 2) {
                const variable_costs = state.variable_costs.filter(x => x.id !== action.payload.id);
                return { ...state, "variable_costs": variable_costs };
            }
            return state;
        case "SAVE_STATE_SUCCESS":
            return {...state, "is_cost_completed": action.payload }
        case 'GET_COST_STRUCTURE_AI_PREDICT':
            return {...state, loading: false, "ai_cost_structure_predict": action.payload}
        case 'GET_COST_STRUCTURE_AI_PREDICT_FAIL':
            return {...state, loading: false}
        default:
            return state
    }
}

export const costStructureCategoriesReducer = (
    state = {
        fixed_categories: [],
        variable_categories: [],
    }, action) => {
    switch (action.type) {
        case 'FETCHING_COST_STRUCTURE_CATEGORIES_SUCCESS':
            return { ...state, "fixed_categories": action.payload.fixed_categories, "variable_categories": action.payload.variable_categories };
        case 'SET_COST_STRUCTURE_CATEGORY_SUCCESS':
            console.log(action.payload)
            if(action.payload.costNumber === 1) {
                const f_costs = state.fixed_categories.map(x => x.category_id === action.payload.id ? { ...x, key: action.payload.key, tag: action.payload.tag } : x)
                return { ...state, "fixed_categories": f_costs}
            } else if (action.payload.costNumber === 2) {
                const v_categories = state.variable_categories.map(x => x.category_id === action.payload.id ? action.payload : x)
                return { ...state, "variable_categories": v_categories}
            } else {
                return { ...state }
            }
        default:
            return state;
    }
}

export const selectedCostCategoryReducer = (state = { title: "", description: "", types: [] }, action) => {
    switch (action.type) {
        case 'SELECTING_COST_CATEGORY_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}