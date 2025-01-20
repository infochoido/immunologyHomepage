import axios from "axios";

const DOMAIN = 'http://localhost:8080';

const API_DOMAIN = `${DOMAIN}/api/v1`;

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;

const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

const POST_URL = () =>`${API_DOMAIN}/post`


//reqestBody에 userName, password 둘다 STRING

export const signInRequest =async(requestBody)=>{
    const response = await axios.post(SIGN_IN_URL(),requestBody)
    .then(response => {
        const responseBody = response.data;
        return responseBody;
    }).catch(error => {
        if(!error.response.data) return null;
        const responseBody = error.response.data;
        return responseBody;
    }) 

    return response;

}


//requestbody에 글 제목, content, 이미지, 작성 시간, 작성자 이메일 , 작성자 닉네임 
export const postRequest = async(requestBody)=>{
    const response = await axios.post(POST_URL(), requestBody)
    .then(response => {
        const responseBody = response.data;
        return responseBody
    }).catch(error => {
        if(!error.response.data) return null;
        const responseBody = error.response.data;
        return responseBody;
    })
    return response;
}