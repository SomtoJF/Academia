import mongoose from "mongoose";
import { ResultStatus, Result as ResultType } from "./types/result.types.js";

const ResultModel = new mongoose.Schema<ResultType>(
	{
		examId: { type: String, required: true },
		objectiveAnswers: { type: [Number], required: false },
		candidateId: { type: String, required: true, unique: true },
		theoryAnswers: { type: [String], required: false },
		totalQuestions: { type: Number, required: true },
		score: { type: Number, required: false },
		status: {
			type: String,
			enum: Object.values(ResultStatus),
			required: true,
			default: ResultStatus.PENDING,
		},
	},
	{ timestamps: true }
);

const Result = mongoose.model("Result", ResultModel, "results");
export default Result;
