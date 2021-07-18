export const revenuesReducer = (
    state = {
        is_revenue_completed: false,
        segment_1: [],
        segment_2: [],
        other: []
    }, action) => {
    switch (action.type) {
        case "FETCHING_REVENUE_STREAMS_SUCCESS":
            const segment1 = action.payload.segment_1.map(obj=> ({ ...obj, "key": obj.id }));
            const segment2 = action.payload.segment_2.map(obj=> ({ ...obj, "key": obj.id }));
            const other = action.payload.other.map(obj=> ({ ...obj, "key": obj.id }));
            return { ...action.payload, "segment_1": segment1, "segment_2": segment2, "other": other };
        case "SAVE_REVENUE_SUCCESS":
            if (action.payload.segment === 1) {
                const segment = [ ...state.segment_1, { ...action.payload } ];
                return { ...state, "segment_1": segment };
            }
            if (action.payload.segment === 2) {
                const segment = [ ...state.segment_2, { ...action.payload } ];
                return { ...state, "segment_2": segment };
            }
            if (action.payload.segment === 3) {
                const segment = [ ...state.other, { ...action.payload } ];
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
            return { ...state, "stream_types": action.payload.stream_types };
        case 'FETCHING_REVENUE_PRICES_SUCCESS':
            return { ...state, "prices": action.payload.prices };
        default:
            return state;
    }
}
