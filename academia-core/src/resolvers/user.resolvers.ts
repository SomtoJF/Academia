import { UserInterface } from "../models/types/user.types.js";
import User from "../models/user.model.js";

export async function getUser(userId: string) {
	return await User.findById(userId);
}

export async function createUser(edits: UserInterface) {
	try {
		const newUser = new User(edits);
		return await newUser.save();
	} catch (err) {
		throw err;
	}
}

enum Role {
	EXAMINER,
	STUDENT,
}

export interface CreateUserInterface {
	edits: {
		_id: string;
		firstName: string;
		lastName: string;
		email: string;
		role: Role;
		profilePicture?: string;
	};
}
