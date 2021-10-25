export const countryVATReducer = (
    state = {
        vat : []
    }, action) => {
    switch (action.type) {
        case 'FETCHING_COUNTRY_VAT_SUCCESS':
            let vatArray = [];
            let objectValues = Object.values(action.payload);
            let objectPropertyName = Object.keys(action.payload);
            let length = objectPropertyName.length
            for (let i = 0; i < length; i++) {
                if (objectValues[i] !== null) {
                    vatArray.push({
                        key: i,
                        vatTitle: objectPropertyName[i],
                        vatValue: objectValues[i]
                    })
                }
            }
            return { ...state, vat: vatArray };
        default:
            return state;
    }
}