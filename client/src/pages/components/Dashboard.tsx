import { gql, useQuery } from "@apollo/client";
import { useAuth } from "../../contexts/AuthContext";
import "../styles/Dashboard.styles.sass";
import { Spin } from "antd";
import StudentDashboard from "../../features/dashboard/components/StudentDashboard";
import ExaminerDashboard from "../../features/dashboard/components/ExaminerDashboard";
import ErrorBoundary from "../../components/error/ErrorBoundary.small";

const FETCH_USER_ROLE = gql`
	query fetchUserRole($id: ID!) {
		user(id: $id) {
			role
		}
	}
`;

export default function Dashboard() {
	const { currentUser } = useAuth();
	const { loading, data, refetch } = useQuery(FETCH_USER_ROLE, {
		variables: { id: currentUser?.uid },
	});

	return (
		<div id="dashboard">
			<header>
				<h1>Dashboard</h1>
				<small>Good to see you here</small>
			</header>
			{loading ? (
				<Spin />
			) : data && data.user.role === "STUDENT" ? (
				<StudentDashboard userId={currentUser.uid} />
			) : data && data.user.role === "EXAMINER" ? (
				<ExaminerDashboard userId={currentUser.uid} />
			) : (
				<ErrorBoundary
					refetch={refetch}
					loading={loading}
					variables={currentUser?.uid}
					message="Failed to retrieve data from server"
				/>
			)}
		</div>
	);
}
