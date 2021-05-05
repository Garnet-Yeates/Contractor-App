// Set logged in user
export const setCurrentUser = (decoded_data) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded_data
    };
};

export const loginUser = (userData) => {

}

export const registerUser = (userData) => {

}