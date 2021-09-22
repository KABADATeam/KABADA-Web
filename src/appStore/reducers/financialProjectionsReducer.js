export const financialProjectionsReducer = (
    state = {
        is_fixed_variable_completed: false,
        fixed: [],
        variable: []
    }, action) => {
        switch(action.type){
            case 'FETCHING_FINANCIAL_PROJECTION_SUCCESS':
                console.log("YEEEE") 
                console.log(action.payload)   
                const fixed_types = [];
                const variable_types = [];
                const all_types = [];
                const fixed = action.payload.fixed.map(obj => ({...obj, "key": obj.category_id}));
                const variable = action.payload.variable.map(obj => ({...obj, "key": obj.category_id}));
                //loop through each element in fixed list, then loop through each element types[] array
                //and add each element types objects to fixed_types array
                fixed.forEach(element => {
                    const types = element.types;
                    types.forEach(element => {
                        fixed_types.push(element);
                        all_types.push(element);
                    });
                });
                variable.forEach(element => {
                    const types = element.types;
                    types.forEach(element => {
                        variable_types.push(element);
                        all_types.push(element);
                    });
                });
                return { ...action.payload, "fixed":fixed, "variable":variable, "fixed_types": fixed_types, "variable_types":variable_types, "all_types":all_types};
            case "UPDATE_FINANCIAL_PROJECTION_COST_SUCCESS":
                if (action.payload.number === 1) {
                    const fixed = state.fixed.map(x => x.id === action.payload.id ? action.payload : x);
                    return { ...state, "fixed": fixed };
                }
                if (action.payload.number === 2) {
                    const variable_costs = state.variable.map(x => x.id === action.payload.id ? action.payload : x);
                    return { ...state, "variable": variable_costs };
                }
                return state;
            case 'SAVE_FINANCIAL_PROJECTION_COST_SUCCESS':
                if (action.payload.number === 1) {
                    const fixed = [ ...state.fixed, { ...action.payload } ];
                    return { ...state, "fixed": fixed };
                }
                if (action.payload.number === 2) {
                    const variable_costs = [ ...state.variable, { ...action.payload } ];
                    return { ...state, "variable": variable_costs };
                }
                return state;
            default:
                return state;
        }
    }
    export const countryVatsReducer = (
        state = {}, action) => {
            switch(action.type){
                case 'FETCHING_FINANCIAL_PROJECTION_VAT_SUCCESS':
                    console.log('HELL' +action.payload)
                    const country_vats = action.payload;
                    return {...action.payload};
                default:
                    return state;
            }
        }
    