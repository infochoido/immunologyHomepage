import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,  // 10초
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    validateStatus: function (status) {
        return status < 500;
    }
});

const API_DOMAIN = `/api/v1`;

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`;

const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`;

const POST_BOARD_URL = () => `${API_DOMAIN}/board`;

const GET_BOARD_CATEGORY_URL = (category) => `${API_DOMAIN}/board/category?category=${category}`;

const GET_BOARD_DETAIL_URL = (boardNumber) => `${API_DOMAIN}/board/${boardNumber}`;

const UPLOAD_IMAGE_URL = () => `${API_DOMAIN}/upload`;

//reqestBody에 userName, password 둘다 STRING

export const signInRequest = async (requestBody) => {
    try {
        const response = await instance.post(SIGN_IN_URL(), requestBody, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Sign in error:', error);
        if (error.response?.status === 401) {
            return { code: 'SF', message: '아이디 또는 비밀번호가 일치하지 않습니다.' };
        }
        return { code: 'DBE', message: '서버 오류가 발생했습니다.' };
    }
};

export const getBoardByCategory = async(category) => {
    try {
        const response = await instance.get(GET_BOARD_CATEGORY_URL(category));
        return response.data;
    } catch (error) {
        console.error('Error fetching board data:', error);
        throw error;
    }
}

export const authorization = (accessToken) => ({
    headers: {
        Authorization: `Bearer ${accessToken}`,
    },
});


//requestbody에 글 제목, content, 이미지, 작성 시간, 작성자 이메일 , 작성자 닉네임 
export const postBoardRequest = async (requestBody, accessToken) => {
    try {
        const response = await instance.post(POST_BOARD_URL(), requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Post board error:', error);
        if (error.response) {
            return error.response.data;
        }
        return { code: 'ERROR', message: error.message };
    }
};

const FILE_DOMAIN = `/api/v1`;

const FILE_UPLOAD_URL = () => `${FILE_DOMAIN}/upload`;

const multipartFormData = {headers: { 'Content-Type':'multipart/form-data'}};

export const fileUploadRequest = async (data) =>{
    console.log("api호출", data);
    const result = await axios.post(FILE_UPLOAD_URL(), data, multipartFormData)
    .then(response =>{
        console.log(response)
        const responseBody = response.data;
        return responseBody;
    })
    .catch(error=>{
        console.log(error)
        return null;
    })
    return result;
}

export const getBoardDetail = async(boardNumber) => {
    try {
        const response = await instance.get(GET_BOARD_DETAIL_URL(boardNumber));
        return response.data;
    } catch (error) {
        console.error('Error fetching board detail:', error);
        throw error;
    }
}

// 이미지 업로드 함수 수정
export const uploadImage = async (file, accessToken) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        
        const response = await instance.post('/api/v1/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        
        console.log('이미지 업로드 응답:', response);
        
        if (response.data && response.data.url) {
            // 전체 URL로 변환
            return `http://localhost:8080${response.data.url}`;
        } else {
            throw new Error('이미지 URL을 받지 못했습니다.');
        }
    } catch (error) {
        console.error('이미지 업로드 에러:', error);
        throw error;
    }
};

export const uploadFileRequest = async (formData) => {
  try {
    const response = await axios.post(
      `${API_DOMAIN}/api/v1/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      }
    );
    return response;
  } catch (error) {
    console.error('파일 업로드 에러:', error);
    throw error;
  }
};

export const putBoardRequest = async (boardNumber, requestBody, accessToken) => {
    try {
        const response = await instance.put(`${API_DOMAIN}/board/${boardNumber}`, requestBody, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Update board error:', error);
        if (error.response) {
            return error.response.data;
        }
        return { code: 'ERROR', message: error.message };
    }
};

export const deleteBoardRequest = async (boardNumber, accessToken) => {
    try {
        const response = await instance({
            method: 'DELETE',
            url: `/api/v1/board/${boardNumber}`,
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Delete request failed:', error);
        throw error;
    }
};

instance.interceptors.request.use(
    (config) => {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('accessToken='))
            ?.split('=')[1];
            
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // 401 에러 시 로그아웃 처리하지 않음
            return Promise.reject(error);
        }
        return Promise.reject(error);
    }
);