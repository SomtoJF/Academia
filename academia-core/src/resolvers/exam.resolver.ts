import { nanoid } from "nanoid";
import Exam from "../models/exam.model.js";
import User from "../models/user.model.js";

/**
 *
 * @param id Exam ID
 * @returns An exam in JSON format
 */
export async function getExam(id: string) {
	try {
		return await Exam.findById(id);
	} catch (err) {
		throw err;
	}
}

/**
 *
 * @param edits
 * @returns A new created exam in JSON format
 */
export async function createExam({ edits }: CreateExamInterface) {
	try {
		console.log(edits.examinerId);
		const examiner = await User.findById(edits.examinerId);
		if (!examiner) throw new Error("This user does not exist");
		if (examiner.role !== "EXAMINER") {
			throw new Error("Only Examiners are allowed to create exams");
		}
		const payload = { ...edits, inviteId: nanoid(6) };
		const newExam = new Exam(payload);
		return newExam.save();
	} catch (err) {
		throw err;
	}
}

/**
 *
 * @param id Id of the exam to delete
 * @returns Returns the deleted exam
 */
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

export async function updateExam({ id, edits }: UpdateExamInterface) {
	try {
		if (edits.submit) {
			// check if candidate is registered for the exam
			const document = await Exam.findOne({
				candidatesId: { $in: edits.submit },
			});
			if (!document)
				throw new Error("Candidate did not register for this examination");
		}
		await Exam.updateOne(
			{ _id: id },
			{ $push: { submittedIds: { $each: [edits.submit] } } }
		);
		if (edits.candidatesId)
			await Exam.updateOne(
				{ _id: id },
				{ $push: { candidatesId: { $each: [edits.candidatesId] } } }
			);
		const exam = await Exam.findById(id);
		if (edits.name) {
			exam.name = edits.name;
			await exam.save();
		}
		return await Exam.findById(id);
	} catch (error) {
		throw error;
	}
}

export interface CreateExamInterface {
	edits: {
		name: string;
		examinerId: string;
		objectiveQuestions?: ObjQuestionInterface[];
		theoryQuestions?: TheoryQuestionInterface[];
		candidatesId?: string[];
		due: Date;
	};
}

/**
 * Update edits have fields of submit (takes the ID of the candidate currently submitting the exam) and candidatesId (takes the ID of a candiddate registering for the exam)
 */
export interface UpdateExamInterface {
	id: string;
	edits: {
		name?: string;
		candidatesId?: string;
		submit?: string;
	};
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
