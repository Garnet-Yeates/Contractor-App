export const LOGIN_USER = 'LOGIN_USER'
export const LOGOUT_USER = 'LOGOUT_USER'

export const logoutUser = (history) => {
    return (dispatch) => {
        dispatch({
            type: LOGOUT_USER
        })
        history && history.push('/login');
    }
}

export const loginUser = (jwtToken) => ({
    type: LOGIN_USER,
    payload: jwtToken,
})
