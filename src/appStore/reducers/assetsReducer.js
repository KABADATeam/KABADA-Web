const computeTotalInvestments = (array) => {
    const total_investments_values_list = [];
    const filtered = array.filter(obj => obj.amount != null)
    filtered.map((item) => {
        const obj = {
            amount: item.amount
        }
        console.log(obj);
        const value = parseInt(Object.values(obj))
        console.log(value);
        total_investments_values_list.push(value);
    })
    console.log(total_investments_values_list)
    const total_investments_value = total_investments_values_list.reduce(function (total_investments_value, value) {
        const updated_total_investments_value = total_investments_value + value;
        return updated_total_investments_value;
    })
    return total_investments_value
}
const computeOwnAssets = (array) => {
    const own_assets_values_list = [];
    const filtered = array.filter(obj => obj.amount != null && obj.resource_status === 'Own')
    filtered.map((item) => {
        const obj = {
            amount: item.amount
        }
        console.log(obj);
        const value = parseInt(Object.values(obj))
        console.log(value);
        own_assets_values_list.push(value);
    })
    console.log(own_assets_values_list)
    const own_assets_value = own_assets_values_list.reduce(function (own_assets_value, value) {
        const updated_own_assets_value = own_assets_value + value;
        return updated_own_assets_value;
    })
    return own_assets_value
}

export const assetsReducer = (
    state = {
        is_assets_completed: false,
        total_investments: null,
        own_assets: null,
        investment_amount: null,
        physical_assets: [],
        physical_assets_original: [],
        physical_assets_updated: []
    }, action) => {
    switch (action.type) {
        case 'FETCHING_ASSETS_SUCCESS':
            const physical_assets_status = action.payload.data.physical_assets.filter((obj) => obj.resource_status === 'Buy' || obj.resource_status === 'Own');
            const filtered_physical_assets = physical_assets_status.filter((obj) => obj.type_title === 'Buildings' || obj.type_title === 'Transport' || obj.type_title === 'Other' || obj.type_title === 'Equipment' || obj.type_title === 'Brands' || obj.type_title === 'Licenses' || obj.type_title === 'Software');
            console.log(filtered_physical_assets);
            const new_physical_assets_list = [];
            filtered_physical_assets.map((item) => {
                const obj = {
                    'amount': item.amount === null ? 0 : item.amount,
                    'resource_id': item.resource_id,
                    'resource_title': item.resource_title,
                    'resource_status': item.resource_status,
                    'type_title': item.type_title,
                    'vat': item.vat === null ? action.payload.defaultVAT : item.vat,
                }
                new_physical_assets_list.push(obj);
            })
            console.log(new_physical_assets_list);
            const is_completed = action.payload.data.is_assets_completed;
            const total_investments = action.payload.data.total_investments;
            const own_assets = action.payload.data.own_assets;
            const investment_amount = action.payload.data.investment_amount;
            return {
                ...state,
                'physical_assets': new_physical_assets_list,
                'physical_assets_original': new_physical_assets_list,
                'physical_assets_updated': new_physical_assets_list,
                is_assets_completed: is_completed,
                total_investments: total_investments,
                own_assets: own_assets,
                investment_amount: investment_amount
            };
        case "SAVE_STATE_SUCCESS":
            console.log(action.payload)
            return { ...state, "is_assets_completed": action.payload }
        case 'UPDATE_ASSETS_ITEM_AMOUNT':
            console.log(action.payload);
            const index = state.physical_assets_updated.findIndex(x => x.resource_id === action.payload.asset.resource_id);
            const updatedAsset = {
                'amount': Number(action.payload.value),
                'resource_id': state.physical_assets_updated[index].resource_id,
                'resource_title': state.physical_assets_updated[index].resource_title,
                'resource_status': state.physical_assets_updated[index].resource_status,
                'type_title': state.physical_assets_updated[index].type_title,
                'vat': state.physical_assets_updated[index].vat,
            }
            const updatedAssetsList = [...state.physical_assets_updated];
            updatedAssetsList[index] = updatedAsset;
            const total_investments_value = computeTotalInvestments(updatedAssetsList);
            const own_assets_value = computeOwnAssets(updatedAssetsList);
            const investment_amount_value = total_investments_value - own_assets_value
            return {
                ...state,
                'physical_assets_updated': updatedAssetsList,
                'total_investments': total_investments_value,
                'own_assets': own_assets_value,
                'investment_amount': investment_amount_value
            }
        case 'UPDATE_ASSETS_ITEM_VAT':
            console.log(action.payload);
            const _index = state.physical_assets_updated.findIndex(x => x.resource_id === action.payload.asset.resource_id);
            const _updatedAsset = {
                'amount': state.physical_assets_updated[_index].amount,
                'resource_id': state.physical_assets_updated[_index].resource_id,
                'resource_title': state.physical_assets_updated[_index].resource_title,
                'resource_status': state.physical_assets_updated[_index].resource_status,
                'type_title': state.physical_assets_updated[_index].type_title,
                'vat': action.payload.value
            }
            const _updatedAssetsList = [...state.physical_assets_updated];
            _updatedAssetsList[_index] = _updatedAsset;
            return {
                ...state,
                'physical_assets_updated': _updatedAssetsList
            }
        case "DISCARD_CHANGES_SUCCESS":
            console.log(state.physical_assets_updated)
            const discardObj = JSON.parse(JSON.stringify(state.physical_assets_original))
            console.log(discardObj)
            return { ...state, 'physical_assets': discardObj, 'physical_assets_updated': state.physical_assets_original };
        default:
            return state
    }
}