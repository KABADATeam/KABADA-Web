export const homeReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case 'FETCHING_POSTS_SUCCESS':
            const posts = action.payload;
            console.log(JSON.stringify(action.payload))

            return { ...state, "posts": posts };

        default:
            return state
    }
}