import axios from "axios";

interface Payload {
	email: string;
	password: string;
}

export default async function login(payload: Payload) {
	const response = await axios.post(
		import.meta.env.VITE_BACKEND_URL + "/auth/login",
		{
			...payload,
		}
	);
	// console.log(response);
	sessionStorage.setItem("userId", response.data.id);
	return response;
}
