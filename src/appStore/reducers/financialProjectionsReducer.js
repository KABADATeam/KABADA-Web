export const financialProjectionsReducer = (
    state = {
        country_vats: [],
        fixed_costs: [],
        variable_costs: []
    }, action) => {
        switch(action.type){
            case 'FETCHING_FINANCIAL_PROJECTION_SUCCESS':
                console.log(action.payload)
                const fixed_costs = action.payload.fixed_costs.map(obj => ({...obj, "key": obj.category_id}))
                const variable_costs = action.payload.variable_costs.map(obj => ({...obj, "key": obj.category_id}))
                return {...action.payload, "fixed_costs": fixed_costs, "variable_costs": variable_costs};
            case 'FETCHING_FINANCIAL_PROJECTION_VAT_SUCCESS':
                console.log(action.payload)
                const country_vats = action.payload;
                return {...action.payload, "country_vats": country_vats};
            case 'SAVE_FINANCIAL_PROJECTION_COST_SUCCESS':
                if(action.payload.number == 1){
                    const fixed_costs = [...state.fixed_costs, {...action.payload}]
                    return {...state, "fixed_costs":fixed_costs}
                }
                if(action.payload.number == 2){
                    const variable_costs = [...state.variable_costs, {...action.payload}]
                    return {...state, "variable_costs":variable_costs}
                }
            case 'UPDATE_FINANCIAL_PROJECTION_COST_SUCCESS':
                if(action.payload.number == 1){
                    const fixed_costs = state.fixed_costs.map(x => x.id === action.payload.id ? action.payload : x);
                    return {...state, "fixed_costs":fixed_costs}
                }
                if(action.payload.number == 2){
                    const variable_costs = state.variable_costs.map(x => x.id === action.payload.id ? action.payload : x);
                    return {...state, "variable_costs":variable_costs}
                }
        }
    }