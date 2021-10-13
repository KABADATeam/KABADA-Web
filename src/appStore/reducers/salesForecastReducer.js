export const salesForecastReducer = (
    state = {
        is_proposition_completed: false,
        products: []
    }, action) => {
    switch (action.type) {
        case "FETCHING_PRODUCTS_SUCCESS":
            return { ...state, "products": action.payload.products.map(obj => ({ ...obj, key: obj.id, Expoted: true })), "is_proposition_completed": action.payload.is_proposition_completed };
        case "SETING_PRODUCTS_SUCCESS":
            const products = state.products;
            products.forEach(element => {
                if (element.id === action.payload) {
                    console.log(element.id)
                    element.Expoted = !element.Expoted
                }
            });
            return { ...state, "products": products }
        default:
            return state;
    }
};