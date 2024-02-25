import { ExamInterface } from "./models/types/exam.types.js";
import {
	createExam,
	deleteExam,
	getExam,
	getExamCandidates,
	getExamExaminer,
} from "./resolvers/exam.resolver.js";
import dateScalar from "./resolvers/scalars/date.scalar.js";
import {
	CreateUserInterface,
	createUser,
	getUser,
} from "./resolvers/user.resolvers.js";

type IdObjectType = {
	id: string;
};

const resolvers = {
	Date: dateScalar,
	Query: {
		user: async (_: any, { id }: IdObjectType) => await getUser(id),
		exam: async (_: any, { id }: IdObjectType) => await getExam(id),
	},
	User: {
		examsTaken: async () => {},
		examsSet: async () => {},
	},
	Exam: {
		candidates: async (parent: ExamInterface) =>
			await getExamCandidates(parent.candidatesId),
		examiner: async (parent: ExamInterface) =>
			await getExamExaminer(parent.examinerId),
	},
	Mutation: {
		createUser: async (_: any, { edits }: CreateUserInterface) => {
			return await createUser(edits);
		},
		createExam: async (_: any, { edits }: any) => {
			return await createExam(edits);
		},
		deleteExam: async (_: any, { id }: IdObjectType) => {
			return await deleteExam(id);
		},
	},
};

export default resolvers;
