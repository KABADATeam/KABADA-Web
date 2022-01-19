import Cookies from 'js-cookie'


const authenticationReducer = (state = {user: {access_token: null, email: null, name: null}}, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            const user = {
                ...state,
                access_token: action.payload.access_token,
                name: action.payload.name,
                email: action.payload.email
            };
            saveToStorage(user);
            return user;
        case 'LOGOUT_USER_SUCCESS':
            wipeStorage();
            const _user = {
                access_token: null,
                name: null,
                email: null
            };
            return _user;
        default:
            return state;
    }
}

function initState() {
    var authObject = {};

    authObject.access_token = Cookies.get('access_token');
    authObject.email = Cookies.get('email');
    authObject.name = Cookies.get('name');
    // authObject.access_token = localStorage.getItem('access_token');
    // authObject.email = localStorage.getItem('email');
    // authObject.name = localStorage.getItem('name');

    return authObject;
};

function saveToStorage(authObject) {
    var inFifteenMinutes = new Date(new Date().getTime() + 60 * 60 * 1000);
    Cookies.set('access_token', authObject.access_token, {
        expires: inFifteenMinutes
    });
    Cookies.set('email', authObject.email, {
        expires: inFifteenMinutes
    });
    Cookies.set('name', authObject.name, {
        expires: inFifteenMinutes
    });
    // localStorage.setItem('access_token', authObject.access_token);
    // localStorage.setItem('email', authObject.email);
    // localStorage.setItem('name', authObject.name);
}

function wipeStorage() {
    Cookies.remove('access_token')
    Cookies.remove('email')
    Cookies.remove('name')
    // localStorage.removeItem('access_token');
    // localStorage.removeItem('email');
    // localStorage.removeItem('name');

}

export default authenticationReducer;