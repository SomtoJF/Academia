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
export async function createExam(edits) {
    try {
        const examiner = await User.findById(edits.examinerId);
        if (examiner.role !== "EXAMINER") {
            throw new Error("Only Examiners are allowed to create exams");
        }
        const newExam = new Exam(edits);
        return newExam.save();
    }
    catch (err) {
        throw err;
    }
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
    try {
        if (edits.submit) {
            // check if candidate is registered for the exam
            const document = await Exam.findOne({
                candidatesId: { $in: edits.submit },
            });
            if (!document)
                throw new Error("Candidate did not register for this examination");
        }
        await Exam.updateOne({ _id: id }, { $push: { submittedIds: { $each: [edits.submit] } } });
        if (edits.candidatesId)
            await Exam.updateOne({ _id: id }, { $push: { candidatesId: { $each: [edits.candidatesId] } } });
        const exam = await Exam.findById(id);
        if (edits.name) {
            exam.name = edits.name;
            await exam.save();
        }
        return await Exam.findById(id);
    }
    catch (error) {
        throw error;
    }
}
