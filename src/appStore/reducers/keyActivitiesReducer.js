export const keyActivitiesReducer = (
    state = {
        is_activities_completed: false,
        products: [],
    }, action ) => {
        switch (action.type) {
            case 'FETCHING_KEY_ACTIVITIES_SUCCESS':
                const products = action.payload.products.map(obj => ({...obj, "key": obj.id}))  
                return {...action.payload, "products": products};
            case "SAVE_KEY_ACTIVITY_SUCCESS":
                // console.log('action payload:'+JSON.stringify(action.payload))
                const product = state.products.find(obj => obj.id === action.payload.product_id);
                const activity_object = { ...action.payload, "sub_type_name": action.payload.sub_type_title, "type_name": action.payload.category_title, "type_id": action.payload.category_id };
                var activities = []
                if(product.activities === null || product.activities === undefined){
                    activities = [ ...activities, { ...activity_object } ];
                }else{
                    activities = [ ...product.activities, { ...activity_object } ];
                }    
                const product_activities = {...product, "activities": activities};
                const products_ = state.products.map(x => x.id === product.id ? product_activities: x);
                return {...state, "products": products_};
            case "REMOVING_ACTIVITY_SUCCESS":
                const product_ = state.products.find(obj => obj.id === action.payload.product_id);
                const activities_ = product_.activities.filter(x => x.id !== action.payload.id);
                const product_activities_ = {...product_, "activities": activities_};
                const _products = state.products.map(x => x.id === product_.id ? product_activities_: x);
                return { ...state, "products": _products };
            case "UPDATE_KEY_ACTIVITY_SUCCESS":
                const _product = state.products.find(obj => obj.id === action.payload.product_id);
                const _activity_object = {...action.payload, "sub_type_name": action.payload.sub_type_title, "type_name": action.payload.category_title, "type_id": action.payload.category_id};
                const _activities = _product.activities.map(x => x.id === action.payload.id ? _activity_object : x);
                const _product_activities = {..._product, "activities": _activities};
                const __products = state.products.map(x => x.id === _product.id ? _product_activities : x );
                return { ...state, "products": __products };
            case "SAVE_ACTIVITIES_STATE_SUCCESS":
                return {...state, "is_activities_completed": action.payload }
            default: 
                return state
        }
    }

    export const keyActivitiesCategoriesReducer = (
        state = {
            activity_categories: [],
        }, action) => {
        switch (action.type) {
            case 'FETCHING_KEY_ACTIVITIES_CATEGORIES_SUCCESS':
                return { ...state, "activity_categories": action.payload.types };
            default:
                return state;
        }
    }
    export const selectedKeyActivityCategoryReducer = (state = { title: "", subtypes: [] }, action) => {
        switch (action.type) {
            case 'SELECTING_ACTIVITY_CATEGORY_SUCCESS':
                return action.payload;
            default:
                return state;
        }
    }