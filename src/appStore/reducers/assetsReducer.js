export const assetsReducer = (
    state = {
        is_assets_completed: false,
        total_investments: null,
        own_assets: null,
        investments_amount: null,
        physical_assets: [],
    }, action) => {
    switch (action.type) {
        case 'FETCHING_ASSETS_SUCCESS':
            const physical_assets = action.payload.physical_assets.map(obj => ({ ...obj, "key": obj.resource_id }))
            const is_completed = action.payload.is_assets_completed;
            const total_investments = action.payload.total_investments;
            const own_assets = action.payload.own_assets;
            const investments_amount = action.payload.investments_amount;
            return {
                ...state,
                'physical_assets': physical_assets,
                is_assets_completed: is_completed,
                total_investments: total_investments,
                own_assets: own_assets,
                investments_amount: investments_amount
            };
        case 'UPDATE_ASSETS_LIST_SUCCESS':
            console.log(action.payload);
            const _physical_assets = action.payload.physical_assets.map(obj => ({ ...obj, "key": obj.resource_id }))
            console.log(physical_assets);
            const _is_completed = action.payload.is_assets_completed;
            const _total_investments = action.payload.total_investments;
            const _own_assets = action.payload.own_assets;
            const _investments_amount = action.payload.investments_amount;
            return {
                ...state,
                'physical_assets': _physical_assets,
                is_assets_completed: _is_completed,
                total_investments: _total_investments,
                own_assets: _own_assets,
                investments_amount: _investments_amount
            };
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