import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getBusinessStartUpInvestmentInformation = (planId) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/kres/investment/' + planId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_INVESTMENT_SUCCESS", payload: response.data });
        } catch (error) {
            if (error.response === undefined) {
                dispatch({
                    type: "ERROR",
                    payload: { message: "Oopsie... System error. Try again, later" },
                });
            } else {
                dispatch({ type: "ERROR", payload: error.response.data });
            }
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};


export const saveChanges = (planId, callback) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const dataToObj = getState().businessInvestments;
            console.log(dataToObj)
            const postObject = {
                business_plan_id: planId,
                period: dataToObj.updates.period,
                vat_payer: dataToObj.updates.vat_payer,
                own_money: dataToObj.updates.own_money,
                loan_amount: dataToObj.updates.loan_amount,
                working_capital_amount: dataToObj.updates.working_capital_amount,
                own_money_short: dataToObj.updates.own_money_short,
                loan_amount_short: dataToObj.updates.loan_amount_short,
                payment_period: dataToObj.updates.payment_period,
                interest_rate: dataToObj.updates.interest_rate,
                grace_period: dataToObj.updates.grace_period,
                payment_period_short: dataToObj.updates.payment_period_short,
                interest_rate_short: dataToObj.updates.interest_rate_short,
                grace_period_short: dataToObj.updates.grace_period_short,
                total_investments: dataToObj.total_investments,
                own_assets: dataToObj.own_assets,
                investment_amount: dataToObj.investment_amount,
                working_capitals: dataToObj.updates.working_capital,
            }
            console.log(postObject)
            await kabadaAPI.post('/api/kres/investment/update', postObject, { headers: { Authorization: `Bearer ${token}` } });
            if (callback !== null) {
                callback();
            }
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};
export const recalculateInvestment = (postObject) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('/api/plans/investmentSaveRecalc', postObject, { headers: { Authorization: `Bearer ${token}` } });
            console.log(response.data);
            dispatch({ type: "RECALCULATE_INVESTMENT_SUCCESS", payload: response.data });
        } catch (error) {
            if (error.response === undefined) {
                dispatch({
                    type: "ERROR",
                    payload: { message: "Oopsie... System error. Try again, later" },
                });
            } else {
                dispatch({ type: "ERROR", payload: error.response.data });
            }
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};
/*export const changeOwnMoneyShort = (own_money_short, loan_amount_short, callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: 'CHANGE_OWN_MONEY_SHORT_SUCCESS', own_money_short: own_money_short, loan_amount_short: loan_amount_short });
        callback();
    }
}*/

export function changeVisibility(visibility) {
    return { type: 'CHANGE_VISIBILITY_SUCCESS', visibility: visibility }
}
export function changePeriod(period) {
    return { type: 'CHANGE_PERIOD_SUCCESS', period: period }
}
export function changeVatPrayer(vat_payer) {
    return { type: 'CHANGE_VAT_PRAYER_SUCCESS', vat_payer: vat_payer }
}
export const changeOwnMoney = (own_money) => {
    return async (dispatch, getState) => {
        const own_money_value = Number(own_money);
        dispatch({ type: 'CHANGE_OWN_MONEY_SUCCESS', own_money: own_money_value })
    }
}
export function changePaymentPeriod(payment_period) {
    return { type: 'CHANGE_PAYMENT_PERIOD_SUCCESS', payment_period: payment_period }
}
export function changeInterestRate(interest_rate) {
    return { type: 'CHANGE_INTEREST_RATE_SUCCESS', interest_rate: interest_rate }
}
export function changeGracePeriod(grace_period) {
    return { type: 'CHANGE_GRACE_PERIOD_SUCCESS', grace_period }
}
//short loan 
export function changeWorkingCapitalAmount(working_capital_amount) {
    const working_capital_amount_value = Number(working_capital_amount);
    return { type: 'CHANGE_WORKING_CAPITAL_SUCCESS', working_capital_amount: working_capital_amount_value }
}
export function changeOwnMoneyShort(own_money_short) {
    const own_money_short_value = Number(own_money_short);
    return { type: 'CHANGE_OWN_MONEY_SHORT_SUCCESS', own_money_short: own_money_short_value }
}
export function changePaymentPeriodShort(payment_period_short) {
    return { type: 'CHANGE_PAYMENT_PERIOD_SHORT_SUCCESS', payment_period_short: payment_period_short }
}
export function changeInterestRateShort(interest_rate_short) {
    return { type: 'CHANGE_INTEREST_RATE_SHORT_SUCCESS', interest_rate_short: interest_rate_short }
}
export function changeGracePeriodShort(grace_period_short) {
    return { type: 'CHANGE_GRACE_PERIOD_SHORT_SUCCESS', grace_period_short }
}
export function changeWorkingCapital(working_capital) {
    return { type: 'CHANGE_WORKING_CAPITAL_ARRAY_SUCCESS', working_capital: working_capital }
}

export const getNecessaryCapitalInformation = (planId) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('/api/plans/necessaryCapital/' + planId, { headers: { Authorization: `Bearer ${token}` } });
            console.log(response);
            dispatch({ type: "FETCHING_NECESSARY_CAPITAL_SUCCESS", payload: response.data });
        } catch (error) {
            if (error.response === undefined) {
                dispatch({
                    type: "ERROR",
                    payload: { message: "Oopsie... System error. Try again, later" },
                });
            } else {
                dispatch({ type: "ERROR", payload: error.response.data });
            }
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const saveState = (planId, is_completed, callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('/api/plans/changeBusinessInvestmentsCompleted', { "business_plan_id": planId, "is_business_investments_completed": is_completed }, { headers: { Authorization: `Bearer ${token}` } });
            console.log(is_completed);
            dispatch({ type: 'SAVE_STATE_SUCCESS', payload: is_completed });
            callback();
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    }
};
export const discardChanges = (callback) => {
    return async (dispatch, getState) => {
        try {
            console.log('test');
            dispatch({ type: 'DISCARD_INVESTMENTS_CHANGES_SUCCESS', payload: {} });
            callback();
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const updateWorkingCapitalMyMoney = (value, record) => {
    return async (dispatch, getState) => {
        try {
            const my_money_value = Number(value);
            console.log(value);
            dispatch({ type: 'UPDATE_WORKING_CAPITAL_ITEM_MY_MONEY', payload: {"value": my_money_value, "record": record}})
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error)})
        } finally {
        }
    }
}
export const updateWorkingCapitalLoanAmount = (value, record) => {
    return async (dispatch, getState) => {
        try {
            const loan_amount_value = Number(value);
            dispatch({ type: 'UPDATE_WORKING_CAPITAL_ITEM_LOAN_AMOUNT', payload: {"value": loan_amount_value, "record": record}})
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error)})
        } finally {
        }
    }
}