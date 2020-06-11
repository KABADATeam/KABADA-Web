export default (state = { type: "info", message: "" }, action) => {
    switch(action.type) {
        case 'ERROR':
            return { ...state, type: "error", message: action.payload };
        case 'INFO':
            return { ...state, type: "info", message: action.payload };
        default:
            return state;
    }
}