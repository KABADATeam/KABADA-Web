export const swotReducer = (
    state = {
        _t: {
            is_swot_completed: false,
            strengths_weakness_items: [],
            oportunities_threats: []
        },
        original: {
            is_swot_completed: false,
            strengths_weakness_items: [],
            oportunities_threats: []
        },
        updates: {
            is_swot_completed: null,
            strengths: [],
            opportunities: []
        }
    }, action) => {
    switch (action.type) {
        case "FETCHING_SWOT_SUCCESS":
            const strengths = action.payload.strengths_weakness_items.map(obj=> ({ ...obj, key: obj.id })).sort((a, b) => (a.title < b.title) ? 1 : -1).sort((a, b) => (a.isLocal > b.isLocal) ? 1 : -1);
            const opportunities = action.payload.oportunities_threats.map(obj=> ({ ...obj, key: obj.id })).sort((a, b) => (a.title < b.title) ? 1 : -1).sort((a, b) => (a.isLocal > b.isLocal) ? 1 : -1);
            const is_completed = action.payload.is_swot_completed;
            const originalObject = {
                "is_swot_completed": is_completed,
                "strengths_weakness_items": strengths,
                "oportunities_threats": opportunities
            };
            const cloneObject = JSON.parse(JSON.stringify(originalObject));
            return { ...state, original: originalObject, _t: cloneObject, updates: { "is_swot_completed": null, "strengths": [], "opportunities": []} };
        case "UPDATE_SWOT_STATE_SUCCESS":
            if (action.payload.state === state.original.is_swot_completed) {
                const updated = { ...state.updates, is_swot_completed: null };
                return { ...state, updates: updated };
            } else {
                const updated = { ...state.updates, is_swot_completed: action.payload.state };
                return { ...state, updates: updated };
            }
        case "UPDATE_SWOT_LIST_SUCCESS":
            if (action.payload.type === 1) {
                const index = state.updates.strengths.findIndex(x => x.id === action.payload.item.id);
                const strengths = state.updates.strengths;
                
                if (index === -1) {
                    const updated = [ ...strengths, action.payload.item ];
                    const obj = { ...state.updates, strengths: updated };
                    return { ...state, original: state.original, updates: obj };
                } else {
                    if (isNaN(action.payload.item.id) === false) {
                        const updated = strengths.map(x => x.id === action.payload.item.id ? action.payload.item : x);
                        const obj = { ...state.updates, strengths: updated };
                        return { ...state, original: state.original, updates: obj };
                    } else {
                        const originalItem = state.original.strengths_weakness_items.find(x => x.id === action.payload.item.id);
                        if (originalItem.title === action.payload.item.title && originalItem.value === action.payload.item.value) {
                            const updated = strengths.filter(x => x.id !== action.payload.item.id);
                            const obj = { ...state.updates, strengths: updated };
                            return { ...state, original: state.original, updates: obj };
                        } else {
                            const updated = strengths.map(x => x.id === action.payload.item.id ? action.payload.item : x);
                            const obj = { ...state.updates, strengths: updated };
                            return { ...state, original: state.original, updates: obj };
                        }
                    }
                }
            } else if (action.payload.type === 2) {
                const index = state.updates.opportunities.findIndex(x => x.id === action.payload.item.id);
                const opportunities = state.updates.opportunities;
                if (index === -1) {
                    const updated = [ ...opportunities, action.payload.item ];
                    const obj = { ...state.updates, opportunities: updated };
                    return { ...state, original: state.original, updates: obj };
                } else {
                    if (isNaN(action.payload.item.id) === false) {
                        const updated = opportunities.map(x => x.id === action.payload.item.id ? action.payload.item : x);
                        const obj = { ...state.updates, opportunities: updated };
                        return { ...state, original: state.original, updates: obj };
                    } else {
                        const originalItem = state.original.oportunities_threats.find(x => x.id === action.payload.item.id);
                        if (originalItem.title === action.payload.item.title && originalItem.value === action.payload.item.value) {
                            const updated = opportunities.filter(x => x.id !== action.payload.item.id);
                            const obj = { ...state.updates, opportunities: updated };
                            return { ...state, original: state.original, updates: obj };
                        } else {
                            const updated = opportunities.map(x => x.id === action.payload.item.id ? action.payload.item : x);
                            const obj = { ...state.updates, opportunities: updated };
                            return { ...state, original: state.original, updates: obj };
                        }
                    }
                }
            }            
            return state;
        case "CREATE_NEW_ITEM_SUCCESS":
            if (action.payload.type === 1) {
                const strengths = state.updates.strengths;
                const updated = [ ...strengths, action.payload.item ];
                const obj = { ...state.updates, strengths: updated };
                return { ...state, original: state.original, updates: obj };
            } else if (action.payload.type === 2){
                const opportunities = state.updates.opportunities;
                const updated = [ ...opportunities, action.payload.item ];
                const obj = { ...state.updates, opportunities: updated };
                return { ...state, original: state.original, updates: obj };
            }
            return state;
        case "UPDATE_NEW_ITEM_SUCCESS":
            if (action.payload.type === 1) {
                const strengths = state.updates.strengths;
                const updated = strengths.map(x => x.id === action.payload.item.id ? action.payload.item : x);
                const obj = { ...state.updates, strengths: updated };
                return { ...state, original: state.original, updates: obj };
            } else if (action.payload.type === 2) {
                const opportunities = state.updates.opportunities;
                const updated = opportunities.map(x => x.id === action.payload.item.id ? action.payload.item : x);
                const obj = { ...state.updates, opportunities: updated };
                return { ...state, original: state.original, updates: obj };
            }
            return state;
        case "DELETE_NEW_ITEM_SUCCESS":
            if (action.payload.type === 1) {
                const strengths = state.updates.strengths;
                const updated = strengths.filter(x => x.id !== action.payload.item.id);
                const obj = { ...state.updates, strengths: updated };
                return { ...state, original: state.original, updates: obj };
            } else if (action.payload.type === 2) {
                const opportunities = state.updates.opportunities;
                const updated = opportunities.filter(x => x.id !== action.payload.item.id);
                const obj = { ...state.updates, opportunities: updated };
                return { ...state, original: state.original, updates: obj };
            }
            return state;
        case "DISCARD_CHANGES_SUCCESS":
            const obj = {
                is_swot_completed: null,
                strengths: [],
                opportunities: []
            };
            const discardObj = JSON.parse(JSON.stringify(state._t));
            return { ...state, original: discardObj, updates: obj };
        default:
            return state;
    }
};

