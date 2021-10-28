export const financialProjectionsReducer = (
    state = {
        is_fixed_variable_completed: false,
        fixed: [],
        variable: [],
        financialObject: {}
    }, action) => {
    switch (action.type) {
        case 'FETCHING_FINANCIAL_PROJECTION_SUCCESS':
            const fixed = action.payload.fixed.map(obj => ({ ...obj, "key": obj.category_id }));
            const variable = action.payload.variable.map(obj => ({ ...obj, "key": obj.category_id }));
            return { ...action.payload, "fixed": fixed, "variable": variable, "financialObject": action.payload };
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
        default:
            return state;
    }
}


