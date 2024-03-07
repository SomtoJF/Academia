import { UploadClient } from "@uploadcare/upload-client";

const client = new UploadClient({
	publicKey: import.meta.env.VITE_REACT_APP_UPLOADCARE_KEY,
	maxContentLength: 2097152,
});

export default async function uploadImage(file: File) {
	try {
		const response = await client.uploadFile(file);
		return response;
	} catch (err: any) {
		throw new Error(err);
	}
}
