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
	const { loading } = useQuery(FETCH_USER_ROLE, {
		variables: { id: currentUser?.uid },
		onCompleted(data) {
			console.log(data);
		},
	});

	return (
		<div className="protected-page">
			<Sidebar />
			{currentUser !== null ? (
				loading ? (
					<main>
						<Spin />
					</main>
				) : (
					<main>
						<nav />
						<Outlet />
					</main>
				)
			) : (
				<Navigate to={"/login"} />
			)}
		</div>
	);
}
