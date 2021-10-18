export const vatsReducer = (
    state = {}, action) => {
    switch (action.type) {
        case 'FETCHING_VAT_SUCCESS':
            console.log('HELL' + action.payload)
            const country_vats = action.payload;
            return { ...action.payload };
        default:
            return state;
    }
}
