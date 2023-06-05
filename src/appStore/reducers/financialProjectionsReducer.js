export const financialProjectionsReducer = (
    state = {
        windows_state: 'hidden',
        is_fixed_variable_completed: false,
        original_fixed: [],
        original_variable: [],
        original_cost_items: [],
        cost_items: [],
        fixed: [],
        variable: [],
        save_cost_items: [],
        period: null,
        payment_period: null,
    }, action) => {
    switch (action.type) {
        case 'FETCHING_INVESTMENT_SUCCESS':
            return { ...state, "period": action.payload.period, "payment_period": action.payload.payment_period }
        case 'FETCHING_FINANCIAL_PROJECTION_SUCCESS':
            // console.log('variable_costs'+JSON.stringify(fixed_costs))
            const fixed_costs = action.payload.fixed ? action.payload.fixed.map(obj => ({ ...obj, "key": obj.category_id })):[];
            const variable_costs = action.payload.variable?action.payload.variable.map(obj => ({ ...obj, "key": obj.category_id })):[];
            const original_fixed = [...fixed_costs]
            const original_variable = [...variable_costs]
            //The flatMap() method returns a new array formed by applying a given callback function 
            //to each element of the array, and then flattening the result by one level
            const fixed_cost_items = fixed_costs ? fixed_costs.flatMap(v => v.types) : []
            const variable_cost_items = variable_costs ? variable_costs.flatMap(v => v.types) : []
            const cost_items = [...fixed_cost_items, ...variable_cost_items]
            const original_cost_items = [...cost_items]
            return { ...state, "fixed": fixed_costs, "variable": variable_costs, "original_fixed": original_fixed, 'original_variable': original_variable, 'cost_items': cost_items, 'original_cost_items': original_cost_items, windows_state: 'hidden',save_cost_items: [] };
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
        case "UPDATE_FIXED_AND_VAR_COSTS_SUCCESS":
            const modified_fixed_c = [...state.fixed]
            const modified_variable_c = [...state.variable]
            const o_cost_items_c_d = [...state.cost_items]
            return { ...state,original_fixed: modified_fixed_c,original_variable: modified_variable_c,original_cost_items: o_cost_items_c_d,save_cost_items: [] };
        case "SAVE_STATE_SUCCESS":
            return { ...state, "is_fixed_variable_completed": action.payload };
        case 'DISCARD_CHANGES_SUCCESS':
            let discard_cost_items = JSON.parse(JSON.stringify(state.original_cost_items));
            let discard_fixed = JSON.parse(JSON.stringify(state.original_fixed));
            let discard_variable = JSON.parse(JSON.stringify(state.original_variable));
            return { ...state, cost_items: discard_cost_items, fixed: discard_fixed, variable: discard_variable }
        case 'GET_WINDOWS_STATE_SUCCESS':
            if (JSON.stringify(state.original_cost_items) == JSON.stringify(state.cost_items)) {
                return { ...state, windows_state: 'hidden' }
            } else {
                return { ...state, windows_state: 'visible' }
            }
        case 'SET_ITEMS_TO_SAVE':
            const o_cost_items = [...state.original_cost_items]
            const c_cost_items = [...state.cost_items]
            const array = []
            c_cost_items.forEach((element, index) => {
                if (c_cost_items[index].price !== o_cost_items[index].price ||
                    c_cost_items[index].vat !== o_cost_items[index].vat ||
                    c_cost_items[index].first_expenses !== o_cost_items[index].first_expenses ||
                    c_cost_items[index].price !== o_cost_items[index].price ||
                    c_cost_items[index].monthly_expenses !== o_cost_items[index].monthly_expenses) {

                    const obj = {
                        cost_item_id: c_cost_items[index].cost_item_id,
                        price: c_cost_items[index].price === null ? 0 : c_cost_items[index].price,
                        vat: c_cost_items[index].vat === null ? action.payload.countryVats.standardRate:c_cost_items[index].vat,
                        first_expenses: c_cost_items[index].first_expenses !== null ? c_cost_items[index].first_expenses : 1,
                        monthly_expenses: c_cost_items[index].monthly_expenses
                    }
                    array.push(obj)

                }
            });
            return {...state, save_cost_items: array}
        default:
            return state;
    }
}


