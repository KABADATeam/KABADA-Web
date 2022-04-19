
const innovative = [
    {
        id: "aae57ccf-f33c-4a0e-925a-7a65d8ca171e",
        score: 3,
    },
    {
        id: '0ff6b626-a1ff-4184-b1bb-5bf2992091bd',
        score: 1
    },
    {
        id: "bdf69fe7-c3e3-44e1-a984-41041ea08e96",
        score: 2
    },
    {
        id: '2984418a-638e-4da9-be1d-12ba94d8ffaf',
        score: 1
    },
    {
        id: "96f638ad-c41f-492f-982a-7f4018bcb3a6",
        score: 1
    },
    {
        id: 'ae7c712d-f780-429f-aed6-87509c0bc43c',
        score: 1
    }

]

const quality = [
    {
        id: 'adcdc439-8170-4fab-a70d-457c1b98bc92',
        score: 1
    },
    {
        id: '7baa945c-4bcb-46b9-8e95-c72fe5b49778',
        score: 2
    },
    {
        id: 'f9862c29-9a20-4cbe-8fa2-5e1660f6b8da',
        score: 1
    },
    {
        id: 'dfe881a2-cd69-4295-a16a-edfb2c8fc0bf',
        score: 1
    },
    {
        id: '121f0a92-8b35-4890-8384-b66f48db9ac5',
        score: 1
    },
    {
        id: '5365d22f-9372-4471-baab-f1175d25ae0f',
        score: 1
    },
    {
        id: 'd39c0155-1419-4a48-962f-2e42d5aca11b',
        score: 1
    },
    {
        id: '4cb290b2-7fbc-4846-be7b-79f9e3efbb46',
        score: 1
    }

]

const differentiation = [
    {
        id: '0ff6b626-a1ff-4184-b1bb-5bf2992091bd',
        score: 1
    },
    {
        id: '5eb6013b-0cca-4f89-b39d-e711477a972f',
        score: 1
    },
    {
        id: '2984418a-638e-4da9-be1d-12ba94d8ffaf',
        score: 1
    },
    {
        id: 'adcdc439-8170-4fab-a70d-457c1b98bc92',
        score: 1
    },
    {
        id: '07d5452f-6ea6-4ae6-9395-89fd1d0eeab0',
        score: 1
    },
    {
        id: '4cb290b2-7fbc-4846-be7b-79f9e3efbb46',
        score: 1
    },
    {
        id: '49ac2e9c-ecbb-4a14-aa35-a35efb4ff919',
        score: 3
    }
]
const getSliderValue = (objArray, productFeatures) => {
    const valueList = [];
    for (var i = 0; i < productFeatures.length; i++) {
        const obj = objArray.find((element) => element.id === productFeatures[i]);
        if (obj !== undefined) {
            const descriptor = Object.getOwnPropertyDescriptor(obj, 'score');
            valueList.push(descriptor.value);
        }
    }
    var sum = 0
    for (var i = 0; i < valueList.length; i++) {
        sum += valueList[i];
    }
    var index = 0;
    if (sum >= 0 && sum <= 2) {
        index = 0;
        return index;
    } else if (sum >= 3 & sum <= 4) {
        index = 1;
        return index;
    } else if (sum >= 5) {
        index = 2;
        return index;
    }
    return index;
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

export const productsReducer = (
    state = {
        is_proposition_completed: false,
        products: []
    }, action) => {
    switch (action.type) {
        case "FETCHING_PRODUCTS_SUCCESS":
            return { ...state, "products": action.payload.products.map(obj => ({ ...obj, key: obj.id })), "is_proposition_completed": action.payload.is_proposition_completed };
        case "SAVE_PRODUCT_SUCCESS":
            const products = [...state.products, { ...action.payload }];
            return { ...state, "products": products };
        case "UPDATE_PRODUCT_SUCCESS":
            const products_ = state.products.map(x => x.id === action.payload.id ? action.payload : x);
            return { ...state, "products": products_ };
        case "REMOVING_PRODUCT_SUCCESS":
            const _products = state.products.filter(x => x.id !== action.payload);
            return { ...state, "products": _products };
        case "SAVE_STATE_SUCCESS":
            return { ...state, "is_proposition_completed": action.payload };
        default:
            return state;
    }
};

export const productTypesReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCHING_PRODUCT_TYPES_SUCCESS":
            return action.payload.map(obj => ({ ...obj, key: obj.id }));
        default:
            return state;
    }
};

