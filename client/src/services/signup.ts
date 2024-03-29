import axios from "axios";

interface Payload {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
	role: "student" | "examiner";
}

export default async function createUserInBackend(payload: Payload) {
	const response = await axios.post(
		import.meta.env.VITE_REACT_APP_BACKEND_URL + "/user/create",
		{
			...payload,
		}
	);
	return response;
}
