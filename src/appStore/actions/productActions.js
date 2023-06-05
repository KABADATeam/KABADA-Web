import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

const AIPredictDummyData = {
    location: 'value-proposition',
    plan: {
        businessPlan_id: '9c698d0a-f4de-4ddc-dd3b-08d9f790d51b',
        valueProposition: [
            {
                id: "c9c6f3a3-aa9f-4722-8b6c-2597f4aa0c70",
                prodType: ['3f2faea5-f8f6-43b4-80f2-db55874a5c4b'],    //Physical
                priceLevel: ['4261a424-6b58-467c-a5da-1844827950b5'],     //High-end
                // income sources: paid plains, different price of business, fees come from another product
                addIncomeSources: ['67cdf9e6-acc0-404a-a189-78325e83f547', '87ffbf10-1f99-4d0b-ae5a-202736ed5a4e', '085df303-2e4d-4dd0-9e9f-204085352597'],
                productFeatures: ['aae57ccf-f33c-4a0e-925a-7a65d8ca171e', '5eb6013b-0cca-4f89-b39d-e711477a972f', '2984418a-638e-4da9-be1d-12ba94d8ffaf',
                    'adcdc439-8170-4fab-a70d-457c1b98bc92', '07d5452f-6ea6-4ae6-9395-89fd1d0eeab0', '4cb290b2-7fbc-4846-be7b-79f9e3efbb46', 'dfe881a2-cd69-4295-a16a-edfb2c8fc0bf']
            },
            {
                id: null,
                prodType: ['c64ed84d-db99-4a25-95f1-79bb99fa6936'],  //Servise
                priceLevel: ['4261a424-6b58-467c-a5da-1844827950b5'], //High-end
                //different price of business, fees come from another product
                addIncomeSource: ['87ffbf10-1f99-4d0b-ae5a-202736ed5a4e', '085df303-2e4d-4dd0-9e9f-204085352597'],
                // is exclusive, is more customisable, is safer to use
                //productFeatures: ['adcdc439-8170-4fab-a70d-457c1b98bc92',  '4cb290b2-7fbc-4846-be7b-79f9e3efbb46', 'dfe881a2-cd69-4295-a16a-edfb2c8fc0bf']
            },
            {
                id: "9265a8e8-1c74-4852-99c0-ff943192398b",
                prodType: ['3f2faea5-f8f6-43b4-80f2-db55874a5c4b'], //Physical
                priceLevel: ['3325759e-8add-4b30-a00c-10ce7fbbd330'], //Free
                // income sources: paid plains, different price of business, fees come from another product
                incomeSources: ['67cdf9e6-acc0-404a-a189-78325e83f547', '87ffbf10-1f99-4d0b-ae5a-202736ed5a4e', '085df303-2e4d-4dd0-9e9f-204085352597'],
                // features: is a fundamentally new product or service, Has a different visual design, Has a new set of features, is exclusive, is a niche, Is more customisable (more user-selectable options), is safer to use 
                productFeatures: ['aae57ccf-f33c-4a0e-925a-7a65d8ca171e', '5eb6013b-0cca-4f89-b39d-e711477a972f', '2984418a-638e-4da9-be1d-12ba94d8ffaf',
                    'adcdc439-8170-4fab-a70d-457c1b98bc92', '07d5452f-6ea6-4ae6-9395-89fd1d0eeab0', '4cb290b2-7fbc-4846-be7b-79f9e3efbb46', 'dfe881a2-cd69-4295-a16a-edfb2c8fc0bf']
            },
        ]
    }
}

