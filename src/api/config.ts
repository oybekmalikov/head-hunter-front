import axiosInstance from ".";
import { Notification } from "@/helpers/notification";

export function apiConfig() {
    async function getRequest(url: string, params: object = {}) {
        try {
            const res = await axiosInstance.get(url, { params });
            return res
        } catch (error) {
            Notification('error', error?.message)
            throw error
        }
    }

    async function postRequest(url: string, body: object = {}) {
        try {
            const res = await axiosInstance.post(url, body);
            if (res.status === 201 || res.status === 200) {
                Notification('success', res.data.message)
                return res
            }
            return res;
        } catch (error) {
            console.log(error?.response?.data);
            Notification('error', error?.message)
            throw error
        }
    }

    async function putRequest(url: string, body: object = {}) {
        try {
            const res = await axiosInstance.put(url, body);
            if (res.status === 200) {
                Notification('success', res.data.message)
                return res
            }
            return res;
        } catch (error) {
            console.log(error?.response?.data);
            Notification('error', error?.message)
            throw error
        }
    }

    async function patchRequest(url: string, body: object = {}) {
        try {
            const res = await axiosInstance.patch(url, body);
            if (res.status === 200) {
                Notification('success', res.data.message)
                return res
            }
            return res;
        } catch (error) {
            console.log(error?.response?.data);
            Notification('error', error?.message)
            throw error
        }
    }

    async function deleteRequest(url: string, params: object = {}) {
        try {
            const res = await axiosInstance.delete(url, { params });
            if (res.status === 200) {
                Notification('success', res.data.message)
                return res
            }
            return res;
        } catch (error) {
            console.log(error?.response?.data);
            Notification('error', error?.message)
            throw error
        }
    }

    async function deleteByData(url: string, data: object = {}) {
        try {
            const res = await axiosInstance.delete(url, data);
            if (res.status === 200) {
                Notification('success', res.data.message)
                return res
            }
            return res;
        } catch (error) {
            console.log(error?.response?.data);
            Notification('error', error?.message)
            throw error
        }

    }


    return {
        getRequest,
        postRequest,
        putRequest,
        patchRequest,
        deleteRequest,
        deleteByData
    }
}