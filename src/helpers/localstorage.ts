"use client";

export const getItem = (key: string) => {
	if (typeof window !== "undefined") {
		return localStorage.getItem(key);
	}
	return null;
};

export const setItem = (key: string, value: string) => {
	if (typeof window !== "undefined") {
		localStorage.setItem(key, value);
	}
};

export const removeItem = (key: string) => {
	if (typeof window !== "undefined") {
		localStorage.removeItem(key);
	}
};
