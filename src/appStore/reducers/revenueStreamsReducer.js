export const revenuesReducer = (
    state = {
        is_revenue_completed: false,
        segment_1: [],
        segment_2: [],
        other: []
    }, action) => {
    switch (action.type) {
        case "FETCHING_REVENUE_STREAMS_SUCCESS":
            const segment1 = action.payload.segment_1.map(obj => ({ ...obj, "key": obj.id }));
            const segment2 = action.payload.segment_2.map(obj => ({ ...obj, "key": obj.id }));
            const other = action.payload.other.map(obj => ({ ...obj, "key": obj.id }));
            return { ...action.payload, "segment_1": segment1, "segment_2": segment2, "other": other };
        case "SAVE_REVENUE_SUCCESS":
            if (action.payload.segment === 1) {
                const segment = [...state.segment_1, { ...action.payload }];
                return { ...state, "segment_1": segment };
            }
            if (action.payload.segment === 2) {
                const segment = [...state.segment_2, { ...action.payload }];
                return { ...state, "segment_2": segment };
            }
            if (action.payload.segment === 3) {
                const segment = [...state.other, { ...action.payload }];
                return { ...state, "other": segment };
            }
            return state;
        case "UPDATE_REVENUE_SUCCESS":
            if (action.payload.segment === 1) {
                const segment = state.segment_1.map(x => x.id === action.payload.id ? action.payload : x);
                return { ...state, "segment_1": segment };
            }
            if (action.payload.segment === 2) {
                const segment = state.segment_2.map(x => x.id === action.payload.id ? action.payload : x);
                return { ...state, "segment_2": segment };
            }
            if (action.payload.segment === 3) {
                const segment = state.other.map(x => x.id === action.payload.id ? action.payload : x);
                return { ...state, "other": segment };
            }
            return state;
        case "REMOVING_REVENUE_SUCCESS":
            if (action.payload.segment === 1) {
                const segment = state.segment_1.filter(x => x.id !== action.payload.id);
                return { ...state, "segment_1": segment };
            }
            if (action.payload.segment === 2) {
                const segment = state.segment_2.filter(x => x.id !== action.payload.id);
                return { ...state, "segment_2": segment };
            }
            if (action.payload.segment === 3) {
                const segment = state.other.filter(x => x.id !== action.payload.id);
                return { ...state, "other": segment };
            }
            return state;
        case "SAVE_STATE_SUCCESS":
            return { ...state, "is_revenue_completed": action.payload };
        default:
            return state;
    }
};

export const revenueTypesReducer = (
    state = {
        "stream_types": [],
        "prices": []
    }, action) => {
    switch (action.type) {
        case 'FETCHING_REVENUE_TYPES_SUCCESS':
            const streamTypes = action.payload.stream_types;
            const newStreamTypes = streamTypes.map(item => {
                if (item.title === 'Asset sale')
                    return { ...item, title: 'Product / Service sale', tooltipCode: 'revstrem1s1' }
                if (item.title === 'Usage fee')
                    return { ...item, tooltipCode: 'revstrem1s2' }
                if (item.title === 'Subscription fee')
                    return { ...item, tooltipCode: 'revstrem1s3' }
                if (item.title === 'Lending, renting, leasing')
                    return { ...item, tooltipCode: 'revstrem1s4' }
                if (item.title === 'Licensing')
                    return { ...item, tooltipCode: 'revstrem1s5' }
                if (item.title === 'Brokerage fees')
                    return { ...item, tooltipCode: 'revstrem1s6' }
                if (item.title === 'Advertising')
                    return { ...item, tooltipCode: 'revstrem1s7' }
            })
            return { ...state, "stream_types": newStreamTypes };
        case 'FETCHING_REVENUE_PRICES_SUCCESS':
            const updatedPrices = [];
            const prices = action.payload.prices;
            const fixedPricing = action.payload.prices[0].types;
            const dynamicPricing = action.payload.prices[1].types;
            const newFixedPricing = fixedPricing.map(item => {
                if (item.title === "List price")
                    return { ...item, tooltipCode: "revstrem3f1" }
                if (item.title === "Product feature dependent")
                    return { ...item, tooltipCode: "revstrem3f2" }
                if (item.title === "Customer segment dependent")
                    return { ...item, tooltipCode: "revstrem3f3" }
                if (item.title === "Volume dependent")
                    return { ...item, tooltipCode: "revstrem3f4" }
            })
            const newDynamicPricing = dynamicPricing.map(item => {
                if (item.title === "Negotiation")
                    return { ...item, tooltipCode: "revstrem3d1" }
                if (item.title === "Yield management")
                    return { ...item, tooltipCode: "revstrem3d2" }
                if (item.title === "Real time market")
                    return { ...item, tooltipCode: "revstrem3d3" }
                if (item.title === "Auctions")
                    return { ...item, tooltipCode: "revstrem3d4" }
            })
            const updatedFixingPrices = { ...prices[0], tooltipCode: 'revstrem2f', types: newFixedPricing };
            updatedPrices.push(updatedFixingPrices);
            const updatedDynamicPricing = { ...prices[1], tooltipCode: 'revstrem2d', types: newDynamicPricing };
            updatedPrices.push(updatedDynamicPricing);
            return { ...state, "prices": updatedPrices };
        default:
            return state;
    }
}
