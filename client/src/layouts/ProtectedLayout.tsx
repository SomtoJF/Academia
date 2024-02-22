import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { gql, useQuery } from "@apollo/client";
import Sidebar from "../components/sidebar/Sidebar";
import { Spin } from "antd";

const FETCH_USER_ROLE = gql`
	query fetchUserRole($id: ID!) {
		user(id: $id) {
			role
		}
	}
`;

export default function ProtectedLayout() {
	const { currentUser } = useAuth();
	console.log(currentUser);
	const { loading } = useQuery(FETCH_USER_ROLE, {
		variables: { id: currentUser?.uid },
		onCompleted(data) {
			console.log(data);
		},
	});

	return (
		<div className="protected-page">
			<Sidebar />
			{currentUser ? (
				loading ? (
					<Spin />
				) : (
					<main>
						<Outlet />
					</main>
				)
			) : (
				<Navigate to={"/login"} />
			)}
		</div>
	);
}
