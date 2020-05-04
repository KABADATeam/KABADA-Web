export default (state = initState(), action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            const user = { ...state, 
                access_token: action.payload.access_token,
                name: action.payload.name,
                email: action.payload.email
            };
            saveToStorage(user);
            return user;
        default:
            return state;
    }
}

function initState() {
    var authObject = {};

    authObject.access_token = localStorage.getItem('access_token');
    authObject.email = localStorage.getItem('email');
    authObject.name = localStorage.getItem('name');

    return authObject;
}; 

function saveToStorage(authObject) {
    localStorage.setItem('access_token', authObject.access_token);
    localStorage.setItem('email', authObject.email);
    localStorage.setItem('name', authObject.name);
}