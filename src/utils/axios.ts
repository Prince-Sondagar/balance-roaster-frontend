import axios, { AxiosInstance, AxiosResponse } from "axios";
import localStorage from "../services/localStorage.service";

export type APISuccessResponse<T = undefined> = {
	error: boolean;
	message: string;
	data: T;
	response: AxiosResponse<T>;
};

const createAxiosInstance = (): AxiosInstance => {
	const instance = axios.create({
		baseURL: process.env.REACT_APP_BASE_API_URL,
	});

	instance.interceptors.request.use(
		(config: any) => {
			const tokens = localStorage.getItem("tokens");
			// @ts-ignore
			config.headers.authorization = `Bearer ${tokens?.accessToken}`;
			return config;
		},
		(error) => {
			return Promise.reject(error);
		},
	);

	instance.interceptors.response.use(
		(response: AxiosResponse) => {
			return response;
		},
		(error) => {
			return Promise.reject(error.response ?? error);
		},
	);

	return instance;
};

const axiosClient = createAxiosInstance();

export default axiosClient;
