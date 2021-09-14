const loadingReducer = (state = false, action) => {
    switch(action.type) {
        case 'LOADING':
            return action.payload;  
        default:
            return state;
    }
}

export const imageLoadingReducer = (state = false, action) => {
    switch(action.type) {
        case 'IMAGE_LOADING':
            return action.payload;  
        default:
            return state;
    }
}

export default loadingReducer;