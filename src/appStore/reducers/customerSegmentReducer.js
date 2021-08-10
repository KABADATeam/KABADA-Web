export const customerSegmentPropertiesReducer = (
    state = {}, action) => {
    switch (action.type) {
        case 'FETCHING_CUSTOMER_SEGMENT_PROPERTIES_SUCCESS':
            return { ...state, "customer_segments_types": action.payload };
        default:
            return state;
    }
}

export const customerSegmentReducer = (
    state = {
        is_customer_segments_completed: false,
        consumers: [],
        business: [],
        public_bodies_ngo: []
    }, action) => {
    switch (action.type) {
        case 'SAVE_CONSUMER_SEGMENT_SUCCESS':
            const newConsumerSegment = [...state.consumers, { ...action.payload }];
            return { ...state, "consumers": newConsumerSegment };
        case 'SAVE_BUSINESS_SEGMENT_SUCCESS':
            const newBusinessSegment = [...state.business, { ...action.payload }];
            return { ...state, "business": newBusinessSegment };
        case 'SAVE_NGO_SEGMENT_SUCCESS':
            const newNgoSegment = [...state.public_bodies_ngo, { ...action.payload }];
            return { ...state, "public_bodies_ngo": newNgoSegment };
        case "FETCHING_CUSTOMER_SEGMENTS_SUCCESS":

            const consumers = action.payload.consumers ? action.payload.consumers.map(obj => ({
                ...obj, "key": obj.id, "age_titles": obj.age.map(e => e.title).join(", "),
                "gender_titles": obj.gender.map(e => e.title).join(", "),
                "location_titles": obj.geographic_location.map(e => e.title).join(", ")
            })) : state.consumers;
            const business = action.payload.business ? action.payload.business.map(obj => ({ ...obj, "key": obj.id, "business_type_titles": obj.business_type.map(e => e.title).join(", "), "company_size_titles": obj.company_size.map(e => e.title).join(", ") })) : state.business;
            const public_bodies_ngo = action.payload.public_bodies_ngo ? action.payload.public_bodies_ngo.map(obj => ({ ...obj, "key": obj.id, "ngo_types_titles": obj.ngo_types.map(e => e.title).join(", ") })) : state.public_bodies_ngo;
            return { ...action.payload, "consumers": consumers, "business": business, "public_bodies_ngo": public_bodies_ngo };
        case "UPDATE_CONSUMER_SEGMENT_SUCCESS":
            const updatedConsumerSegment = state.consumers.map(x => x.id === action.payload.id ? action.payload : x);
            return { ...state, "consumers": updatedConsumerSegment };
        case "UPDATE_BUSINESS_SEGMENT_SUCCESS":
            const updatedBusinessSegment = state.business.map(x => x.id === action.payload.id ? action.payload : x);
            return { ...state, "business": updatedBusinessSegment };
        case "UPDATE_NGO_SEGMENT_SUCCESS":
            const updatedNgoSegment = state.public_bodies_ngo.map(x => x.id === action.payload.id ? action.payload : x);
            return { ...state, "public_bodies_ngo": updatedNgoSegment };
        case "REMOVING_CONSUMER_SEGMENT_SUCCESS":
            const removedConsumerSegment = state.consumers.filter(x => x.id !== action.payload.id);
            return { ...state, "consumers": removedConsumerSegment };
        case "REMOVING_BUSINESS_SEGMENT_SUCCESS":
            const removedBusinessSegment = state.business.filter(x => x.id !== action.payload.id);
            return { ...state, "business": removedBusinessSegment };
        case "REMOVING_NGO_SEGMENT_SUCCESS":
            const removedNgoSegment = state.public_bodies_ngo.filter(x => x.id !== action.payload.id);
            return { ...state, "public_bodies_ngo": removedNgoSegment };
        case "SAVE_STATE_SUCCESS":
            return { ...state, "is_customer_segments_completed": action.payload };
        default:
            return state;
    }
}