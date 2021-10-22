export const assetsReducer = (
    state = {
        is_assets_completed: false,
        total_investments: null,
        own_assets: null, 
        investments_amount: null,
        original_assets: [], 
        updated_assets: [],
        _original_assets: [],
    }, action) => {
    switch (action.type) {
        case 'FETCHING_ASSETS_SUCCESS':
            const original_assets = action.payload.physical_assets.map(obj => ({...obj, "key": obj.resource_id}))
            const is_completed = action.payload.is_assets_completed;
            const total_investments = action.payload.total_investments;
            const own_assets = action.payload.own_assets;
            const investments_amount = action.payload.investments_amount;
            const clone_object = JSON.parse(JSON.stringify(original_assets));
            return { ...state, 
                'original_assets': original_assets, 
                '_original_assets': clone_object, 
                'updated_assets': [], 
                is_assets_completed: is_completed, 
                total_investments: total_investments,
                own_assets: own_assets,
                investments_amount: investments_amount                
            };
        case 'UPDATE_ASSETS_LIST_SUCCESS': 
            const assets = state.original_assets;
            console.log(action.payload);
            return {...state}
        default:
            return state
    }
}
/*
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
*/