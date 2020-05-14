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

