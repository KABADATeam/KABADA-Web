export const userSettingsReducer = (state = {}, action) => {
    switch (action.type) {
        case "FETCHING_SETTINGS_SUCCESS":
            return userSettingsData;
        case "UPDATE_SETTINGS_SUCCESS":
            return action.payload;
        default:
            return state;
    }
};


const userSettingsData = {
    'facebook': true,
    'google': false,
    'firstName': 'firstname',
    'lastName': 'lastName',
    'recieveEmail': false,
    'recieveNotification': true,
    'isEmailConfirmed': false,
    'userImage': 'http://icons.iconseeker.com/png/fullsize/fruity-apples/seablue-512.png',
};