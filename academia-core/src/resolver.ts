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
		exam: () => {},
	},
	Mutation: {
		createUser: async (_: any, { edits }: CreateUserInterface) => {
			return await createUser(edits);
		},
	},
};

export default resolvers;
