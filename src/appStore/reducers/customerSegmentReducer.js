export const customerSegmentPropertiesReducer = (
    state = {}, action) => {
    switch (action.type) {
        case 'FETCHING_CUSTOMER_SEGMENT_PROPERTIES_SUCCESS':
            return { ...state, "customer_segments_types": action.payload };
        default:
            return state;
    }
}

const compareArray = (arrayAI, arrayState) => {
    const newArray = []
    for (var i in arrayAI) {
        if (arrayState.indexOf(arrayAI[i]) === -1) {
            newArray.push(arrayAI[i]);
        }
    }
    return newArray;
}

const generateAIHelpText = (selectedItem, predictsObj, segmentTypes) => {
    const aiHintTextObject = [];
    const predictObj = predictsObj.find(s => s.id === selectedItem.id);   
    const predictProperties = Object.getOwnPropertyNames(predictsObj.find(s => s.id === selectedItem.id));
    const filteredPredictProperties = predictProperties.filter(p => p !== 'id');
    for (const property of filteredPredictProperties){
        const selectedItemPropertyValuesObj = Object.getOwnPropertyDescriptor(selectedItem, property).value;
        const selectedItemPropertyValues = selectedItemPropertyValuesObj.map(s => s.id);
        const predictObjPropertyValues = Object.getOwnPropertyDescriptor(predictObj, property).value;
        const segmentType = property === 'education' ? segmentTypes.education_types    
                        : property === 'gender' ? segmentTypes.gender_types 
                        : property === 'income' ? segmentTypes.income_types 
                        : null
        console.log(segmentType)
        const comparePropertiesValues = compareArray(predictObjPropertyValues, selectedItemPropertyValues);
        console.log(comparePropertiesValues);
        if (comparePropertiesValues.length > 0) {
            const typePredictArray = []
            const types = segmentType;
            for (var i = 0; i < comparePropertiesValues.length; i++){
                 const segment_type_title = types.find(t => t.id === comparePropertiesValues[i]);
                 typePredictArray.push(segment_type_title);
            }
            const new_obj = {
                type_title: property,
                predict: typePredictArray
            }
            aiHintTextObject.push(new_obj);
        }
    }
    console.log(aiHintTextObject)
    return aiHintTextObject
}

export const customerSegmentReducer = (
    state = {
        is_customer_segments_completed: false,
        consumers: [],
        business: [],
        public_bodies_ngo: [],
        aiPredictEdit: null,
        aiPredictTextEdit: [],
        errorMessageEdit: false,
        aiPredict: null,
        aiPredictText: [],
        errorMessage: false
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
            const is_completed = action.payload.is_customer_segments_completed;
            const consumers_w_k = action.payload.consumers ? action.payload.consumers.map(obj => ({ ...obj, "key": obj.id })) : [];
            const business_w_k = action.payload.business ? action.payload.business.map(obj => ({ ...obj, "key": obj.id })) : [];
            const public_bodies_ngo_w_k = action.payload.public_bodies_ngo ? action.payload.public_bodies_ngo.map(obj => ({ ...obj, "key": obj.id })) : [];
            const consumers_w_titles = consumers_w_k ? consumers_w_k.map(v => ({
                ...v, age_titles: v.age.map(e => e.title).join(", "), gender_titles: v.gender.map(e => e.title).join(", "),
                location_titles: v.geographic_location.map(e => e.title).join(", ")
            })) : [];
            const business_w_titles = business_w_k ? business_w_k.map(v => ({
                ...v, business_type_titles: v.business_type.map(e => e.title).join(", "), company_size_titles: v.company_size.map(e => e.title).join(", "), location_titles: v.geographic_location.map(e => e.title).join(", ")
            })) : [];
            const ngo_w_titles = public_bodies_ngo_w_k ? public_bodies_ngo_w_k.map(v => ({
                ...v, ngo_types_titles: v.ngo_types.map(e => e.title).join(", ")
            })) : [];
            return { ...state, "is_customer_segments_completed": is_completed, "consumers": consumers_w_titles, "business": business_w_titles, "public_bodies_ngo": ngo_w_titles };
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
        case "GET_AI_PREDICT_SUCCESS":
            const aiHintText = [];
            const aiHintObject = [];
            const consumersObj = state.consumers.find(c => c.id === action.payload.itemID);
            // console.log(consumersObj);
            // const consumer = generateAIHelpText(action.payload.data.plan.custSegs, action.payload.segmentType);
            // console.log(consumer);
            const text = action.payload.segmentType === 'consumer' ? generateAIHelpText(state.consumers.find(c => c.id === action.payload.itemID), action.payload.data.plan.custSegs.consumer, action.payload.segments.customer_segments_types) 
                : generateAIHelpText(state.business.find(c => c.id === action.payload.itemID), action.payload.data.plan.custSegs.business, action.payload.segments.customer_segments_types);
            //console.log(text);
            if (consumersObj !== undefined) {
                const consumerGender = consumersObj.gender.map(c => c.id);
                const consumerEducation = consumersObj.education.map(c => c.id);
                const consumerIncome = consumersObj.income.map(c => c.id);
                const consumersAIObjects = action.payload.data.plan.custSegs.consumer;
                const consumerAIObject = consumersAIObjects.find((el) => el.id === consumersObj.id);
                const genderAIPredict = compareArray(consumerAIObject.gender, consumerGender);
                if (genderAIPredict.length > 0) {
                    const genderPredictArray = [];
                    const gender_types = action.payload.segments.customer_segments_types.gender_types;
                    for (var i = 0; i < genderAIPredict.length; i++) {
                        const genderTypesTitle = gender_types.find(g => g.id === genderAIPredict[i]);
                        genderPredictArray.push(genderTypesTitle);
                    }
                    const new_obj = {
                        type_title: 'Gender',
                        predict: genderPredictArray
                    }
                    aiHintObject.push(new_obj);
                }
                const educationAIPredict = compareArray(consumerAIObject.education, consumerEducation);
                if (educationAIPredict.length > 0) {
                    const educationPredictArray = [];
                    const education_types = action.payload.segments.customer_segments_types.education_types;
                    for (var i = 0; i < educationAIPredict.length; i++) {
                        const educationTypesTitle = education_types.find(e => e.id === educationAIPredict[i]);
                        educationPredictArray.push(educationTypesTitle);
                    }
                    const new_obj = {
                        type_title: 'Education',
                        predict: educationPredictArray
                    }
                    aiHintObject.push(new_obj);
                }
                const incomeAIPredict = compareArray(consumerAIObject.income, consumerIncome);
                if (incomeAIPredict.length > 0) {
                    const incomePredictArray = [];
                    const income_types = action.payload.segments.customer_segments_types.income_types;
                    for (var i = 0; i < incomeAIPredict.length; i++) {
                        const incomeTypesTitle = income_types.find(e => e.id === incomeAIPredict[i]);
                        incomePredictArray.push(incomeTypesTitle);
                    }
                    const new_obj = {
                        type_title: 'Income',
                        predict: incomePredictArray
                    }
                    aiHintObject.push(new_obj);
                }
            }

            return {
                ...state,
                "aiPredict": action.payload.data.plan,
                "aiPredictText": aiHintObject
            }
        case "ERROR_AI_MESSAGE":
            console.log(action.payload);
            return { ...state, "errorMessage": action.payload }
        case "RESET_AI_PREDICT":
            return {
                ...state,
                "aiPredict": null,
                "aiPredictText": []
            }
        default:
            return state;
    }
}