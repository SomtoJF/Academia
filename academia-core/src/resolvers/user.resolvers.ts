import Exam from "../models/exam.model.js";
import Result from "../models/result.model.js";
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
/**
 *
 * @param userId Id of the user
 * @returns Array of exams which the user's id is among the list of users which submitted
 */
export async function getExamsTaken(userId: string) {
	try {
		const parent = await User.findById(userId);
		if (parent.role !== "STUDENT")
			throw new Error(
				"Only students can take exams. This entity is not a student"
			);
		return await Exam.find({ submittedIds: { $in: parent._id } });
	} catch (error) {
		throw error;
	}
}

export async function getExamsRegisteredFor(parent: UserInterface) {
	// const parent = await User.findById(userId);
	if (parent.role !== "STUDENT")
		throw new Error("This entity cannot register for exams.");
	return Exam.find({ candidatesId: { $in: parent._id } });
}

export async function getExamsSet(userId: string) {
	try {
		const parent = await User.findById(userId);
		if (parent.role !== "EXAMINER")
			throw new Error(
				"Only examiners can set exams. This entity is not an examiner"
			);
		return await Exam.find({ examinerId: userId });
	} catch (error) {
		throw error;
	}
}

export async function updateUser({ id, edits }: UpdateUserInterface) {
	try {
		return await User.findByIdAndUpdate(id, edits);
	} catch (error) {
		throw error;
	}
}

export async function deleteUser(id: string) {
	try {
		return await User.findByIdAndDelete(id);
	} catch (error) {
		throw error;
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

export interface UpdateUserInterface {
	id: string;
	edits: {
		firstName?: string;
		lastName?: string;
		email?: string;
		profilePicture?: string;
	};
}
