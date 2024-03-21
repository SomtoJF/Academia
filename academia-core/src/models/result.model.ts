import mongoose from "mongoose";
import { ResultStatus, Result as ResultType } from "./types";

const ResultModel = new mongoose.Schema<ResultType>(
	{
		examId: { type: String, required: true },
		objectiveAnswers: { type: [Number], required: false },
		candidateId: { type: String, required: true },
		theoryAnswers: { type: [String], required: false },
		totalQuestions: { type: Number, required: true },
		score: { type: Number, required: false },
		status: { enum: ResultStatus, required: true },
	},
	{ timestamps: true }
);

const Result = mongoose.model("Result", ResultModel, "exams");
export default Result;
