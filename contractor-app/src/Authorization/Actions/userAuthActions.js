import axios from "axios";
import { LOGIN_USER } from "../../Redux/actions/ActionTypes";

// Set logged in user
export const setCurrentUser = (decoded_data) => {
    return {
        type: LOGIN_USER,
        payload: decoded_data
    };
};

export const loginUser = (userData) => {

}

export const registerUser = (userData, history, setErrors) => {
    console.log('reginald')
    axios.post('http://localhost:4000/register', userData)
    .then((res) => {
        console.log(res)
    })
    .catch((err) => {
        setErrors(err.response.data);
    })
}