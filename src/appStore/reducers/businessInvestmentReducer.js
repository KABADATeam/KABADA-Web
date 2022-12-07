const computeLongLoanValue = (investments, own_assets, my_money) => {
    const loan_amount = (investments - own_assets - my_money) < 0 ? 0 : investments - own_assets - my_money;
    return loan_amount;
}
const computeShortLoanValue = (workings_amount, my_money) => {
    const loan_amount = (workings_amount - my_money) < 0 ? 0 : workings_amount - my_money;
    return loan_amount;
}

const dataWorkingCapital = (grace_period_short, working_capital) => {
    if (grace_period_short === 0 && working_capital === null) {
        return null;
    } else if (grace_period_short > 0 && working_capital === null) {
        const array = [];
        const obj = {
            own_amount: 0,
            loan_amount: 0
        }
        for (var i = 0; i < grace_period_short; i++) {
            array.push(obj);
        }
        return array;
    } else if (grace_period_short === working_capital.length) {
        const array1 = [];
        for (var i = 0; i < grace_period_short; i++) {
            const workingObj = {
                own_amount: working_capital[i].own_amount,
                loan_amount: working_capital[i].loan_amount
            }
            array1.push(workingObj);
        }
        return array1;
    } else if (grace_period_short > working_capital.length) {
        const array2 = [];
        array2.push(...working_capital);
        const obj = {
            own_amount: 0,
            loan_amount: 0
        }
        for (var i = working_capital.length; i < grace_period_short; i++) {
            array2.push(obj);
        }
        return array2;
    } else if (grace_period_short < working_capital.length) {
        const array3 = [];
        for (var i = 0; i < grace_period_short; i++) {
            const workingObj = {
                own_amount: working_capital[i].own_amount,
                loan_amount: working_capital[i].loan_amount
            }
            array3.push(workingObj);
        }
        return array3;
    } else if (grace_period_short === null && working_capital === null) {
        return null
    } else {
        return null;
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
        temporary: {}
    }, action) => {
    switch (action.type) {
        case 'FETCHING_INVESTMENT_SUCCESS':
            const working_capitals = action.payload.grace_period_short === null ? null : dataWorkingCapital(action.payload.grace_period_short, action.payload.working_capital);
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
                working_capital: action.payload.grace_period_short === null ? null : working_capitals,
            }
            const temporary_obj = {
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
                working_capital: action.payload.working_capital
            }
            const cloneObject = JSON.parse(JSON.stringify(obj));
            const originalObject = JSON.parse(JSON.stringify(temporary_obj));
            return {
                ...state,
                is_business_investments_completed: action.payload.is_business_investments_completed,
                total_investments: action.payload.total_investments,
                own_assets: action.payload.own_assets,
                investment_amount: action.payload.investment_amount,
                original: cloneObject,
                updates: cloneObject,
                temporary: originalObject,
            }
        case 'RESET_INVESTMENT_SUCCESS':
            return {
                ...state,
                'total_investments': 0,
                'own_assets': 0,
                'investment_amount': 0,
                'original': {},
                'updates': {},
                'temporary': {}
            }
        case 'UPDATE_INVESTMENT_SUCCESS':
            return {
                ...state
            }
        case 'CHANGE_PERIOD_SUCCESS':
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
            return {
                ...state,
                working_capital: action.working_capital
            }
        case "SAVE_STATE_SUCCESS":
            return { ...state, "is_business_investments_completed": action.payload }
        case "RECALCULATE_INVESTMENT_SUCCESS":
            const working_capital = action.payload.postObject.working_capital;
            return {
                ...state,
            }
        case "DISCARD_INVESTMENTS_CHANGES_SUCCESS":
            const discardObj = JSON.parse(JSON.stringify(state.original))
            return {
                ...state,
                'original': discardObj,
                'updates': discardObj
            };
        case 'UPDATE_WORKING_CAPITAL_ITEM_MY_MONEY':
            const index = findIndex(state.updates.working_capital, action.payload.record);
            const updatedWorkingCapitalItem = {
                own_amount: action.payload.value,
                loan_amount: state.updates.working_capital[index].loan_amount,
            }
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
            const _index = findIndex(state.updates.working_capital, action.payload.record);
            const _updatedWorkingCapitalItem = {
                own_amount: state.updates.working_capital[_index].own_amount,
                loan_amount: action.payload.value,
            }
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
            return {
                ...state,
                necessaryCapital: action.payload
            }
        default:
            return state
    }
}



