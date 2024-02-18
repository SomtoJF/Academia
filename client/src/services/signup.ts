import axios from "axios";

interface Payload {
	firstName: string;
	lastName: string;
	email: string;
	role: "student" | "examiner";
}

export default async function createUserInBackend(payload: Payload) {
	const response = await axios.post(
		import.meta.env.VITE_BACKEND_URL + "/auth/signup",
		{
			...payload,
		}
	);
	return response;
}
