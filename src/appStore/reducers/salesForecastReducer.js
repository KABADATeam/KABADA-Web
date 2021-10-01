export const salesForecastReducer = (
    state = {
        is_proposition_completed: false,
        products: []
    }, action) => {
    switch (action.type) {
        case "FETCHING_PRODUCTS_SUCCESS":
            return { ...state, "products": action.payload.products.map(obj => ({ ...obj, key: obj.id })), "is_proposition_completed": action.payload.is_proposition_completed };
        default:
            return state;
    }
};