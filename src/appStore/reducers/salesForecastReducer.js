export const salesForecastReducer = (
    state = {
        is_sales_forecast_completed: false,
        productsTitles: [],
        products: [],
        product_id: 0,
        when_ready: 1,
        export: true,
        sales_forecast_eu: [],
        sales_forecast_non_eu: []
    }, action) => {
    switch (action.type) {
        case "FETCHING_SALES_PRODUCTS_SUCCESS":
            const test = action.payload.products.map(obj => ({ ...obj, key: obj.id, Expoted: true }));
            return { ...state, "productsTitles": action.payload.products.map(obj => ({ ...obj, key: obj.id, Expoted: true })) };
        case "SETING_PRODUCTS_SUCCESS":
            const productsTitles = state.products;
            productsTitles.forEach(element => {
                if (element.id === action.payload) {
                    element.Expoted = !element.Expoted
                }
            });
            return { ...state, "productsTitles": productsTitles };

        case 'FETCHING_SALES_FORECASR_SUCCESS':
            const products = action.payload.products;
            const is_sales_forecast_completed = action.payload.is_sales_forecast_completed;
            return { ...state, "products": products, "is_sales_forecast_completed": is_sales_forecast_completed };

        case "UPDATE_SALES_FORECAST_SUCCESS":
            const prodoct = state.products;
            const productsaction = action.payload.products;
            prodoct.map((element, index) => {
                productsaction.map((element2, index2) => {
                    if (element.product_id === element2.product_id) {
                        element.when_ready = element2.when_ready;
                        element.export = element2.export;
                        element.sales_forecast_eu = element2.sales_forecast_eu;
                        element.sales_forecast_non_eu = element2.sales_forecast_non_eu;
                    }
                })
            })
            return { ...state, 'products': state.products };
        case "SAVE_STATE_SUCCESS":
            return { ...state, "is_sales_completed": action.payload };

        default:
            return state;
    }
};