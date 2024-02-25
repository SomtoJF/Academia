import mongoose from "mongoose";
import {
	ExamInterface,
	ObjQuestionInterface,
	TheoryQuestionInterface,
} from "./types";

const ObjQuestionSchema = new mongoose.Schema<ObjQuestionInterface>({
	// Ensure 'answer' is stored as a number
	question: String,
	options: [String],
	answer: Number,
});

const TheoryQuestionSchema = new mongoose.Schema<TheoryQuestionInterface>({
	question: String,
	answers: [String],
});

const ExamModel = new mongoose.Schema<ExamInterface>(
	{
		name: {
			type: String,
			required: true,
		},
		examinerId: {
			type: String,
			required: true,
		},
		candidatesId: {
			type: [String],
			required: false,
		},
		objectiveQuestions: {
			type: [ObjQuestionSchema],
			required: false,
		},
		theoryQuestions: { type: [TheoryQuestionSchema], required: false },
		due: {
			required: true,
			type: Date,
		},
	},
	{ timestamps: true }
);

const Exam = mongoose.model("Exam", ExamModel, "exams");
export default Exam;
