export const swotReducer = (
    state = {
        is_swot_completed: false,
        _t: {
            strengths_weakness_items: [],
            oportunities_threats: []
        },
        original: {
            strengths_weakness_items: [],
            oportunities_threats: []
        },
        updates: {
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
                "strengths_weakness_items": strengths,
                "oportunities_threats": opportunities
            };
            const cloneObject = JSON.parse(JSON.stringify(originalObject));
            return { ...state, original: originalObject, _t: cloneObject, updates: { "strengths": [], "opportunities": [] }, "is_swot_completed": is_completed };
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
                const strengths = [ ...state.original.strengths_weakness_items, action.payload.item ];
                const obj = { ...state.original, strengths_weakness_items: strengths };
                return { ...state, updates: state.updates, original: obj };
            } else if (action.payload.type === 2) {
                const opportunities = [ ...state.original.oportunities_threats, action.payload.item ];
                const obj = { ...state.original, oportunities_threats: opportunities };
                return { ...state, updates: state.updates, original: obj };
            }
            return state;
        case "UPDATE_ITEM_SUCCESS":
            if (action.payload.type === 1) {
                const strengths = state.original.strengths_weakness_items;
                const updated = strengths.map(x => x.id === action.payload.item.id ? action.payload.item : x);
                const obj = { ...state.original, strengths_weakness_items: updated };
                return { ...state, updates: state.updates, original: obj };
            } else if (action.payload.type === 2) {
                const opportunities = state.original.oportunities_threats;
                const updated = opportunities.map(x => x.id === action.payload.item.id ? action.payload.item : x);
                const obj = { ...state.original, oportunities_threats: updated };
                return { ...state, updates: state.updates, original: obj };
            }
            return state;
        case "DELETE_ITEM_SUCCESS":
            if (action.payload.type === 1) {
                const updatedStrengths = state.updates.strengths.filter(x => x.id !== action.payload.id);
                const originalStrengths = state.original.strengths_weakness_items.filter(x => x.id !== action.payload.id);
                const originalObject = {
                    "strengths_weakness_items": originalStrengths,
                    "oportunities_threats": state.original.oportunities_threats
                };
                const updatesObject = {
                    "strengths": updatedStrengths,
                    "opportunities": state.updates.opportunities
                };

                const cloneObject = JSON.parse(JSON.stringify(originalObject));
                return { ...state, original: originalObject, updates: updatesObject, _t: cloneObject };
            } else if (action.payload.type === 2) {
                const updatedOpportunities = state.updates.opportunities.filter(x => x.id !== action.payload.id);
                const originalOpportunities = state.original.oportunities_threats.filter(x => x.id !== action.payload.id);
                const originalObject = {
                    "strengths_weakness_items": state.original.strengths_weakness_items,
                    "oportunities_threats": originalOpportunities
                };
                const updatesObject = {
                    "strengths": state.updates.strengths,
                    "opportunities": updatedOpportunities
                };
                const cloneObject = JSON.parse(JSON.stringify(originalObject));

                return { ...state, original: originalObject, updates: updatesObject, _t: cloneObject };
            }
            return state;
        case "DISCARD_CHANGES_SUCCESS":
            const obj = {
                strengths: [],
                opportunities: []
            };
            const discardObj = JSON.parse(JSON.stringify(state._t));
            return { ...state, original: discardObj, updates: obj };
        case "SAVE_STATE_SUCCESS":
            return { ...state, "is_swot_completed": action.payload };
        default:
            return state;
    }
};

