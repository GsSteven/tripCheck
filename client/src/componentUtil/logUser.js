import jwt_decode from 'jwt-decode';
const axios = require('axios');

//sets default axios header and saves token to local storage
export const setAuthToken = token => {
    if (token) {
        localStorage.setItem("tripCheckToken", token);
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        localStorage.removeItem("tripCheckToken");
        delete axios.defaults.headers.common["Authorization"];
    }
}

//verifys user, sets token, sends back user object id
export const loginUser = async loginInfo => {
    const currentUserId = await axios.post('/api/auth/login', loginInfo)
        .then(response => {
            if (response.status === 200) {
                const token = response.headers['auth-token'];
                setAuthToken(token);
                return jwt_decode(token)._id;
            }
        })
        .catch(error => {
            let errorMessage = error.response.data;
            if (error.response.status === 500) errorMessage = "Error connecting to server";
            return { errors: errorMessage };
        });
    return currentUserId;
};

//removes token
export const logoutUser = () => {
    setAuthToken(false);
}
