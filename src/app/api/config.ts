import { Notification } from "../../helpers/notification";
import axiosInstance from "./index";

export function apiConfig() {
	async function getRequest(url: string, params: object = {}) {
		try {
			const res = await axiosInstance.get(url, { params });
			return res;
		} catch (error) {
			console.log(error);
			throw error; // Re-throw the error so React Query can handle it properly
		}
	}
	async function postRequest(url: string, body: object = {}) {
		try {
			const res: any = await axiosInstance.post(url, body);
			return res;
		} catch (error: any) {
			Notification("error", error?.message);
			throw error; // Re-throw the error so React Query can handle it properly
		}
	}
	async function deleteRequest(url: string, params: object = {}) {
		try {
			const res = await axiosInstance.delete(url, params);
			return res;
		} catch (error: any) {
			Notification("error", error?.message);
			throw error; // Re-throw the error so React Query can handle it properly
		}
	}
	async function updateRequest(url: string, body: object) {
		try {
			const res = await axiosInstance.patch(url, body);
			return res;
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			Notification("error", error?.response?.data?.message?.message);
			throw error; // Re-throw the error so React Query can handle it properly
		}
	}
	return {
		getRequest,
		postRequest,
		deleteRequest,
		updateRequest,
	};
}
