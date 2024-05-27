import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

 export const encryptId = (id) => {
	const paddedId = id.toString().padStart(10, "0");
	return btoa(paddedId);
};


export const decryptId = (encryptedId) => {
	const decryptedId = atob(encryptedId);
	return parseInt(decryptedId, 10);
};

export const formatDate = (dateString) => {
	const options = { year: "numeric", month: "2-digit", day: "2-digit" };
	return new Intl.DateTimeFormat("en-CA", options).format(new Date(dateString));
};