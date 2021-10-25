import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getBusinessStartUpInvestmentInformation = (planId) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/kres/investment/' + planId, { headers: { Authorization: `Bearer ${token}` } });
            console.log(response);
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

export const updateBusinessStartUpInvestmentInformation = (postObject) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/kres/investment/update', postObject, { headers: { Authorization: `Bearer ${token}` } });
            console.log(response);
            dispatch({ type: "UPDATE_INVESTMENT_SUCCESS", payload: response.data });
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

export function changeVisibility(visibility) {
    return {type: 'CHANGE_VISIBILITY_SUCCESS', visibility: visibility}
}
export function changePeriod(period) {
    return {type: 'CHANGE_PERIOD_SUCCESS', period: period}
}
export function changeVatPrayer(vat_payer) {
    return {type: 'CHANGE_VAT_PRAYER_SUCCESS', vat_payer: vat_payer}
}
export function changeLoanAmount(own_money, loan_amount) {
    return {type: 'CHANGE_LOAN_AMOUNT_SUCCESS', own_money: own_money, loan_amount: loan_amount}
}
export function changeWorkingCapitalAmount(working_capital_amount) {
    return {type: 'CHANGE_WORKING_CAPITAL_SUCCESS', working_capital_amount: working_capital_amount}
}
export function changeOwnMoneyShort(own_money_short, loan_amount_short) {
    return {type: 'CHANGE_OWN_MONEY_SHORT_SUCCESS', own_money_short: own_money_short, loan_amount_short: loan_amount_short}
}
export function changePaymentPeriod(payment_period) {
    return {type: 'CHANGE_PAYMENT_PERIOD_SUCCESS', payment_period: payment_period}
}
export function changeInterestRate(interest_rate) {
    return {type: 'CHANGE_INTEREST_RATE_SUCCESS', interest_rate: interest_rate}
}
export function changeGracePeriod(grace_period) {
    return {type: 'CHANGE_GRACE_PERIOD_SUCCESS', grace_period}
}
export function changePaymentPeriodShort(payment_period_short) {
    return {type: 'CHANGE_PAYMENT_PERIOD_SHORT_SUCCESS', payment_period_short: payment_period_short}
}
export function changeInterestRateShort(interest_rate_short) {
    return {type: 'CHANGE_INTEREST_RATE_SHORT_SUCCESS', interest_rate_short: interest_rate_short}
}
export function changeGracePeriodShort(grace_period_short) {
    return {type: 'CHANGE_GRACE_PERIOD_SHORT_SUCCESS', grace_period_short}
}