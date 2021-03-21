const languageReducer = (state = initState(), action) => {
    switch (action.type) {
        case 'LANGUAGE_CHANGE_SUCCESS':
            localStorage.setItem("language", action.payload);
            return action.payload;
        default:
            return state;
    }
}

function initState() {
    if (localStorage.getItem("language") !== null) {
        return localStorage.getItem("language");
    } else {
        return "en";
    }
}

export default languageReducer;