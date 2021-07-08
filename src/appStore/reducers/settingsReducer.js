export const userSettingsReducer = (state = {}, action) => {
    switch (action.type) {
        case "FETCHING_SETTINGS_SUCCESS":
            return action.payload;
        case "UPDATE_SETTINGS_SUCCESS":
            return action.payload;
        default:
            return state;
    }
};
export const changePasswordReducer = (state = null, action) => {
    switch (action.type) {
        case "CHANGE_PASSWORD_SUCCESS":
            return action.payload;
        default:
            return state;
    }
};

export const changeEmailReducer = (state = null, action) => {
    switch (action.type) {
        case "CHANGE_EMAIL_SUCCESS":
            return action.payload;
        default:
            return state;
    }
};

export const resendVerificationEmailReducer = (state = null, action) => {
    switch (action.type) {
        case "RESEND_VERIFICATION_EMAIL_SUCCESS":
            return action.payload;
        default:
            return state;
    }
};