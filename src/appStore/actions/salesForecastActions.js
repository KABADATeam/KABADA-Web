import kabadaAPI from './kabadaAPI';

export const getProducts = (planId) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/products/' + planId, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: "FETCHING_PRODUCTS_SUCCESS", payload: response.data });
            console.log(response.data);
        } catch (error) {
            if (error.response === undefined) {
                dispatch({
                    type: "ERROR",
                    payload: { message: "Oops... System error. Try again, later" },
                });
            } else {
                dispatch({ type: "ERROR", payload: error.response.data });
            }
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
};

export const getProductByID = (id) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const token = getState().user.access_token;
            const response = await kabadaAPI.get('api/products/salesforecasts/' + id, { headers: { Authorization: `Bearer ${token}` } });

            // console.log(JSON.stringify(response.data) + "wowowowowowowowowowowo");

            dispatch({ type: "FETCHING_SALES_FORECASR_SUCCESS", payload: response.data });

        } catch (error) {
            if (error.response === undefined) {
                dispatch({
                    type: "ERROR",
                    payload: { message: "Oops... System error. Try again, later" },
                });
            } else {
                dispatch({ type: "ERROR", payload: error.response.data });
            }
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
}

export const changState = (id) => {
    return async (dispatch) => {
        dispatch({ type: "SETING_PRODUCTS_SUCCESS", payload: id });
    }
}

export const updateSalesForecast = (postObject) => {
    return async (dispatch, getState) => {
        try {
            const token = getState().user.access_token;
            await kabadaAPI.post('api/products/salesforecasts/update', postObject, { headers: { Authorization: `Bearer ${token}` } });
            dispatch({ type: 'UPDATE_SALES_FORECAST_SUCCESS', payload: { postObject } });
        }
        finally {
            dispatch({ type: 'LOADING', payload: false })
        }
    }
}


