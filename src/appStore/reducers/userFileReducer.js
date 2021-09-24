export const fileReducer = (state = null, action) => {
    switch (action.type) {
        case 'UPLOADING_FILE_SUCCESS':
            return action.payload;
        case 'DELETING_FILE_SUCCESS':
            return action.payload;
        default:
            return state;
    }
}