import mongoose from "mongoose";
import { UserInterface } from "./types";

const UserModel = new mongoose.Schema<UserInterface>(
	{
		_id: {
			type: String,
			required: true,
		},
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		profilePicture: {
			type: String,
			required: false,
		},
		email: {
			type: String,
			required: false,
		},
		role: {
			required: true,
			type: String,
			enum: ["EXAMINER", "STUDENT"],
		},
		examsSetId: {
			type: [String],
			required: false,
		},
		examsTakenId: {
			type: [String],
			required: false,
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", UserModel, "users");
export default User;
