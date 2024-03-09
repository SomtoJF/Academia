import { gql, useQuery } from "@apollo/client";
import "../styles/Dashboard.styles.sass";
import { Spin } from "antd";
import StudentDashboard from "../../features/dashboard/components/StudentDashboard";
import ExaminerDashboard from "../../features/dashboard/components/ExaminerDashboard";
import ErrorBoundary from "../../components/error/ErrorBoundary.small";
import CreateExamButton from "../../features/dashboard/components/CreateExamButton";
import { useParams } from "react-router-dom";

const FETCH_USER_ROLE = gql`
	query fetchUserRole($id: ID!) {
		user(id: $id) {
			role
		}
	}
`;

export default function Dashboard() {
	const { id } = useParams();
	const { loading, data, refetch } = useQuery(FETCH_USER_ROLE, {
		variables: { id: id },
	});

	return (
		<div id="dashboard">
			<header>
				<h1>Dashboard</h1>
				{data && data.user.role === "EXAMINER" ? <CreateExamButton /> : null}
				<small>Good to see you here</small>
			</header>
			{loading ? (
				<Spin />
			) : data && data.user.role === "STUDENT" ? (
				<StudentDashboard userId={id!} />
			) : data && data.user.role === "EXAMINER" ? (
				<ExaminerDashboard userId={id!} />
			) : (
				<ErrorBoundary
					refetch={refetch}
					loading={loading}
					variables={id}
					message="Failed to retrieve data from server"
				/>
			)}
		</div>
	);
}
