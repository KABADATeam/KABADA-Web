export const businessStartUpInvestmentReducer = (
    state = {
        is_business_investments_completed: false,
        period: 12,
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
        own_money_short: 0,
        loan_amount_short: 0,
        payment_period_short: 0,
        interest_rate_short: 0,
        grace_period_short: 0,
        working_capital: null,
        visibility: 'hidden'
    }, action) => {
    switch (action.type) {
        case 'FETCHING_INVESTMENT_SUCCESS':
            console.log(action.payload)
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
                own_money_short: action.payload.own_money_short,
                loan_amount_short: action.payload.loan_amount_short,
                payment_period_short: action.payload.payment_period_short,
                interest_rate_short: action.payload.interest_rate_short,
                grace_period_short: action.payload.grace_period_short,
                working_capital: action.payload.working_capital
            }
        case 'UPDATE_INVESTMENT_SUCCESS':
            return {
                ...state
            }
        case 'CHANGE_VISIBILITY_SUCCESS':
            return {
                ...state,
                visibility: action.visibility
            }
        case 'CHANGE_PERIOD_SUCCESS':
            console.log(action)
            return {
                ...state,
                period: action.period
            }
        case 'CHANGE_VAT_PRAYER_SUCCESS':
            console.log(action)
            return {
                ...state,
                vat_payer: action.vat_payer
            }
        case 'CHANGE_OWN_MONEY_SUCCESS':
            console.log(action);
            return {
                ...state,
                own_money: action.own_money,
            }
        case 'CHANGE_LOAN_AMOUNT_SUCCESS':
            console.log(action.loan_amount);
            return {
                ...state,
                loan_amount: action.loan_amount,
            }
        case 'CHANGE_WORKING_CAPITAL_SUCCESS':
            console.log(action)
            return {
                ...state,
                working_capital_amount: action.working_capital_amount
            }
        case 'CHANGE_OWN_MONEY_SHORT_SUCCESS':
            console.log(action)
            return {
                ...state,
                own_money_short: action.own_money_short,
                loan_amount_short: action.loan_amount_short
            }
        case 'CHANGE_PAYMENT_PERIOD_SUCCESS':
            console.log(action)
            return {
                ...state,
                payment_period: action.payment_period
            }
        case 'CHANGE_INTEREST_RATE_SUCCESS':
            console.log(action)
            return {
                ...state,
                interest_rate: action.interest_rate
            }
        case 'CHANGE_GRACE_PERIOD_SUCCESS':
            console.log(action);
            return {
                ...state,
                grace_period: action.grace_period
            }
        case 'CHANGE_PAYMENT_PERIOD_SHORT_SUCCESS':
            console.log(action)
            return {
                ...state,
                payment_period_short: action.payment_period_short
            }
        case 'CHANGE_INTEREST_RATE_SHORT_SUCCESS':
            console.log(action)
            return {
                ...state,
                interest_rate_short: action.interest_rate_short
            }
        case 'CHANGE_GRACE_PERIOD_SHORT_SUCCESS':
            console.log(action);
            return {
                ...state,
                grace_period_short: action.grace_period_short
            }
        case 'CHANGE_WORKING_CAPITAL_ARRAY_SUCCESS':
            console.log(action.working_capital);
            return {
                ...state,
                working_capital: action.working_capital
            }
        case "SAVE_STATE_SUCCESS":
            return { ...state, "is_business_investments_completed": action.payload }
        case "RECALCULATE_INVESTMENT_SUCCESS":
            const working_capital = action.payload.postObject.working_capital;
            console.log(working_capital);
            return {
                ...state,
            }
        default:
            return state
    }
}


export const necessaryCapitalReducer = (
    state = {
        necessaryCapital: null
    }, action) => {
    switch (action.type) {
        case 'FETCHING_NECESSARY_CAPITAL_SUCCESS':
            return {
                ...state,
                necessaryCapital: action.payload
            }
        default:
            return state
    }
}



