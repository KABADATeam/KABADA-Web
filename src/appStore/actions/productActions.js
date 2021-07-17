import kabadaAPI from './kabadaAPI';
import { errorHandler } from './errorHandler';

export const getProductTypes = () => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
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
            await kabadaAPI.delete("api/products/" + id, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "REMOVING_PRODUCT_SUCCESS", payload: id });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
        } finally {
        }
    }
};

export const saveState = (planId, is_completed) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/plans/changePropositionCompleted', { "business_plan_id": planId, "is_proposition_completed": is_completed }, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'SAVE_STATE_SUCCESS', payload: is_completed });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: errorHandler(error) });
            //callback2();
        } finally {
        }
    }
};


