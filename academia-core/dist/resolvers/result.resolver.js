import Exam from "../models/exam.model.js";
import Result from "../models/result.model.js";
import { ResultStatus, } from "../models/types/result.types.js";
import moment from "moment";
import User from "../models/user.model.js";
export async function createResult({ edits }) {
    const thisExam = await Exam.findById(edits.examId);
    const thisResult = await Result.findOne({
        examId: thisExam._id,
        candidateId: edits.candidateId,
    });
    const thisCandidate = await User.findById(edits.candidateId);
    if (!thisExam)
        throw new Error("No exam found");
    if (thisCandidate.role !== "STUDENT")
        throw new Error("Only students can take and submit exams");
    if (thisResult)
        throw new Error("You have already submitted this exam");
    if (moment(thisExam.due).isBefore(moment()))
        throw new Error("This Exam is already closed");
    const totalQuestions = thisExam.objectiveQuestions.length + thisExam.theoryQuestions.length;
    const newResult = new Result({
        ...edits,
        status: ResultStatus.PENDING,
        totalQuestions,
    });
    return newResult.save();
}
export async function getResults(candidateId) {
    return Result.find({ candidateId: candidateId });
}
export async function getResult(resultId) {
    return Result.findById(resultId);
}
export async function getResultExam(result) {
    return Exam.findById(result.examId);
}
export async function getResultCandidate(result) {
    return User.findById(result.candidateId);
}
export function updateResult({ id, edits }) {
    return Result.findByIdAndUpdate(id, edits);
}
