export const financialProjectionsReducer = (
    state = {
        is_fixed_variable_completed: false,
        fixed: [],
        variable: []
    }, action) => {
    switch (action.type) {
        case 'FETCHING_FINANCIAL_PROJECTION_SUCCESS':
            const fixed_types = [];
            const variable_types = [];
            const all_types = [];
            const fixed = action.payload.fixed.map(obj => ({ ...obj, "key": obj.category_id }));
            const variable = action.payload.variable.map(obj => ({ ...obj, "key": obj.category_id }));
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
            return { ...action.payload, "fixed": fixed, "variable": variable, "fixed_types": fixed_types, "variable_types": variable_types, "all_types": all_types };
        case "UPDATE_FIXED_AND_VAR_COSTS_SUCCESS":
            const items = action.payload.postObject.cost_items;
            const fixedArray = state.fixed;
            const variableArray = state.variable;

            console.log('Action payload: ' + JSON.stringify(items))
            console.log('Original fixed array:' + JSON.stringify(state.fixed));
            console.log('Original variable array:' + JSON.stringify(state.variable));


            // loop through items array and check if fixed array each object types array  has items with
            // same cost_item_id. if yes then im changing the field values that need to be changed
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
           
            console.log('Modified fixed array:' + JSON.stringify(fixedArray))
            console.log('Modified variable array:' + JSON.stringify(variableArray))
            return {...state,"fixed":fixedArray,"variable":variableArray};
        case 'SAVE_FINANCIAL_PROJECTION_COST_SUCCESS':
            if (action.payload.number === 1) {
                const fixed = [...state.fixed, { ...action.payload }];
                return { ...state, "fixed": fixed };
            }
            if (action.payload.number === 2) {
                const variable_costs = [...state.variable, { ...action.payload }];
                return { ...state, "variable": variable_costs };
            }
            return state;
        default:
            return state;
    }
}


