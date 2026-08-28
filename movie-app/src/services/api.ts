import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
    baseURL: 'http://10.0.2.2:3000/api',
});

api.interceptors.request.use(
    async (config) => {

        const token =
            await SecureStore.getItemAsync("session");

        if (token) {
            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;