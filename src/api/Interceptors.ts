import axios, {type CreateAxiosDefaults} from 'axios';
import {getAccessToken, removeTokenStorage} from "@/services/auth-token.service";

const options:CreateAxiosDefaults = {
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
}

const axiosClassic = axios.create(options);
const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use(config => {
  const accessToken = getAccessToken()

  if (config?.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config;
})

axiosWithAuth.interceptors.response.use(
  config => config,
  async error => {
    const originalRequest = error.config

    if (error?.response?.status === 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true

      try {
        return axiosWithAuth.request(originalRequest)
      } catch (error) {
        removeTokenStorage()
      }
    } else {
      removeTokenStorage()
    }

    throw error
  }
)


export { axiosClassic, axiosWithAuth }
