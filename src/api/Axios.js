import axios from "axios";

const default_url = process.env.REACT_APP_API_URL;
const board_default = process.env.REACT_APP_API_BOARD;

const default_header = {
    'Content-Type': 'application/json',
}

// Axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: `${default_url}${board_default}`,
    headers: {
        default_header,
    },
});

axiosInstance.interceptors.request.use(function (config) {
    // request가 서버에 보내지기 전에 실행
    return config;
}, function (error) {
    // 요청 오류 처리
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    // 응답 데이터를 가공하거나 처리
    return response;
}, function (error) {
    // 응답 오류 처리
    return Promise.reject(error);
});

// 공통 요청 함수
const axiosRequest = async (method, url, options = {}, fn_callback) => {
    try {
        const {
            params = undefined,
            data = undefined,
        } = options;

        const response = await axiosInstance({
            method,
            url,
            params,
            data,
        });

        if (!response) return;

        // 서버에서 응답을 받았지만 status가 200이 아닌경우
        if(response.status !== 200){
            axiosError(new Error(`[${response.data.status}] ${response.data.message}`));
            return;
        }

        if (fn_callback && typeof fn_callback === "function") {
            fn_callback(response);
        }

        return response;
    } catch (error) {
        //throw error;
        axiosError(error);
    }
};

const axiosError = async(error) => {
    // 기타 에러 처리
    console.log(error);
}

export default axiosRequest; // 기본 익스포트 사용