export const productFeatureLevelsReducer = (state = { "priceLevels": [], "innovative": [], "quality": [], "differentiation": [] }, action) => {
    switch (action.type) {
        case "FETCHING_PRODUCT_PRICE_LEVELS_SUCCESS":
            return { ...state, "priceLevels": action.payload.map(obj => ({ ...obj, key: obj.id })) };
        case "FETCHING_PRODUCT_INNOVATIVE_LEVELS_SUCCESS":
            return { ...state, "innovative": action.payload.map(obj => ({ ...obj, key: obj.id })) };
        case "FETCHING_PRODUCT_QUALITY_LEVELS_SUCCESS":
            return { ...state, "quality": action.payload.map(obj => ({ ...obj, key: obj.id })) };
        case "FETCHING_PRODUCT_DIFFERENTIATION_LEVELS_SUCCESS":
            return { ...state, "differentiation": action.payload.map(obj => ({ ...obj, key: obj.id })) };
        default:
            return state;
    }
};

export const additionalIncomeSourcesReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCHING_ADDITIONAL_INCOME_SOURCES_SUCCESS":
            return action.payload.map(obj => ({ ...obj, key: obj.id }));
        default:
            return state;
    }
};

export const productFeaturesReducer = (state = [], action) => {
    switch (action.type) {
        case "FETCHING_PRODUCT_FEATURES_SUCCESS":
            return action.payload.map(obj => ({ ...obj, key: obj.id }));
        default:
            return state;
    }
};

