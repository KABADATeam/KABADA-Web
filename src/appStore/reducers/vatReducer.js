export const countryVATReducer = (
    state = {
        vat : [],
        defaultVAT: null
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
            vatArray.push({
                key: vatArray.length,
                vatTitle: 'zeroRate',
                vatValue: 0
            })
            const sortedVATArray = vatArray.sort((a,b) => { return b.vatValue - a.vatValue})
            const defaultVAT = objectValues[0];
            return { ...state, vat: sortedVATArray, defaultVAT: defaultVAT };
        case 'RESET_VAT':
            return {
                ...state,
                vat: [],
                defaultVAT: null
            }
        default:
            return state;
    }
}