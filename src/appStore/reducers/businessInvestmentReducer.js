export const businessInvestmentReducer = (
    state = {
        is_business_investments_completed: false,
        period: 12,
        vat_payer: true,
        total_investments: null,
	    own_assets: null,  
        investments_amount: null, // total_investments minus own_assets
        own_money: null,
        loan_amount: null,   // investments_amount minus own_money
        payment_period: 6, // possible value from range: 6, 12, 18, ...., 120
        interest_rate: null,
        grace_period: null,
        physical_assets: [],
        working_capital: [],
    }, action) => {
    switch (action.type) {
        case 'FETCHING_INVESTMENT_SUCCESS':
            const physical_assets = action.payload.physical_assets.map(obj => ({...obj, "key": obj.resource_id}))
            const working_capital = action.payload.working_capital.map(obj => ({...obj, "key": obj.recource_id}))
            console.log(physical_assets);
            return { ...action.payload, "physical_assets": physical_assets, "working_capital": working_capital};
        default:
            return state
    }
}
