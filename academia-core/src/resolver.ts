import { ExamInterface } from "./models/types/exam.types.js";
import { UserInterface } from "./models/types/user.types.js";
import {
	CreateExamInterface,
	UpdateExamInterface,
	createExam,
	deleteExam,
	examByInvite,
	getExam,
	getExamCandidates,
	getExamExaminer,
	updateExam,
} from "./resolvers/exam.resolver.js";
import dateScalar from "./resolvers/scalars/date.scalar.js";
import {
	CreateUserInterface,
	UpdateUserInterface,
	createUser,
	deleteUser,
	getExamsRegisteredFor,
	getExamsSet,
	getExamsTaken,
	getUser,
	updateUser,
} from "./resolvers/user.resolvers.js";

type IdObjectType = {
	id: string;
};
type InviteIdObjectType = {
	inviteId: string;
};

const resolvers = {
	Date: dateScalar,
	Query: {
		user: async (_: any, { id }: IdObjectType) => await getUser(id),
		exam: async (_: any, { id }: IdObjectType) => await getExam(id),
		examByInvite: async (_: any, { inviteId }: InviteIdObjectType) =>
			await examByInvite(inviteId),
	},
	User: {
		examsTaken: async (parent: UserInterface) =>
			await getExamsTaken(parent._id),
		examsSet: async (parent: UserInterface) => await getExamsSet(parent._id),
		examsRegisteredFor: async (parent: UserInterface) =>
			await getExamsRegisteredFor(parent),
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
		updateUser: async (_: any, args: UpdateUserInterface) =>
			await updateUser(args),
		deleteUser: async (_: any, { id }: IdObjectType) => await deleteUser(id),
		createExam: async (_: any, args: CreateExamInterface) =>
			await createExam(args),
		updateExam: async (_: any, args: UpdateExamInterface) =>
			await updateExam(args),
		deleteExam: async (_: any, { id }: IdObjectType) => await deleteExam(id),
	},
};

export default resolvers;
