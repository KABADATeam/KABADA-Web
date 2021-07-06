export const partnersReducer = (
    state = {
        is_partners_completed: false,
        distributors: [],
        suppliers: [],
        others: []
    }, action) => {
    switch (action.type) {
        case "FETCHING_PARTNERS_SUCCESS":
            const distributors = action.payload.distributors.map(obj=> ({ ...obj, "key": obj.id, "priority": obj.is_priority === false ? 'No' : 'Yes' }));
            const suppliers = action.payload.suppliers.map(obj=> ({ ...obj, "key": obj.id, "priority": obj.is_priority === false ? 'No' : 'Yes' }));
            const others = action.payload.others.map(obj=> ({ ...obj, "key": obj.id, "priority": obj.is_priority === false ? 'No' : 'Yes' }));
            return { ...action.payload, "distributors": distributors, "suppliers": suppliers, "others": others };
        case "SAVE_DISTRIBUTOR_SUCCESS":
            const _distributors = [ ...state.distributors, { ...action.payload } ];
            return { ...state, "distributors": _distributors };
        case "SAVE_SUPPLIER_SUCCESS":
            const _suppliers = [ ...state.suppliers, { ...action.payload } ];
            return { ...state, "suppliers": _suppliers };
        case "SAVE_OTHER_SUCCESS":
            const _others = [ ...state.others, { ...action.payload } ];
            return { ...state, "others": _others };
        case "REMOVING_DISTRIBUTOR_SUCCESS":
            const distributors_ = state.distributors.filter(x => x.id !== action.payload);
            return { ...state, "distributors": distributors_ };
        case "REMOVING_SUPPLIER_SUCCESS":
            const suppliers_ = state.suppliers.filter(x => x.id !== action.payload);
            return { ...state, "suppliers": suppliers_ };
        case "REMOVING_OTHER_SUCCESS":
            const others_ = state.others.filter(x => x.id !== action.payload);
            return { ...state, "others": others_ };
        case "UPDATE_DISTRIBUTOR_SUCCESS":
            const _distributors_ = state.distributors.map(x => x.id === action.payload.id ? { ...action.payload } : x);
            return { ...state, "distributors": _distributors_ };
        case "UPDATE_SUPPLIER_SUCCESS":
            const _suppliers_ = state.suppliers.map(x => x.id === action.payload.id ? { ...action.payload } : x);
            return { ...state, "suppliers": _suppliers_ };
        case "UPDATE_OTHER_SUCCESS":
            const _others_ = state.others.map(x => x.id === action.payload.id ? { ...action.payload } : x);
            return { ...state, "others": _others_ };
        case "SAVE_STATE_SUCCESS":
            return { ...state, "is_partners_completed": action.payload };
        default:
            return state;
    }
};

export const partnersCategoriesReducer = (state = {}, action) => {
    switch (action.type) {
        case 'FETCHING_PARTNERS_CATEGORIES_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}

export const selectedPartnersCategoryReducer = (state = { title: "", types: [] }, action) => {
    switch (action.type) {
        case 'SELECTING_PARTNERS_CATEGORY_SUCCESS':
            return { ...state, title: action.payload.title, types: action.payload.items };
        default:
            return state;
    }
}

export const selectedPartnersCategoryTypeReducer = (state = { title: "" }, action) => {
    switch (action.type) {
        case 'SELECTING_PARTNERS_CATEGORY_TYPE_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}
