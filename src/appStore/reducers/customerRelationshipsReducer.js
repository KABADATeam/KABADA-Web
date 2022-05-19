export const customerRelationshipsCategoriesReducer = (
    state = {
        categories: [],
        selected_category: null
    }, action) => {
    switch (action.type) {
        case 'FETCHING_CUSTOMER_RELATIONSHIPS_CATEGORIES_SUCCESS':
            const categories = action.payload.categories.map(obj => ({ ...obj, "key": obj.id, "tag": 0 }))
            return { ...state, "categories": categories };
        case 'SELECTING_RELATIONSHIP_CATEGORY_SUCCESS':
            const selected_category = action.payload;
            return { ...state, "selected_category": selected_category };
        case 'SET_RELATIONSHIP_CATEGORY_SUCCESS':
            console.log(action.payload);
            const updated_categories = state.categories.map(x => x.id === action.payload.id ? action.payload : x)
            console.log(updated_categories);
            return { ...state, "categories": updated_categories}
        default:
            return state;
    }
}

export const customerRelationshipsReducer = (
    state = {
        is_customer_relationship_completed: false,
        how_to_get_new: [],
        how_to_keep_existing: [],
        how_to_make_spend: [],
        ai_customer_relationship_predict: []
    }, action) => {
    switch (action.type) {
        case "SAVE_STATE_SUCCESS":
            return { ...state, "is_customer_relationship_completed": action.payload };
        case "FETCHING_CUSTOMER_RELATIONSHIPS_SUCCESS":
            const how_to_get_new_w_k = action.payload.how_to_get_new ? action.payload.how_to_get_new.map(obj => ({ ...obj, "key": obj.id })) : [];
            const how_to_keep_existing_w_k = action.payload.how_to_keep_existing ? action.payload.how_to_keep_existing.map(obj => ({ ...obj, "key": obj.id })) : [];
            const how_to_make_spend_w_k = action.payload.how_to_make_spend ? action.payload.how_to_make_spend.map(obj => ({ ...obj, "key": obj.id })) : [];
            return { ...state, "how_to_get_new": how_to_get_new_w_k, "how_to_keep_existing": how_to_keep_existing_w_k, "how_to_make_spend": how_to_make_spend_w_k, "is_customer_relationship_completed": action.payload.is_customer_relationship_completed };
        case "SAVE_CUSTOMER_RELATIONSHIP_SUCCESS":
            if (action.payload.group === 1) {
                const segment = [...state.how_to_get_new, { ...action.payload }];
                return { ...state, "how_to_get_new": segment };
            }
            if (action.payload.group === 2) {
                const segment = [...state.how_to_keep_existing, { ...action.payload }];
                return { ...state, "how_to_keep_existing": segment };
            }
            if (action.payload.group === 3) {
                const segment = [...state.how_to_make_spend, { ...action.payload }];
                return { ...state, "how_to_make_spend": segment };
            }
            return state;
        case "REMOVING_CUSTOMER_RELATIONSHIP_SUCCESS":
            if (action.payload.group === 1) {
                const segment = state.how_to_get_new.filter(x => x.id !== action.payload.id);
                return { ...state, "how_to_get_new": segment };
            }
            if (action.payload.group === 2) {
                const segment = state.how_to_keep_existing.filter(x => x.id !== action.payload.id);
                return { ...state, "how_to_keep_existing": segment };
            }
            if (action.payload.group === 3) {
                const segment = state.how_to_make_spend.filter(x => x.id !== action.payload.id);
                return { ...state, "how_to_make_spend": segment };
            }
            return state;
        case "UPDATE_CUSTOMER_RELATIONSHIP_SUCCESS":
            if (action.payload.group === 1) {
                const segment = state.how_to_get_new.map(x => x.id === action.payload.id ? action.payload : x);
                return { ...state, "how_to_get_new": segment };
            }
            if (action.payload.group === 2) {
                const segment = state.how_to_keep_existing.map(x => x.id === action.payload.id ? action.payload : x);
                return { ...state, "how_to_keep_existing": segment };
            }
            if (action.payload.group === 3) {
                const segment = state.how_to_make_spend.map(x => x.id === action.payload.id ? action.payload : x);
                return { ...state, "how_to_make_spend": segment };
            }
            return state;
        case "GET_AI_CUSTOMER_RELATIONSHIP_PREDICT_SUCCESS": 
            return {
                ...state,
                "ai_customer_relationship_predict": action.payload
            }
        default:
            return state;
    }
}