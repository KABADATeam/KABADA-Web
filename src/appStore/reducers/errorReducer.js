export default (state = '', action) => {
    switch(action.type) {
        case 'ERROR':
            if (action.payload.message !== undefined) {
                return action.payload.message;
            } else {
                return action.payload;
            }
        default:
            return state;
    }
}