export const businessStartUpInvestmentReducer = (
    state = {
        is_business_investments_completed: false,
        period: null,
        vat_payer: true,
        total_investments: 0,
        own_assets: 0,
        investment_amount: 0,
        own_money: 0,
        loan_amount: 0,
        payment_period: 0,
        interest_rate: 0,
        grace_period: 0,
        working_capital_amount: 0,
        startup_own_money: 0,
        startup_loan_amount: 0,
        payment_period_short: 0,
        interest_rate_short: 0,
        grace_period_short: 0,
        working_capital: [],
    }, action) => {
    switch (action.type) {
        case 'FETCHING_INVESTMENT_SUCCESS':
            return {
                ...state,
                is_business_investments_completed: action.payload.is_business_investments_completed,
                period: action.payload.period,
                vat_payer: action.payload.vat_payer,
                total_investments: action.payload.total_investments,
                own_assets: action.payload.own_assets,
                investment_amount: action.payload.investment_amount,
                own_money: action.payload.own_money,
                loan_amount: action.payload.loan_amount,
                payment_period: action.payload.payment_period,
                interest_rate: action.payload.interest_rate,
                grace_period: action.payload.grace_period,
                working_capital_amount: action.payload.working_capital_amount,
                startup_own_money: action.payload.startup_own_money,
                startup_loan_money: action.payload.startup_loan_money,
                payment_period_short: action.payload.payment_period_short,
                interest_rate_short: action.payload.interest_rate_short,
                grace_period_short: action.payload.grace_period_short,
                working_capital: action.payload.working_capital
            }
        default:
            return state
    }
}
