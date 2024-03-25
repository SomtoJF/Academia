import { createExam, deleteExam, examByInvite, getExam, getExamCandidates, getExamExaminer, getExamResults, updateExam, } from "./resolvers/exam.resolver.js";
import { createResult, getResult, getResultCandidate, getResultExam, getResults, updateResult, } from "./resolvers/result.resolver.js";
import dateScalar from "./resolvers/scalars/date.scalar.js";
import { createUser, deleteUser, getExamsRegisteredFor, getExamsSet, getExamsTaken, getUser, updateUser, } from "./resolvers/user.resolvers.js";
const resolvers = {
    Date: dateScalar,
    Query: {
        user: async (_, { id }) => await getUser(id),
        exam: async (_, { id }) => await getExam(id),
        examByInvite: async (_, { inviteId }) => await examByInvite(inviteId),
        results: async (_, { candidateId }) => getResults(candidateId),
        result: async (_, { id }) => getResult(id),
    },
    User: {
        examsTaken: async (parent) => await getExamsTaken(parent._id),
        examsSet: async (parent) => await getExamsSet(parent._id),
        examsRegisteredFor: async (parent) => await getExamsRegisteredFor(parent),
    },
    Exam: {
        candidates: async (parent) => await getExamCandidates(parent.candidatesId),
        examiner: async (parent) => await getExamExaminer(parent.examinerId),
        results: async (parent) => getExamResults(parent._id),
    },
    Result: {
        exam: async (parent) => getResultExam(parent),
        candidate: async (parent) => getResultCandidate(parent),
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
        createResult: async (_, args) => createResult(args),
        updateResult: async (_, args) => updateResult(args),
    },
};
export default resolvers;
