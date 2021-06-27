export const resourcesReducer = (
    state = {
        _t: {
            is_resources_completed: false,
            key_resources: []
        },
        original: {
            is_resources_completed: false,
            key_resources: []
        },
        updates: {
            is_resources_completed: null,
            key_resources: []
        }
    }, action) => {
    switch (action.type) {
        case "FETCHING_RESOURCES_SUCCESS":
            console.log(action.payload);
            const resources = action.payload.key_resources.map(obj=> ({ ...obj, key: obj.resource_id }));//.sort((a, b) => (a.title < b.title) ? 1 : -1);
            const is_completed = action.payload.is_resources_completed;
            const originalObject = {
                "is_resources_completed": is_completed,
                "key_resources": resources
            };
            const cloneObject = JSON.parse(JSON.stringify(originalObject));
            return { ...state, original: originalObject, _t: cloneObject, updates: { "is_resources_completed": null, "key_resources": [] } };
        case "SAVE_RESOURCE_SUCCESS":
            const _resources = [ ...state.original.key_resources, action.payload ];
            const _is_completed = state.original.is_resources_completed;
            const _originalObject = {
                "is_resources_completed": _is_completed,
                "key_resources": _resources
            };
            const _cloneObject = JSON.parse(JSON.stringify(_originalObject));
            return { ...state, original: _originalObject, _t: _cloneObject, updates: { "is_resources_completed": null, "key_resources": [] } };
        case "REMOVING_RESOURCE_SUCCESS":
            const resources_ = state.original.key_resources.filter(x => x.resource_id !== action.payload);
            const is_completed_ = state.original.is_resources_completed;
            const originalObject_ = {
                "is_resources_completed": is_completed_,
                "key_resources": resources_
            };
            const cloneObject_ = JSON.parse(JSON.stringify(originalObject_));
            return { ...state, original: originalObject_, _t: cloneObject_, updates: { "is_resources_completed": null, "key_resources": [] } };
        case "UPDATE_RESOURCES_STATE_SUCCESS":
            if (action.payload.state === state.original.is_resources_completed) {
                const updated = { ...state.updates, is_resources_completed: null };
                return { ...state, updates: updated };
            } else {
                const updated = { ...state.updates, is_resources_completed: action.payload.state };
                return { ...state, updates: updated };
            }
        case "DISCARD_CHANGES_SUCCESS":
            const obj = {
                is_resources_completed: null,
                key_resources: []
            };
            return { ...state, updates: obj };
        case "SAVE_CHANGES_SUCCESS":
            const _obj = {
                is_resources_completed: null,
                key_resources: []
            };
            const _resources_ = state.original.key_resources;
            const _originalObject_ = {
                "is_resources_completed": action.payload,
                "key_resources": _resources_
            };
            return { ...state, original: _originalObject_, updates: _obj };
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

export const selectedResourceReducer = (state = { name: "", description: "", category: { id: "", description: "" }, types: null }, action) => {
    switch (action.type) {
        case 'SAVE_EDITABLE_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}