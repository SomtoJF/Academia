import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { gql, useQuery } from "@apollo/client";
import Sidebar from "../components/sidebar/Sidebar";
import { Spin } from "antd";
import NavSearchBar from "../components/nav-searchbar/NavSearchBar";
import useRoleStore from "../zustand/role-store.zustand";

const FETCH_USER_ROLE = gql`
	query UserRole($id: ID!) {
		user(id: $id) {
			role
		}
	}
`;

export default function ProtectedLayout() {
	const { currentUser } = useAuth();
	const setRole = useRoleStore((state) => state.setRole);
	const { loading } = useQuery(FETCH_USER_ROLE, {
		variables: { id: currentUser?.uid },
		onError(error) {
			throw error;
		},
		onCompleted(data) {
			setRole(data.user.role);
		},
	});

	return (
		<div className="protected-page">
			<Sidebar />
			{currentUser !== null ? (
				loading ? (
					<main
						style={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Spin />
					</main>
				) : (
					<main>
						<NavSearchBar />
						<Outlet />
					</main>
				)
			) : (
				<Navigate to={"/login"} />
			)}
		</div>
	);
}
