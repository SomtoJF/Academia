import mongoose from "mongoose";
const ObjQuestionSchema = new mongoose.Schema({
    // Ensure 'answer' is stored as a number
    question: String,
    options: [String],
    answer: Number,
});
const TheoryQuestionSchema = new mongoose.Schema({
    question: String,
    answers: [String],
});
const ExamModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: { type: String, required: true },
    inviteId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        maxlength: [6, "InviteId cannot be more than 6 characters"],
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
    submittedIds: {
        type: [String],
        required: false,
    },
    theoryQuestions: { type: [TheoryQuestionSchema], required: false },
    due: {
        required: true,
        type: Date,
    },
}, { timestamps: true });
const Exam = mongoose.model("Exam", ExamModel, "exams");
export default Exam;
