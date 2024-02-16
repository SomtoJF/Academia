import axios from "axios";

interface Payload {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	role: "student" | "examiner";
}

export default async function signup(payload: Payload) {
	const response = await axios.post(
		import.meta.env.VITE_BACKEND_URL + "/auth/signup",
		{
			...payload,
		}
	);
	return response;
}
