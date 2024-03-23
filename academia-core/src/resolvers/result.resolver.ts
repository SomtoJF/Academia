import Exam from "../models/exam.model.js";
import Result from "../models/result.model.js";
import {
	Result as ResultType,
	ResultStatus,
} from "../models/types/result.types.js";
import moment from "moment";
import User from "../models/user.model.js";

export interface CreateResultInterface {
	edits: {
		examId: string;
		candidateId: string;
		objectiveAnswers: number[];
		theoryAnswers: string[];
	};
}

export interface UpdateResultInterface {
	id: string;
	edits: {
		score: number;
		status: ResultStatus;
	};
}

export async function createResult({ edits }: CreateResultInterface) {
	const thisExam = await Exam.findById(edits.examId);
	const thisResult = await Result.findOne({
		examId: thisExam._id,
		candidateId: edits.candidateId,
	});
	const thisCandidate = await User.findById(edits.candidateId);

	const totalQuestions =
		thisExam.objectiveQuestions.length + thisExam.theoryQuestions.length;

	if (!thisExam) throw new Error("No exam found");
	if (thisCandidate.role !== "STUDENT")
		throw new Error("Only students can take and submit exams");
	if (thisResult) throw new Error("You have already submitted this exam");

	if (moment(thisExam.due).isBefore(moment()))
		throw new Error("This Exam is already closed");

	await Exam.updateOne(
		{ _id: edits.examId },
		{ $push: { submittedIds: edits.candidateId } }
	);
	const newResult = new Result({
		...edits,
		status: ResultStatus.PENDING,
		totalQuestions,
	});
	return newResult.save();
}

export async function getResults(candidateId: string) {
	return Result.find({ candidateId: candidateId });
}

export async function getResult(resultId: string) {
	return Result.findById(resultId);
}

export async function getResultExam(result: Partial<ResultType>) {
	return Exam.findById(result.examId);
}

export async function getResultCandidate(result: Partial<ResultType>) {
	return User.findById(result.candidateId);
}

export function updateResult({ id, edits }: UpdateResultInterface) {
	return Result.findByIdAndUpdate(id, edits);
}
