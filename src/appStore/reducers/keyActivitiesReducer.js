export const keyActivitiesReducer = (
    state = {
        is_activities_completed: false,
        activitiesList: [],
        products: [],
    }, action ) => {
        switch (action.type) {
            case 'FETCHING_KEY_ACTIVITIES_SUCCESS':
                const products = action.payload.products.map(obj => ({...obj, "key": obj.id}))
                /*const products = action.payload.products.map(obj => ({"id": obj.id, "title": obj.title}))
                const activities = action.payload.products.map(obj =>({"product_id": obj.id, "activities": obj.activities}) )
                console.log(products)
                console.log(activities)
                const activities = action.payload.products.activities.map(obj => ({
                            "id": obj.id,   // activity id
                            "type_id": obj.type_id,
                            "type_name": obj.type_name,
                            "sub_type_id": obj.sub_type_id,
                            "sub_type_name": obj.sub_type_name,
                            "name": obj.name,
                            "description": obj.description
                }))
                console.log(activities)*/
                return {...action.payload, "products": products};
            case "SAVE_KEY_ACTIVITY_SUCCESS":
                console.log(action.payload)
                return {state}
                  
                /*const product = state.products.filter(x=> x.id === action.payload.obj.product_id)
                const activity = action.payload.obj;
                console.log(activity)
                return { products: [...product.activities, { 
                    "id": action.payload.id,   
                    "type_id": action.payload.obj.category_id,
                    "type_name": action.payload.obj.category_title,
                    "sub_type_id": action.payload.obj.sub_type_id,
                    "sub_type_name": action.payload.obj.sub_type_title,
                    "name": action.payload.obj.name,
                    "description": action.payload.obj.description
                 }] };*/
            case "REMOVING_ACTIVITY_SUCCESS":
                console.log(action.payload)
                const removedActivities = state.activities.filter(x => x.id !== action.payload.id);
                console.log(removedActivities)
                return { ...state, "activities": removedActivities };
            case "UPDATE_KEY_ACTIVITY_SUCCESS":
                console.log(action.payload)
                //const updatedActivities = state.products.activities.map(x => x.id === action.payload.id ? action.payload : x);
                return { ...state,  };
            case "SAVE_ACTIVITIES_STATE_SUCCESS":
                console.log(action.payload)
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