export const productReducer = (
    state = {
        title: '',
        product_type: '',
        description: '',
        price_level: '',
        selected_additional_income_sources: [],
        product_features: [],
        differentiation_level: '',
        innovative_level: '',
        quality_level: '',
        innovative_level_index: null,
        quality_level_index: null,
        differentiation_level_index: null,
        aiPredict: null,
    }, action) => {
    switch (action.type) {
        case "SETTING_PRODUCT_TITLE_SUCCESS":
            return { ...state, "title": action.payload };
        case "SETTING_PRODUCT_TYPE_SUCCESS":
            const typeObj = {
                "type_id": action.payload,
                "tag": 0
            }
            return { ...state, "product_type": typeObj };
        case "SETTING_PRODUCT_DESCRIPTION_SUCCESS":
            return { ...state, "description": action.payload };
        case "SETTING_PRODUCT_PRICE_LEVEL_SUCCESS":
            const priceLevelObj = {
                "price_id": action.payload,
                "tag": 0
            }
            return { ...state, "price_level": priceLevelObj };
        case "SETTING_INCOME_SOURCES_SUCCESS":
            let incomeSourcesArray = [];
            const income_list_action_length = action.payload.length;
            const income_list_state_length = state.selected_additional_income_sources.length;
            const income_state_list = state.selected_additional_income_sources.map(e => e.id);
            if (income_list_action_length > income_list_state_length) {
                const find_income_source = compareArray(action.payload, income_state_list);
                const incomeSourcesObj = {
                    "id": find_income_source[0],
                    "tag": 0
                }
                incomeSourcesArray = [...state.selected_additional_income_sources, incomeSourcesObj];
            } else {
                const deleted_income_item_id = compareArray(income_state_list, action.payload);
                const index = state.selected_additional_income_sources.findIndex(e => e.id === deleted_income_item_id[0]);
                incomeSourcesArray = [...state.selected_additional_income_sources.slice(0, index), ...state.selected_additional_income_sources.slice(index + 1)];
            }
            return { ...state, "selected_additional_income_sources": incomeSourcesArray };
        case "SETTING_PRODUCT_FEATURES_SUCCESS":
            let productFeaturesArray = [];
            const features_list_action_length = action.payload.length;
            const features_list_state_length = state.product_features.length;
            const features_list = state.product_features.map(e => e.id);
            if (features_list_action_length > features_list_state_length) {
                const find_features = compareArray(action.payload, features_list);
                const productFeaturesObj = {
                    "id": find_features[0],
                    "tag": 0
                };
                productFeaturesArray = [...state.product_features, productFeaturesObj];
            } else {
                const deleted_features_item_id = compareArray(features_list, action.payload);
                const index = state.product_features.findIndex(e => e.id === deleted_features_item_id[0]);
                productFeaturesArray = [...state.product_features.slice(0, index), ...state.product_features.slice(index + 1)];
            };
            const innovativeLevelIndex = getSliderValue(innovative, action.payload);
            const qualityLevelIndex = getSliderValue(quality, action.payload);
            const differentiationLevelIndex = getSliderValue(differentiation, action.payload);
            return {
                ...state,
                "product_features": productFeaturesArray,
                "innovative_level_index": innovativeLevelIndex,
                "quality_level_index": qualityLevelIndex,
                "differentiation_level_index": differentiationLevelIndex
            };
        case "FETCHING_PRODUCT_SUCCESS":
            const innovativeLevelIndex_ = getSliderValue(innovative, action.payload.product_features);
            const qualityLevelIndex_ = getSliderValue(quality, action.payload.product_features);
            const differentiationLevelIndex_ = getSliderValue(differentiation, action.payload.product_features);
            const type_Obj = {
                "type_id": action.payload.product_type,
                "tag": 0
            }
            const price_LevelObj = {
                "price_id": action.payload.price_level,
                "tag": 0
            }
            const income_SourcesArray = [];
            for (let i in action.payload.selected_additional_income_sources) {
                const incomeSourcesObj = {
                    "id": action.payload.selected_additional_income_sources[i],
                    "tag": 0
                }
                income_SourcesArray.push(incomeSourcesObj);
            }
            const product_FeaturesArray = [];
            for (let i in action.payload.product_features) {
                const productFeaturesObj = {
                    "id": action.payload.product_features[i],
                    "tag": 0
                }
                product_FeaturesArray.push(productFeaturesObj)
            }
            return {
                ...state,
                "title": action.payload.title,
                "product_type": type_Obj,
                "description": action.payload.description,
                "price_level": price_LevelObj,
                "selected_additional_income_sources": income_SourcesArray,
                "product_features": product_FeaturesArray,
                "differentiation_level": action.payload.differentiation_level,
                "innovative_level": action.payload.innovative_level,
                "quality_level": action.payload.quality_level,
                "innovative_level_index": innovativeLevelIndex_,
                "quality_level_index": qualityLevelIndex_,
                "differentiation_level_index": differentiationLevelIndex_
            }
        case "DISCARDING_PRODUCT_SUCCESS":
            return action.payload;
        case "RESET_PRODUCT_STATE":
            return {
                title: '',
                product_type: '',
                description: '',
                price_level: '',
                selected_additional_income_sources: [],
                product_features: [],
                differentiation_level: '',
                innovative_level: '',
                quality_level: '',
                innovative_level_index: null,
                quality_level_index: null,
                differentiation_level_index: null,
                aiPredict: action.payload === true ? null : state.aiPredict,
            }
        case "GET_PRODUCT_AI_PREDICT":
            return {
                ...state,
                "aiPredict": action.payload,
            }
        case "SET_PRODUCT_AI_PREDICT":
            const ai_obj = action.payload.predict.find(e => e.id === action.payload.productId);
            const income_sources_array = [...state.selected_additional_income_sources];
            const product_features_array = [...state.product_features];
            const aiHintTextObject = []
            const { product_type, price_level } = action.payload.userData;
            const type_obj = product_type.type_id === ai_obj.productType ? { "type_id": ai_obj.productType, "tag": 0 } : { "type_id": ai_obj.productType, "tag": 1 }
            const price_obj = price_level.price_id === ai_obj.priceLevel ? { "price_id": ai_obj.priceLevel, "tag": 0 } : { "price_id": ai_obj.priceLevel, "tag": 1 }
            const selected_income_sources = state.selected_additional_income_sources.map(e => e.id);
            const comparedIncomeSource = compareArray(ai_obj.incomeSources, selected_income_sources);
            for (let i in comparedIncomeSource) {
                const obj = {
                    "id": comparedIncomeSource[i],
                    "tag": 1
                }
                income_sources_array.push(obj);
            }
            const selected_product_features = state.product_features.map(e => e.id);
            const comparedProductFeatures = compareArray(ai_obj.productFeatures, selected_product_features);
            for (let i in comparedProductFeatures) {
                const obj = {
                    "id": comparedProductFeatures[i],
                    "tag": 1
                }
                product_features_array.push(obj);
            }
            const mergedProductFeaturesArray = [...new Set([...ai_obj.productFeatures, ...selected_product_features])];
            const innovative_LevelIndex = getSliderValue(innovative, mergedProductFeaturesArray);
            const quality_LevelIndex = getSliderValue(quality, mergedProductFeaturesArray);
            const differentiation_LevelIndex = getSliderValue(differentiation, mergedProductFeaturesArray);
            return {
                ...state,
                "product_type": type_obj,
                "price_level": price_obj,
                "selected_additional_income_sources": income_sources_array,
                "product_features": product_features_array,
                "innovative_level_index": innovative_LevelIndex,
                "quality_level_index": quality_LevelIndex,
                "differentiation_level_index": differentiation_LevelIndex,
                "aiHintTextObject": aiHintTextObject
            }
        default:
            return state;
    }
};