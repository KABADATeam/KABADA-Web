export const countriesReducer = (state = [], action) => {
    switch (action.type) {
        case 'COUNTRIES_FETCH_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}

export const countrySelectedReducer = (state = null, action) => {
    switch (action.type) {
        case 'COUNTRY_CHANGE_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}

export const countryShortNameReducer = (
    state = {
        countryShortCode: null,
        countryShortCodeV2: null
    }, action) => {
    switch (action.type) {
        case 'FETCH_SHORT_COUNTRY_CODE':
            const shortCode = action.payload.country.shortCode;
            return { ...state, "countryShortCode": shortCode };
        case 'FETCH_SHORT_COUNTRY_CODE_V2':
            const shortCodeV2 = action.payload.country.shortCode;
            return { ...state, "countryShortCodeV2": shortCodeV2 };
        default:
            return state;
    }
}