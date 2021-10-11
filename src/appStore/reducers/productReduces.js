export const productsReducer = (
    state = {
        is_proposition_completed: false,
        products: []
    }, action) => {
    switch (action.type) {
        case "FETCHING_PRODUCTS_SUCCESS":
            return { ...state, "products": action.payload.products.map(obj => ({ ...obj, key: obj.id })), "is_proposition_completed": action.payload.is_proposition_completed };
        case "SAVE_PRODUCT_SUCCESS":
            const products = [...state.products, { ...action.payload }];
            return { ...state, "products": products };
        case "UPDATE_PRODUCT_SUCCESS":
            const products_ = state.products.map(x => x.id === action.payload.id ? action.payload : x);
            return { ...state, "products": products_ };
        case "REMOVING_PRODUCT_SUCCESS":
            const _products = state.products.filter(x => x.id !== action.payload);
            return { ...state, "products": _products };
        case "SAVE_STATE_SUCCESS":
            return { ...state, "is_proposition_completed": action.payload };
        default:
            return state;
    }
};

export const productTypesReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCHING_PRODUCT_TYPES_SUCCESS":
            return action.payload.map(obj => ({ ...obj, key: obj.id }));
        default:
            return state;
    }
};

export const productFeatureLevelsReducer = (state = { "priceLevels": [], "innovative": [], "quality": [], "differentiation": [] }, action) => {
    switch (action.type) {
        case "FETCHING_PRODUCT_PRICE_LEVELS_SUCCESS":
            return { ...state, "priceLevels": action.payload.map(obj => ({ ...obj, key: obj.id })) };
        case "FETCHING_PRODUCT_INNOVATIVE_LEVELS_SUCCESS":
            return { ...state, "innovative": action.payload.map(obj => ({ ...obj, key: obj.id })) };
        case "FETCHING_PRODUCT_QUALITY_LEVELS_SUCCESS":
            return { ...state, "quality": action.payload.map(obj => ({ ...obj, key: obj.id })) };
        case "FETCHING_PRODUCT_DIFFERENTIATION_LEVELS_SUCCESS":
            return { ...state, "differentiation": action.payload.map(obj => ({ ...obj, key: obj.id })) };
        default:
            return state;
    }
};

export const additionalIncomeSourcesReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCHING_ADDITIONAL_INCOME_SOURCES_SUCCESS":
            return action.payload.map(obj => ({ ...obj, key: obj.id }));
        default:
            return state;
    }
};

export const productFeaturesReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCHING_PRODUCT_FEATURES_SUCCESS":
            return action.payload.map(obj => ({ ...obj, key: obj.id }));
        default:
            return state;
    }
};

export const productReducer = (state = {}, action) => {
    switch (action.type) {
        case "SETTING_PRODUCT_TITLE_SUCCESS":
            return { ...state, "title": action.payload };
        case "SETTING_PRODUCT_TYPE_SUCCESS":
            return { ...state, "product_type": action.payload };
        case "SETTING_PRODUCT_DESCRIPTION_SUCCESS":
            return { ...state, "description": action.payload };
        case "SETTING_PRODUCT_PRICE_LEVEL_SUCCESS":
            return { ...state, "price_level": action.payload };
        case "SETTING_INCOME_SOURCES_SUCCESS":
            return { ...state, "selected_additional_income_sources": action.payload };
        case "SETTING_PRODUCT_FEATURES_SUCCESS":
            return { ...state, "product_features": action.payload };
        case "FETCHING_PRODUCT_SUCCESS":
            return action.payload;
        case "DISCARDING_PRODUCT_SUCCESS":
            return action.payload;
        default:
            return state;
    }
};