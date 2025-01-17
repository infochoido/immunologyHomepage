import axios from "axios";

const DOMAIN = 'http://localhost:8080';

const API_DOMAIN = `${DOMAIN}/api/v1`;

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;

const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;


//reqestBody에 userName, password 둘다 STRING

export const signInRequest =async(requestBody)=>{
    const response = await axios.post(SIGN_IN_URL(),requestBody)
    .then(response => {
        const responseBody = response.data;
        return responseBody;
        //ResponseBody에는 token(String), expirationTime(number)
    }).catch(error => {
        if(!error.response.data) return null;
        const responseBody = error.response.data;
        return responseBody;
    }) 

    return response;

}