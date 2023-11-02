import axios from "axios";
import { useNavigate } from "react-router-dom";

type Params = {
    [key: string]: unknown;
};

export const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;
export const errorHandle = {
    callback: (v: boolean) => {},
};
export const navigate = useNavigate();

export const api = {
    get: <T>(url: string, params?: Params) => axios.get<T>(baseUrl + url, { params: { ...params } }),
    post: <T, R = unknown, E = unknown>(url: string, data?: R, headers?: E) =>
        axios.post<T>(baseUrl + url, data || {}, { ...headers }),
    put: <T, R = unknown, E = unknown>(url: string, data?: R, headers?: E) =>
        axios.put<T>(baseUrl + url, data || undefined, { ...headers }),
    delete: <T>(url: string) => axios.delete<T>(baseUrl + url),
};

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    async function (error) {
        if (error.response.status === 401) {
            // 401: Unauthorized
            // localStorage에서 refreshToken을 가져와서 재발급 요청
            // 재발급 요청이 실패하면 로그인 페이지로 이동
            // 재발급 요청이 성공하면 accessToken을 localStorage에 저장하고
            // 요청했던 API를 다시 요청
            try {
                const originalRequest = error.config;
                localStorage.removeItem("accessToken");
                const refreshToken = localStorage.getItem("refreshToken");
                const result = await api.post(
                    "/",
                    {
                        refreshToken,
                    },
                    { refreshToken }
                );
                localStorage.setItem("accessToken", result.headers.authorization);
                if (result) {
                    return await axios.request(originalRequest);
                } else {
                    navigate("/");
                }
            } catch (e) {
                navigate("/");
                return Promise.reject(error);
            }
        }

        return Promise.reject(error.response.data);
    }
);

axios.interceptors.request.use(function (config: any) {
    if (config.url.indexOf("/") > -1 || config.url.indexOf("/signup") > -1) return config;
    config.headers = {
        Authorization: localStorage.getItem("accessToken") || "",
    };
    return config;
});
