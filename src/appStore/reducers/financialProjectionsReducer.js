export const financialProjectionsReducer = (
    state = {
        is_fixed_variable_completed: false,
        original_fixed: [],
        original_variable: [],
        original_cost_items: [],
        cost_items: [],
        fixed: [],
        variable: [],
        period: null,
        payment_period: null
    }, action) => {
    switch (action.type) {
        case 'FETCHING_INVESTMENT_SUCCESS':
            return { ...state, "period": action.payload.period, "payment_period": action.payload.payment_period }
        case 'FETCHING_FINANCIAL_PROJECTION_SUCCESS':
            const fixed_costs = action.payload.fixed.map(obj => ({ ...obj, "key": obj.category_id }));
            const variable_costs = action.payload.variable.map(obj => ({ ...obj, "key": obj.category_id }));
            const original_fixed = [...fixed_costs]
            const original_variable = [...variable_costs]
            //The flatMap() method returns a new array formed by applying a given callback function 
            //to each element of the array, and then flattening the result by one level
            const fixed_cost_items = fixed_costs ? fixed_costs.flatMap(v => v.types) : []
            const variable_cost_items = variable_costs ? variable_costs.flatMap(v => v.types) : []
            const cost_items = [...fixed_cost_items, ...variable_cost_items]
            const original_cost_items = [...cost_items]
            return { ...action.payload, "fixed": fixed_costs, "variable": variable_costs, "original_fixed": original_fixed, 'original_variable': original_variable, 'cost_items': cost_items, 'original_cost_items': original_cost_items };
        case 'FIXED_COSTS_UPDATE_SUCCESS':
            const fixed_costs_u = [...state.fixed]
            const cost_items_c = [...state.cost_items]
            // const index = cost_items_c.findIndex(x => x.cost_item_id === action.payload.item.cost_item_id)
            //map through fixed array each element. return ...v what is already in it. then map through element of fixed
            //then map through that element types. find obj in types with same cost_item_id as action.payload.item.cost_item_id,
            //then return obj, keep whats already in it and i change one particular value
            const fixed_costs_updated = fixed_costs_u ? fixed_costs_u.map(v => ({
                ...v, types: v.types.map(obj => obj.cost_item_id === action.payload.item.cost_item_id ? ({ ...obj, [action.payload.name]: action.payload.value }) : obj)
            })) : []
            const updated_cost_items = cost_items_c.map(x => x.cost_item_id === action.payload.item.cost_item_id ? action.payload.item : x)
            return { ...state, loading: false, fixed: fixed_costs_updated, cost_items: updated_cost_items }
        //if there is already such item in cost_items array. update it
        // if (index !== -1) {
        //     const updated_cost_items = cost_items_c.map(x => x.cost_item_id === action.payload.item.cost_item_id ? action.payload.item : x)
        //     return { ...state, loading: false, fixed: fixed_costs_updated, cost_items: updated_cost_items }
        // } else {
        //     const new_cost_items = [...cost_items_c, { ...action.payload.item }]
        //     return { ...state, loading: false, fixed: fixed_costs_updated, cost_items: new_cost_items }
        // }
        case 'VARIABLE_COSTS_UPDATE_SUCCESS':
            const variable_costs_u = [...state.variable]
            const cost_items_d_c = [...state.cost_items]
            // const index_d_c = cost_items_d_c.findIndex(x => x.cost_item_id === action.payload.item.cost_item_id)
            //map through variable array each element. return ...v what is already in it. then map through element of fixed
            //then map through that element types. find obj in types with same cost_item_id as action.payload.item.cost_item_id,
            //then return obj, keep whats already in it and i change one particular value
            const variable_costs_updated = variable_costs_u ? variable_costs_u.map(v => ({
                ...v, types: v.types.map(obj => obj.cost_item_id === action.payload.item.cost_item_id ? ({ ...obj, [action.payload.name]: action.payload.value }) : obj)
            })) : []
            const updated_cost_items_d = cost_items_d_c.map(x => x.cost_item_id === action.payload.item.cost_item_id ? action.payload.item : x)
            return { ...state, loading: false, variable: variable_costs_updated, cost_items: updated_cost_items_d }
        //if there is already such item in cost_items array. update it
        // if (index_d_c !== -1) {
        //     const updated_cost_items_d = cost_items_d_c.map(x => x.cost_item_id === action.payload.item.cost_item_id ? action.payload.item : x)
        //     return { ...state, loading: false, fixed: variable_costs_updated, cost_items: updated_cost_items_d }
        // } else {
        //     const new_cost_items_d = [...cost_items_c, { ...action.payload.item }]
        //     return { ...state, loading: false, fixed: variable_costs_updated, cost_items: new_cost_items_d }
        // }
        case "UPDATE_FIXED_AND_VAR_COSTS_SUCCESS":
            const items = action.payload.postObject.cost_items;
            const fixedArray = state.fixed;
            const variableArray = state.variable;

            items.map((element, index) => {
                fixedArray.map((element1, index1) => {
                    element1.types.map((element2, index2) => {
                        if (element.cost_item_id === element2.cost_item_id) {
                            element2.price = element.price;
                            element2.vat = element.vat;
                            element2.first_expenses = element.first_expenses;
                            element2.monthly_expenses = element.monthly_expenses;
                        }
                    })
                })
            });
            items.map((element, index) => {
                variableArray.map((element1, index1) => {
                    element1.types.map((element2, index2) => {
                        if (element.cost_item_id === element2.cost_item_id) {
                            element2.price = element.price;
                            element2.vat = element.vat;
                            element2.first_expenses = element.first_expenses;
                            element2.monthly_expenses = element.monthly_expenses;
                        }
                    })
                })
            });

            // console.log('Modified fixed array:' + JSON.stringify(fixedArray))
            // console.log('Modified variable array:' + JSON.stringify(variableArray))
            return { ...state, "fixed": fixedArray, "variable": variableArray };
        case "SAVE_STATE_SUCCESS":
            return { ...state, "is_fixed_variable_completed": action.payload };
        case 'DISCARD_CHANGES_SUCCESS':
            let discard_cost_items = JSON.parse(JSON.stringify(state.original_cost_items));
            let discard_fixed = JSON.parse(JSON.stringify(state.original_fixed));
            let discard_variable = JSON.parse(JSON.stringify(state.original_variable));
            return { ...state, cost_items: discard_cost_items, fixed: discard_fixed, variable: discard_variable }
        default:
            return state;
    }
}


