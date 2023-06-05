const getOwnership = (obj) => {
    let ownership = "";
    if (obj.selections) {
        obj.selections.forEach(selection => {
            selection.options.forEach(option => {
                if (option.selected === true) {
                    ownership = ownership + option.title + " ";
                }
            });
        });
    }
    return ownership;
}

export const resourcesReducer = (
    state = {
        is_resources_completed: false,
        key_resources: [],
        aiPredict: null
    }, action) => {
    switch (action.type) {
        case "FETCHING_RESOURCES_SUCCESS":
            const resources = action.payload.key_resources.map(obj => ({ ...obj, "key": obj.resource_id, "ownership": getOwnership(obj) }));
            return { ...action.payload, "key_resources": resources };
        case "SAVE_RESOURCE_SUCCESS":
            const _resources = [...state.key_resources, { ...action.payload, "ownership": getOwnership(action.payload) }];
            return { ...state, "key_resources": _resources };
        case "REMOVING_RESOURCE_SUCCESS":
            const resources_ = state.key_resources.filter(x => x.resource_id !== action.payload);
            return { ...state, "key_resources": resources_ };
        case "UPDATE_RESOURCE_SUCCESS":
            const _resources_ = state.key_resources.map(x => x.resource_id === action.payload.resource_id ? { ...action.payload, "ownership": getOwnership(action.payload) } : x);
            return { ...state, "key_resources": _resources_ };
        case "SAVE_CHANGES_SUCCESS":
            return { ...state, "is_resources_completed": action.payload };
        case "GET_AI_PREDICT_SUCCESS":
            return {
                ...state,
                "aiPredict": action.payload.data.plan,
            }//222
        case "ERROR_AI_MESSAGE":
            return { ...state, "errorMessage": action.payload }
        case "RESET_AI_PREDICT":
            return {
                ...state,
                "aiPredict": null,
            }
        default:
            return state;
    }
};

export const resourcesCategoriesReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCHING_RESOURCES_CATEGORIES_SUCCESS':
            return action.payload.categories;
        default:
            return state;
    }
}

export const selectedCategoryReducer = (state = { title: "", description: "", types: [] }, action) => {
    switch (action.type) {
        case 'SELECTING_RESOURCES_CATEGORY_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}

export const selectedResourceReducer = (state = { name: "", description: "", category: { id: "", description: "" }, types: null, selections: [] }, action) => {
    switch (action.type) {
        case 'SAVE_EDITABLE_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}