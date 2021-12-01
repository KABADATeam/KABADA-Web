const computeLongLoanValue = (investments, own_assets, my_money) => {
    const loan_amount = investments - own_assets - my_money;
    return loan_amount;
}
const computeShortLoanValue = (workings_amount, my_money) => {
    const loan_amount = workings_amount - my_money;
    return loan_amount;
}

const dataWorkingCapital = (grace_period_short) => {
    const array = [];
    const array1 = [];
    if (grace_period_short > 0) {
        const uniqueObj = {
            own_amount: 0,
            loan_amount: 0
        }
        for (var i = 0; i < grace_period_short; i++) {
            array.push(uniqueObj);
        }
        return array;
    } else {
        console.log(array1);
        return array1;
    }
}
const findIndex = (working_capital, record) => {
    for (var index = 0; index <= working_capital.length; index++) {
        if (index === record - 1) {
            return index;
        }
    }

}
export const businessStartUpInvestmentReducer = (
    state = {
        is_business_investments_completed: false,
        total_investments: 0,
        own_assets: 0,
        investment_amount: 0,
        original: {},
        updates: {},

    }, action) => {
    switch (action.type) {
        case 'FETCHING_INVESTMENT_SUCCESS':
            console.log(action.payload);
            const working_capitals = dataWorkingCapital(action.payload.grace_period_short);
            console.log(working_capitals);
            const obj = {
                period: action.payload.period === null ? 12 : action.payload.period,
                vat_payer: action.payload.vat_payer === null ? true : action.payload.vat_payer,
                own_money: action.payload.own_money === null ? 0 : action.payload.own_money,
                loan_amount: action.payload.loan_amount === null ? action.payload.investment_amount : action.payload.loan_amount,
                payment_period: action.payload.payment_period === null ? 12 : action.payload.payment_period,
                interest_rate: action.payload.interest_rate === null ? 0 : action.payload.interest_rate,
                grace_period: action.payload.grace_period === null ? 0 : action.payload.grace_period,
                working_capital_amount: action.payload.working_capital_amount == null ? 0 : action.payload.working_capital_amount,
                own_money_short: action.payload.own_money_short === null ? 0 : action.payload.own_money_short,
                loan_amount_short: action.payload.loan_amount_short === null ? 0 : action.payload.loan_amount_short,
                payment_period_short: action.payload.payment_period_short === null ? 1 : action.payload.payment_period_short,
                interest_rate_short: action.payload.interest_rate_short === null ? 0 : action.payload.interest_rate_short,
                grace_period_short: action.payload.grace_period_short === null ? 0 : action.payload.grace_period_short,
                working_capital: action.payload.working_capital === null ? working_capitals : action.payload.working_capital
            }
            return {
                ...state,
                is_business_investments_completed: action.payload.is_business_investments_completed,
                total_investments: action.payload.total_investments,
                own_assets: action.payload.own_assets,
                investment_amount: action.payload.investment_amount,
                original: obj,
                updates: obj
            }
        case 'UPDATE_INVESTMENT_SUCCESS':
            return {
                ...state
            }
        case 'CHANGE_PERIOD_SUCCESS':
            console.log(action)
            return {
                ...state,
                'updates': {
                    period: action.period,
                    vat_payer: state.updates.vat_payer,
                    own_money: state.updates.own_money,
                    loan_amount: state.updates.loan_amount,
                    payment_period: state.updates.payment_period,
                    interest_rate: state.updates.interest_rate,
                    grace_period: state.updates.grace_period,
                    working_capital_amount: state.updates.working_capital_amount,
                    own_money_short: state.updates.own_money_short,
                    loan_amount_short: state.updates.loan_amount_short,
                    payment_period_short: state.updates.payment_period_short,
                    interest_rate_short: state.updates.interest_rate_short,
                    grace_period_short: state.updates.grace_period_short,
                    working_capital: state.updates.working_capital
                }
            }
        case 'CHANGE_VAT_PRAYER_SUCCESS':
            console.log(action)
            return {
                ...state,
                'updates': {
                    period: state.updates.period,
                    vat_payer: action.vat_payer,
                    own_money: state.updates.own_money,
                    loan_amount: state.updates.loan_amount,
                    payment_period: state.updates.payment_period,
                    interest_rate: state.updates.interest_rate,
                    grace_period: state.updates.grace_period,
                    working_capital_amount: state.updates.working_capital_amount,
                    own_money_short: state.updates.own_money_short,
                    loan_amount_short: state.updates.loan_amount_short,
                    payment_period_short: state.updates.payment_period_short,
                    interest_rate_short: state.updates.interest_rate_short,
                    grace_period_short: state.updates.grace_period_short,
                    working_capital: state.updates.working_capital
                }
            }
        case 'CHANGE_OWN_MONEY_SUCCESS':
            console.log(action);
            const loan_amount = computeLongLoanValue(state.total_investments, state.own_assets, action.own_money);
            return {
                ...state,
                'updates': {
                    period: state.updates.period,
                    vat_payer: state.updates.vat_payer,
                    own_money: action.own_money,
                    loan_amount: loan_amount,
                    payment_period: state.updates.payment_period,
                    interest_rate: state.updates.interest_rate,
                    grace_period: state.updates.grace_period,
                    working_capital_amount: state.updates.working_capital_amount,
                    own_money_short: state.updates.own_money_short,
                    loan_amount_short: state.updates.loan_amount_short,
                    payment_period_short: state.updates.payment_period_short,
                    interest_rate_short: state.updates.interest_rate_short,
                    grace_period_short: state.updates.grace_period_short,
                    working_capital: state.updates.working_capital
                }
            }
        case 'CHANGE_WORKING_CAPITAL_SUCCESS':
            console.log(action);
            const _loan_amount_short = computeShortLoanValue(action.working_capital_amount, state.updates.own_money_short)
            return {
                ...state,
                'updates': {
                    period: state.updates.period,
                    vat_payer: state.updates.vat_payer,
                    own_money: state.updates.own_money,
                    loan_amount: state.updates.loan_amount,
                    payment_period: state.updates.payment_period,
                    interest_rate: state.updates.interest_rate,
                    grace_period: state.updates.grace_period,
                    working_capital_amount: action.working_capital_amount,
                    own_money_short: state.updates.own_money_short,
                    loan_amount_short: _loan_amount_short,
                    payment_period_short: state.updates.payment_period_short,
                    interest_rate_short: state.updates.interest_rate_short,
                    grace_period_short: state.updates.grace_period_short,
                    working_capital: state.updates.working_capital
                }
            }
        case 'CHANGE_OWN_MONEY_SHORT_SUCCESS':
            console.log(action)
            const loan_amount_short = computeShortLoanValue(state.updates.working_capital_amount, action.own_money_short)
            return {
                ...state,
                'updates': {
                    period: state.updates.period,
                    vat_payer: state.updates.vat_payer,
                    own_money: state.updates.own_money,
                    loan_amount: state.updates.loan_amount,
                    payment_period: state.updates.payment_period,
                    interest_rate: state.updates.interest_rate,
                    grace_period: state.updates.grace_period,
                    working_capital_amount: state.updates.working_capital_amount,
                    own_money_short: action.own_money_short,
                    loan_amount_short: loan_amount_short,
                    payment_period_short: state.updates.payment_period_short,
                    interest_rate_short: state.updates.interest_rate_short,
                    grace_period_short: state.updates.grace_period_short,
                    working_capital: state.updates.working_capital
                }
            }
        case 'CHANGE_PAYMENT_PERIOD_SUCCESS':
            console.log(action)
            return {
                ...state,
                'updates': {
                    period: state.updates.period,
                    vat_payer: state.updates.vat_payer,
                    own_money: state.updates.own_money,
                    loan_amount: state.updates.loan_amount,
                    payment_period: action.payment_period,
                    interest_rate: state.updates.interest_rate,
                    grace_period: state.updates.grace_period,
                    working_capital_amount: state.updates.working_capital_amount,
                    own_money_short: state.updates.own_money_short,
                    loan_amount_short: state.updates.loan_amount_short,
                    payment_period_short: state.updates.payment_period_short,
                    interest_rate_short: state.updates.interest_rate_short,
                    grace_period_short: state.updates.grace_period_short,
                    working_capital: state.updates.working_capital
                }
            }
        case 'CHANGE_INTEREST_RATE_SUCCESS':
            console.log(action)
            return {
                ...state,
                'updates': {
                    period: state.updates.period,
                    vat_payer: state.updates.vat_payer,
                    own_money: state.updates.own_money,
                    loan_amount: state.updates.loan_amount,
                    payment_period: state.updates.payment_period,
                    interest_rate: action.interest_rate,
                    grace_period: state.updates.grace_period,
                    working_capital_amount: state.updates.working_capital_amount,
                    own_money_short: state.updates.own_money_short,
                    loan_amount_short: state.updates.loan_amount_short,
                    payment_period_short: state.updates.payment_period_short,
                    interest_rate_short: state.updates.interest_rate_short,
                    grace_period_short: state.updates.grace_period_short,
                    working_capital: state.updates.working_capital
                }
            }
        case 'CHANGE_GRACE_PERIOD_SUCCESS':
            console.log(action);
            return {
                ...state,
                'updates': {
                    period: state.updates.period,
                    vat_payer: state.updates.vat_payer,
                    own_money: state.updates.own_money,
                    loan_amount: state.updates.loan_amount,
                    payment_period: state.updates.payment_period,
                    interest_rate: state.updates.interest_rate,
                    grace_period: action.grace_period,
                    working_capital_amount: state.updates.working_capital_amount,
                    own_money_short: state.updates.own_money_short,
                    loan_amount_short: state.updates.loan_amount_short,
                    payment_period_short: state.updates.payment_period_short,
                    interest_rate_short: state.updates.interest_rate_short,
                    grace_period_short: state.updates.grace_period_short,
                    working_capital: state.updates.working_capital
                }
            }
        case 'CHANGE_PAYMENT_PERIOD_SHORT_SUCCESS':
            console.log(action)
            return {
                ...state,
                'updates': {
                    period: state.updates.period,
                    vat_payer: state.updates.vat_payer,
                    own_money: state.updates.own_money,
                    loan_amount: state.updates.loan_amount,
                    payment_period: state.updates.payment_period,
                    interest_rate: state.updates.interest_rate,
                    grace_period: state.updates.grace_period,
                    working_capital_amount: state.updates.working_capital_amount,
                    own_money_short: state.updates.own_money_short,
                    loan_amount_short: state.updates.loan_amount_short,
                    payment_period_short: action.payment_period_short,
                    interest_rate_short: state.updates.interest_rate_short,
                    grace_period_short: state.updates.grace_period_short,
                    working_capital: state.updates.working_capital
                }
            }
        case 'CHANGE_INTEREST_RATE_SHORT_SUCCESS':
            console.log(action)
            return {
                ...state,
                'updates': {
                    period: state.updates.period,
                    vat_payer: state.updates.vat_payer,
                    own_money: state.updates.own_money,
                    loan_amount: state.updates.loan_amount,
                    payment_period: state.updates.payment_period,
                    interest_rate: state.updates.interest_rate,
                    grace_period: state.updates.grace_period,
                    working_capital_amount: state.updates.working_capital_amount,
                    own_money_short: state.updates.own_money_short,
                    loan_amount_short: state.updates.loan_amount_short,
                    payment_period_short: state.updates.payment_period_short,
                    interest_rate_short: action.interest_rate_short,
                    grace_period_short: state.updates.grace_period_short,
                    working_capital: state.updates.working_capital
                }
            }
        case 'CHANGE_GRACE_PERIOD_SHORT_SUCCESS':
            console.log(action);
            return {
                ...state,
                'updates': {
                    period: state.updates.period,
                    vat_payer: state.updates.vat_payer,
                    own_money: state.updates.own_money,
                    loan_amount: state.updates.loan_amount,
                    payment_period: state.updates.payment_period,
                    interest_rate: state.updates.interest_rate,
                    grace_period: state.updates.grace_period,
                    working_capital_amount: state.updates.working_capital_amount,
                    own_money_short: state.updates.own_money_short,
                    loan_amount_short: state.updates.loan_amount_short,
                    payment_period_short: state.updates.payment_period_short,
                    interest_rate_short: state.updates.interest_rate_short,
                    grace_period_short: action.grace_period_short,
                    working_capital: state.updates.working_capital
                }
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
        case "DISCARD_INVESTMENTS_CHANGES_SUCCESS":
            const discardObj = JSON.parse(JSON.stringify(state.original))
            console.log(discardObj)
            return {
                ...state,
                'original': discardObj,
                'updates': discardObj
            };
        case 'UPDATE_WORKING_CAPITAL_ITEM_MY_MONEY':
            console.log(action.payload);
            console.log(state.updates);
            const index = findIndex(state.updates.working_capital, action.payload.record);
            console.log(index);
            const updatedWorkingCapitalItem = {
                own_amount: action.payload.value,
                loan_amount: state.updates.working_capital[index].loan_amount,
            }
            console.log(updatedWorkingCapitalItem)
            const updatedWorkingCapitalItemsList = [...state.updates.working_capital];
            updatedWorkingCapitalItemsList[index] = updatedWorkingCapitalItem;
    
            return {
                ...state,
                'updates': {
                    period: state.updates.period,
                    vat_payer: state.updates.vat_payer,
                    own_money: state.updates.own_money,
                    loan_amount: state.updates.loan_amount,
                    payment_period: state.updates.payment_period,
                    interest_rate: state.updates.interest_rate,
                    grace_period: state.updates.grace_period,
                    working_capital_amount: state.updates.working_capital_amount,
                    own_money_short: state.updates.own_money_short,
                    loan_amount_short: state.updates.loan_amount_short,
                    payment_period_short: state.updates.payment_period_short,
                    interest_rate_short: state.updates.interest_rate_short,
                    grace_period_short: state.updates.grace_period_short,
                    working_capital: updatedWorkingCapitalItemsList
                }
            }
        case 'UPDATE_WORKING_CAPITAL_ITEM_LOAN_AMOUNT':
            console.log(action.payload);
            const _index = findIndex(state.updates.working_capital, action.payload.record);
            console.log(_index);
            const _updatedWorkingCapitalItem = {
                own_amount: state.updates.working_capital[_index].own_amount,
                loan_amount: action.payload.value,
            }
            console.log(_updatedWorkingCapitalItem)
            const _updatedWorkingCapitalItemsList = [...state.updates.working_capital];
            _updatedWorkingCapitalItemsList[_index] = _updatedWorkingCapitalItem;
    
            return {
                ...state,
                'updates': {
                    period: state.updates.period,
                    vat_payer: state.updates.vat_payer,
                    own_money: state.updates.own_money,
                    loan_amount: state.updates.loan_amount,
                    payment_period: state.updates.payment_period,
                    interest_rate: state.updates.interest_rate,
                    grace_period: state.updates.grace_period,
                    working_capital_amount: state.updates.working_capital_amount,
                    own_money_short: state.updates.own_money_short,
                    loan_amount_short: state.updates.loan_amount_short,
                    payment_period_short: state.updates.payment_period_short,
                    interest_rate_short: state.updates.interest_rate_short,
                    grace_period_short: state.updates.grace_period_short,
                    working_capital: _updatedWorkingCapitalItemsList
                }
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
            console.log(action.payload);
            return {
                ...state,
                necessaryCapital: action.payload
            }
        case "RECALCULATE_INVESTMENT_SUCCESS":
            console.log(action.payload);
            return {
                ...state,
                necessaryCapital: action.payload
            }
        default:
            return state
    }
}