export const getProductTypes = () => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        dispatch({ type: "RESET_PRODUCT_STATE" });
        try {
            const response = await kabadaAPI.get('api/products/types');
            dispatch({ type: "FETCHING_PRODUCT_TYPES_SUCCESS", payload: response.data });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const getProductPriceLevels = () => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const response = await kabadaAPI.get('api/products/priceLevels');
            dispatch({ type: "FETCHING_PRODUCT_PRICE_LEVELS_SUCCESS", payload: response.data });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const getInnovativeLevels = () => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const response = await kabadaAPI.get('api/products/innOptions');
            dispatch({ type: "FETCHING_PRODUCT_INNOVATIVE_LEVELS_SUCCESS", payload: response.data });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const getQualityLevels = () => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const response = await kabadaAPI.get('api/products/qualOptions');
            dispatch({ type: "FETCHING_PRODUCT_QUALITY_LEVELS_SUCCESS", payload: response.data });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const getDifferentiationLevels = () => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const response = await kabadaAPI.get('api/products/diffOptions');
            dispatch({ type: "FETCHING_PRODUCT_DIFFERENTIATION_LEVELS_SUCCESS", payload: response.data });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const getAditionalIncomeSources = () => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const response = await kabadaAPI.get('api/products/incomeSources');
            dispatch({ type: "FETCHING_ADDITIONAL_INCOME_SOURCES_SUCCESS", payload: response.data });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const getProductFeatures = () => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const response = await kabadaAPI.get('api/products/features');
            dispatch({ type: "FETCHING_PRODUCT_FEATURES_SUCCESS", payload: response.data });
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const getProducts = (planId) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/products/' + planId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'FETCHING_PRODUCTS_SUCCESS', payload: response.data });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const getProduct = (productId, callback) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/products/product/' + productId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'FETCHING_PRODUCT_SUCCESS', payload: response.data });
            if (callback !== null) {
                callback(response.data);
            }
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const saveProduct = (postObject, callback) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/products/update', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_PRODUCT_SUCCESS', payload: { ...postObject, "id": response.data, "key": response.data } });
            callback();
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const updateProduct = (postObject, callback) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const price_levels = getState().productFeaturesLevels.priceLevels;
            const quality_levels = getState().productFeaturesLevels.quality;
            const priceLevel = price_levels.find(x => x.id === postObject.price_level);
            const productType = getState().productTypes.find(x => x.id === postObject.product_type);
            const qualityLevel = quality_levels.find(x => x.id === postObject.quality_level);
            await kabadaAPI.post('api/products/update', postObject, { headers: { Authorization: `Bearer ${token}` } });
            const obj = {
                "id": postObject.id,
                "name": postObject.title,
                "key": postObject.id,
                "price": priceLevel.title,
                "product_type": productType.title,
                "value": qualityLevel.title
            }
            dispatch({ type: 'UPDATE_PRODUCT_SUCCESS', payload: obj });
            callback();
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const setProductTitle = (title) => {
    return async (dispatch, getState) => {
        dispatch({ type: "SETTING_PRODUCT_TITLE_SUCCESS", payload: title });
    }
}

export const setProductType = (id) => {
    return async (dispatch, getState) => {
        dispatch({ type: "SETTING_PRODUCT_TYPE_SUCCESS", payload: id });
    }
}

export const setProductDescription = (description) => {
    return async (dispatch, getState) => {
        dispatch({ type: "SETTING_PRODUCT_DESCRIPTION_SUCCESS", payload: description });
    }
}

export const setProductPriceLevel = (id) => {
    return async (dispatch, getState) => {
        dispatch({ type: "SETTING_PRODUCT_PRICE_LEVEL_SUCCESS", payload: id });
    }
}

export const setIncomeSources = (list) => {
    return async (dispatch, getState) => {
        dispatch({ type: "SETTING_INCOME_SOURCES_SUCCESS", payload: list });
    }
}

export const setProductFeatures = (list) => {
    return async (dispatch, getState) => {
        dispatch({ type: "SETTING_PRODUCT_FEATURES_SUCCESS", payload: list });
    }
}

export const discardChanges = (product) => {
    return async (dispatch, getState) => {
        dispatch({ type: "DISCARDING_PRODUCT_SUCCESS", payload: product });
    }
}

export const deleteProduct = (id) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.delete("api/products/" + id, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "REMOVING_PRODUCT_SUCCESS", payload: id });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const saveState = (planId, is_completed, callback) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/plans/changePropositionCompleted', { "business_plan_id": planId, "is_proposition_completed": is_completed }, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_STATE_SUCCESS', payload: is_completed });
            callback();
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const getValuePropositionAIPredict = (postObject) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        //dispatch({ type: 'ERROR_AI_MESSAGE', payload: false});
        //dispatch({ type: 'RESET_AI_PREDICT'});
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.post('api/plans/predict', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'GET_PRODUCT_AI_PREDICT', payload: response.data.plan.valueProposition });
        } catch {
            //dispatch({ type: 'ERROR_AI_MESSAGE', payload: true});
        } finally {

        }
    }
}

export const setValuePropositionAIPredict = (productId) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const aiPredict = getState().product.aiPredict;
            const userInsertedData = {
                title: getState().product.tile,
                product_type: getState().product.product_type,
                description: getState().product.description,
                price_level: getState().product.price_level,
                selected_additional_income_sources: getState().product.selected_additional_income_sources,
                product_features: getState().product.product_features
            }
            const productTypes = getState().productTypes;
            const productFeaturesLevels = getState().productFeaturesLevels;
            dispatch({ type: 'SET_PRODUCT_AI_PREDICT', payload: {predict: aiPredict, userData: userInsertedData, productId: productId } })
        } catch {

        } finally {

        }
    }
}

export function resetProducState() {
    return {type : "RESET_PRODUCT_STATE", payload: true}
}
