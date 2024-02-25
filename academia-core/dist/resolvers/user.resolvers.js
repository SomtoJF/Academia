import Exam from "../models/exam.model.js";
import User from "../models/user.model.js";
export async function getUser(userId) {
    return await User.findById(userId);
}
export async function createUser(edits) {
    try {
        const newUser = new User(edits);
        return await newUser.save();
    }
    catch (err) {
        throw err;
    }
}
/**
 *
 * @param userId Id of the user
 * @returns Array of exams which the user's id is among the list of users which submitted
 */
export async function getExamsTaken(userId) {
    try {
        const parent = await User.findById(userId);
        if (parent.role !== "STUDENT")
            throw new Error("Only students can take exams. This entity is not a student");
        return await Exam.find({ submittedIds: { $in: parent } });
    }
    catch (error) {
        throw error;
    }
}
export async function getExamsSet(userId) {
    try {
        const parent = await User.findById(userId);
        if (parent.role !== "EXAMINER")
            throw new Error("Only examiners can set exams. This entity is not an examiner");
        return await Exam.find({ examinerId: userId });
    }
    catch (error) {
        throw error;
    }
}
export async function updateUser({ id, edits }) {
    try {
        return await User.findByIdAndUpdate(id, edits);
    }
    catch (error) {
        throw error;
    }
}
export async function deleteUser(id) {
    try {
        return await User.findByIdAndDelete(id);
    }
    catch (error) {
        throw error;
    }
}
var Role;
(function (Role) {
    Role[Role["EXAMINER"] = 0] = "EXAMINER";
    Role[Role["STUDENT"] = 1] = "STUDENT";
})(Role || (Role = {}));
