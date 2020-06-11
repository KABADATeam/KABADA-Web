export const errorHandler = (error) => {           
    if (error.response === undefined) {
        return "Oopsie... System error. Try again, later";
    } else {
        if (error.response.status === 401) {
            return "Your session has expired. Please, relogin.";
        } else {
            return error.response.data;
        }
    }            
}