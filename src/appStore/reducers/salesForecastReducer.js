export const salesForecastReducer = (
    state = {
        is_proposition_completed: false,
        productsTitles: [],
        products: [],
        product_id: 5,
        when_ready: 1,
        export: true,
        sales_forecast_eu: [],
        sales_forecast_non_eu: []
    }, action) => {
    switch (action.type) {
        case "FETCHING_PRODUCTS_SUCCESS":
            console.log(action.payload);
            return { ...state, "productsTitles": action.payload.products.map(obj => ({ ...obj, key: obj.id, Expoted: true })), "is_proposition_completed": action.payload.is_proposition_completed };
        case "SETING_PRODUCTS_SUCCESS":
            const productsTitles = state.products;
            productsTitles.forEach(element => {
                if (element.id === action.payload) {
                    console.log(element.id)
                    element.Expoted = !element.Expoted
                }
            });
            return { ...state, "productsTitles": productsTitles };

        case 'FETCHING_SALES_FORECASR_SUCCESS':
            //console.log('Reducer gauna:' + JSON.stringify(action.payload));
            const produktai = action.payload.products;
            // const is_sales_forecast_completed = action.payload.is_sales_forecast_completed;
            //console.log('gaunu kazka' + JSON.stringify(produktai));
            // const product_id = action.payload.product_id;
            // const when_ready = action.payload.when_ready;
            // const product_export = action.payload.export;
            // const sales_forecast_eu = action.payload.sales_forecast_eu.map(obj => ({ ...obj, "key": obj.category_id }));
            // const sales_forecast_non_eu = action.payload.sales_forecast_non_eu.map(obj => ({ ...obj, "key": obj.category_id }));
            // console.log("mmmmmmmmmmmmmmmmm" + JSON.stringify(sales_forecast_eu))
            // return { ...action.payload, "prodct_Id": product_id, "when_ready": when_ready, "product_export": product_export, "sales_forecast_eu": sales_forecast_eu, "sales_forecast_non_eu": sales_forecast_non_eu };
            return { ...state, "products": produktai };

        case "UPDATE_SALES_FORECAST_SUCCESS":
            const test = state.products;
            const productsaction = action.payload;
            // console.log(JSON.stringify(test) + ' cia as ');
            // console.log(JSON.stringify(productsaction) + ' action cia as ');
            // products.map((element, index) => {

            // })
            return { ...state };
        default:
            return state;
    }
};