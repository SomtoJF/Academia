import Exam from "../models/exam.model.js";
import User from "../models/user.model.js";

export async function getExam(id: string) {
	try {
		return await Exam.findById(id);
	} catch (err) {
		throw err;
	}
}

export async function createExam(edits: CreateExamInterface) {
	try {
		const examiner = await User.findById(edits.examinerId);
		if (examiner.role !== "EXAMINER") {
			throw new Error("Only Examiners are allowed to create exams");
		}
		const newExam = new Exam(edits);
		return newExam.save();
	} catch (err) {
		throw err;
	}
}

export async function deleteExam(id: string) {
	return await Exam.findByIdAndDelete(id);
}

export async function getExamCandidates(ids: string[]) {
	try {
		return await User.find({ _id: { $in: ids } });
	} catch (error) {
		throw error;
	}
}

export async function getExamExaminer(id: string) {
	try {
		return await User.findById(id);
	} catch (error) {
		throw error;
	}
}

export interface CreateExamInterface {
	name: string;
	examinerId: string;
	objectiveQuestions?: ObjQuestionInterface[];
	theoryQuestions?: TheoryQuestionInterface[];
	candidatesId?: string[];
	due: Date;
}

export type ObjQuestionInterface = {
	question: string;
	options: string[];
	answer: number;
};
export type TheoryQuestionInterface = {
	question: string;
	answers: string[];
};
