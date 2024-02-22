import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
	mutation CreateUserMutation($edits: CreateUserArgs!) {
		createUser(edits: $edits) {
			_id
			firstName
			lastName
			role
		}
	}
`;
