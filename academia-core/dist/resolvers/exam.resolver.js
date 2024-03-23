import { nanoid } from "nanoid";
import Exam from "../models/exam.model.js";
import User from "../models/user.model.js";
/**
 *
 * @param id Exam ID
 * @returns An exam in JSON format
 */
export async function getExam(id) {
    try {
        return await Exam.findById(id);
    }
    catch (err) {
        throw err;
    }
}
/**
 *
 * @param edits
 * @returns A new created exam in JSON format
 */
export async function createExam({ edits }) {
    try {
        console.log(edits.examinerId);
        const examiner = await User.findById(edits.examinerId);
        if (!examiner)
            throw new Error("This user does not exist");
        if (examiner.role !== "EXAMINER") {
            throw new Error("Only Examiners are allowed to create exams");
        }
        const payload = { ...edits, inviteId: nanoid(6) };
        const newExam = new Exam(payload);
        return newExam.save();
    }
    catch (err) {
        throw err;
    }
}
export async function examByInvite(id) {
    return await Exam.findOne({ inviteId: id });
}
/**
 *
 * @param id Id of the exam to delete
 * @returns Returns the deleted exam
 */
export async function deleteExam(id) {
    return await Exam.findByIdAndDelete(id);
}
export async function getExamCandidates(ids) {
    try {
        return await User.find({ _id: { $in: ids } });
    }
    catch (error) {
        throw error;
    }
}
export async function getExamExaminer(id) {
    try {
        return await User.findById(id);
    }
    catch (error) {
        throw error;
    }
}
export async function updateExam({ id, edits }) {
    const thisExam = await Exam.findById(id);
    if (edits.submit) {
        // Throw error if candidate submits without registering
        if (!thisExam.candidatesId.includes(edits.submit))
            throw new Error("Candidate did not register for this examination");
    }
    await Exam.updateOne({ _id: id }, { $push: { submittedIds: { $each: [edits.submit] } } });
    if (edits.candidatesId) {
        const thisCandidate = await User.findById(edits.candidatesId);
        if (thisCandidate.role !== "STUDENT")
            throw new Error("Only students can register to take exams");
        if (thisExam.candidatesId.includes(thisCandidate.id))
            throw new Error("This user is already registered for the exam");
        await Exam.updateOne({ _id: id }, { $push: { candidatesId: { $each: [edits.candidatesId] } } });
        await thisCandidate.save();
    }
    const exam = await Exam.findById(id);
    if (edits.name)
        exam.name = edits.name;
    if (edits.description)
        exam.description = edits.description;
    await exam.save();
    return await Exam.findById(id);
}
