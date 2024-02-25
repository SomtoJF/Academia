import { createExam, deleteExam, getExam, getExamCandidates, getExamExaminer, } from "./resolvers/exam.resolver.js";
import dateScalar from "./resolvers/scalars/date.scalar.js";
import { createUser, getUser, } from "./resolvers/user.resolvers.js";
const resolvers = {
    Date: dateScalar,
    Query: {
        user: async (_, { id }) => await getUser(id),
        exam: async (_, { id }) => await getExam(id),
    },
    User: {
        examsTaken: async () => { },
        examsSet: async () => { },
    },
    Exam: {
        candidates: async (parent) => await getExamCandidates(parent.candidatesId),
        examiner: async (parent) => await getExamExaminer(parent.examinerId),
    },
    Mutation: {
        createUser: async (_, { edits }) => {
            return await createUser(edits);
        },
        createExam: async (_, { edits }) => {
            return await createExam(edits);
        },
        deleteExam: async (_, { id }) => {
            return await deleteExam(id);
        },
    },
};
export default resolvers;
