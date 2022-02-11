import aixos from 'axios'


// export const getPosts = (callback) => {
//     return async (dispatch) => {
//         dispatch({ type: "LOADING", payload: true });
//         try {
//             const response = await aixos.get('https://kabada.eu/wp-json/wp/v2/posts');
//             dispatch({ type: "FETCHING_POSTS_SUCCESS", payload: response.data });
//             callback();
//         } catch (error) {
//             if (error.response === undefined) {
//                 dispatch({
//                     type: "ERROR",
//                     payload: { message: "Oopsie... System error. Try again, later" },
//                 });
//             } else {
//                 dispatch({ type: "ERROR", payload: error.response.data });
//             }
//         } finally {
//             dispatch({ type: "LOADING", payload: false });
//         }
//     };
// };

export const getPosts = (callback) => {
    return async (dispatch, getState) => {
        dispatch({ type: "LOADING", payload: true });
        try {
            const response = await aixos.get('https://kabada.eu/wp-json/wp/v2/posts');

            // console.log(JSON.stringify(response.data) + "wowowowowowowowowowowo");

            dispatch({ type: "FETCHING_POSTS_SUCCESS", payload: response.data });
            console.log(JSON.stringify(response.data));
            callback();
        } catch (error) {
            if (error.response === undefined) {
                dispatch({
                    type: "ERROR",
                    payload: { message: "Oops... System error. Try again, later" },
                });
            } else {
                dispatch({ type: "ERROR", payload: error.response.data });
            }
        } finally {
            dispatch({ type: "LOADING", payload: false });
        }
    };
}