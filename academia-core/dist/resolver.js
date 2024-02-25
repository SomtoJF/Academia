import { createExam, deleteExam, getExam, getExamCandidates, getExamExaminer, updateExam, } from "./resolvers/exam.resolver.js";
import dateScalar from "./resolvers/scalars/date.scalar.js";
import { createUser, deleteUser, getExamsSet, getExamsTaken, getUser, updateUser, } from "./resolvers/user.resolvers.js";
const resolvers = {
    Date: dateScalar,
    Query: {
        user: async (_, { id }) => await getUser(id),
        exam: async (_, { id }) => await getExam(id),
    },
    User: {
        examsTaken: async (parent) => await getExamsTaken(parent._id),
        examsSet: async (parent) => await getExamsSet(parent._id),
    },
    Exam: {
        candidates: async (parent) => await getExamCandidates(parent.candidatesId),
        examiner: async (parent) => await getExamExaminer(parent.examinerId),
    },
    Mutation: {
        createUser: async (_, { edits }) => {
            return await createUser(edits);
        },
        updateUser: async (_, args) => await updateUser(args),
        deleteUser: async (_, { id }) => await deleteUser(id),
        createExam: async (_, args) => await createExam(args),
        updateExam: async (_, args) => await updateExam(args),
        deleteExam: async (_, { id }) => await deleteExam(id),
    },
};
export default resolvers;
