import axios from "axios";

const DOMAIN = 'http://localhost:8080';

const API_DOMAIN = `${DOMAIN}/api/v1`;

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;

const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

const POST_BOARD_URL = () =>`${API_DOMAIN}/board`


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

export const authorization = (accessToken) => ({
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
});


//requestbody에 글 제목, content, 이미지, 작성 시간, 작성자 이메일 , 작성자 닉네임 
export const postBoardRequest = async(requestBody, accessToken)=>{
    const response = await axios.post(POST_BOARD_URL(), requestBody, authorization(accessToken))
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

const FILE_DOMAIN = `${DOMAIN}/file`;

const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;

const multipartFormData = {headers: { 'Content-Type: ': 'multipart/form-data'}};

export const fileUploadRequest = async (data) =>{
    const result = await axios.post(FILE_UPLOAD_URL(), data, multipartFormData)
    .then(response =>{
        const responseBody = response.data;
        return responseBody;
    })
    .catch(error=>{
        return null;
    })
    return result;
}