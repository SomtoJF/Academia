import { useParams } from "react-router-dom";
import "../styles/Account.styles.sass";
import { gql, useQuery } from "@apollo/client";
import ErrorBoundary from "../../components/error/ErrorBoundary.small";
import Description from "../../features/account/components/Description";
import { Skeleton } from "antd";
import UpdateAccountForm from "../../features/account/components/UpdateAccountForm";

const GET_USER_DATA_QUERY = gql`
	query getUserData($id: ID!) {
		user(id: $id) {
			firstName
			lastName
			email
			role
			createdAt
			updatedAt
		}
	}
`;

export default function Account() {
	const { id } = useParams();
	const { loading, data, error, refetch } = useQuery(GET_USER_DATA_QUERY, {
		variables: { id: id },
	});
	if (error) {
		return (
			<ErrorBoundary
				message={error.message}
				refetch={refetch}
				loading={loading}
				variables={id}
			/>
		);
	}
	return (
		<div id="account">
			<h1>Account</h1>
			{loading ? (
				<div>
					<Skeleton active paragraph={{ rows: 5 }} />
				</div>
			) : (
				<>
					<Description
						role={data.user.role}
						firstName={data.user.firstName}
						lastName={data.user.lastName}
						email={data.user.email}
						createdAt={data.user.createdAt}
						updatedAt={data.user.updatedAt}
					/>
					<UpdateAccountForm
						firstName={data.user.firstName}
						lastName={data.user.lastName}
						email={data.user.email}
					/>
				</>
			)}
		</div>
	);
}
