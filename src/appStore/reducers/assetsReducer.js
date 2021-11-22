export const assetsReducer = (
    state = {
        is_assets_completed: false,
        total_investments: 0,
        own_assets: 0,
        investment_amount: 0,
        physical_assets: [],
    }, action) => {
    switch (action.type) {
        case 'FETCHING_ASSETS_SUCCESS':
            const physical_assets_status = action.payload.physical_assets.filter((obj) => obj.resource_status === 'Buy' || obj.resource_status === 'Own' );
            console.log(physical_assets_status);
            const filtered_physical_assets = physical_assets_status.filter((obj) => obj.type_title === 'Buildings' || obj.type_title === 'Transport' || obj.type_title === 'Other' || obj.type_title === 'Equipment' || obj.type_title === 'Brands' || obj.type_title === 'Licenses' || obj.type_title === 'Software');
            console.log(filtered_physical_assets);
            const is_completed = action.payload.is_assets_completed;
            const total_investments = action.payload.total_investments;
            const own_assets = action.payload.own_assets;
            const investment_amount = action.payload.investment_amount;
            return {
                ...state,
                'physical_assets': filtered_physical_assets,
                is_assets_completed: is_completed,
                total_investments: total_investments,
                own_assets: own_assets,
                investment_amount: investment_amount
            };
        case 'UPDATE_ASSETS_LIST_SUCCESS':
            console.log(action.payload);
            const _physical_assets = action.payload.physical_assets.map(obj => ({ ...obj, "key": obj.resource_id }))
            console.log(_physical_assets);
            const _is_completed = action.payload.is_assets_completed;
            const _total_investments = action.payload.total_investments;
            const _own_assets = action.payload.own_assets;
            const _investment_amount = action.payload.investment_amount;
            return {
                ...state,
                'physical_assets': _physical_assets,
                is_assets_completed: _is_completed,
                total_investments: _total_investments,
                own_assets: _own_assets,
                investment_amount: _investment_amount
            };
        case "SAVE_STATE_SUCCESS":
            console.log(action.payload)
            return { ...state, "is_assets_completed": action.payload }
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