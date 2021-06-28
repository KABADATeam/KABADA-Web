export const planLanguagesReducer = (state = [], action) => {
    switch (action.type) {
        case 'PLAN_LANGUAGES_FETCH_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}