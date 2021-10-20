export const businessInvestmentReducer = (
    state = {
        is_business_investments_completed: false,
        period: null,
        vat_payer: true,
        original_physical_assets: [],
        update_physical_assets: [],
    }, action) => {
    switch (action.type) {
        case 'FETCHING_INVESTMENT_SUCCESS':
            const physical_assets = action.payload.physical_assets.map(obj => ({...obj, "key": obj.resource_id}))
            console.log(physical_assets);
            //const working_capital = action.payload.working_capital.map(obj => ({...obj, "key": obj.recource_id}))
            return { ...action.payload, "physical_assets": physical_assets, "update_physical_assets": physical_assets};
        default:
            return state
    }
}
