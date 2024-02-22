import dateScalar from "./resolvers/scalars/date.scalar.js";
import { createUser, getUser, } from "./resolvers/user.resolvers.js";
const resolvers = {
    Date: dateScalar,
    Query: {
        user: async (_, { id }) => await getUser(id),
        exam: () => { },
    },
    Mutation: {
        createUser: async (_, { edits }) => {
            return await createUser(edits);
        },
    },
};
export default resolvers;
