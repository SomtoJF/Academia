import { gql, useQuery } from "@apollo/client";
import "../styles/Dashboard.styles.sass";
import { Spin } from "antd";
import StudentDashboard from "../../features/dashboard/components/StudentDashboard";
import ExaminerDashboard from "../../features/dashboard/components/ExaminerDashboard";
import ErrorBoundary from "../../components/error/ErrorBoundary.small";
import CreateExamButton from "../../features/dashboard/components/CreateExamButton";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import studyIllustration from "../../assets/study.svg";

const FETCH_USER_ROLE = gql`
	query fetchUserRole($id: ID!) {
		user(id: $id) {
			role
			firstName
			lastName
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
			<h2>Dashboard</h2>
			<header>
				<div>
					{loading ? (
						<LoadingOutlined />
					) : data ? (
						<h1>
							Hi, {data.user.firstName} {data.user.lastName}
						</h1>
					) : null}

					<small>Ready to continue your journey on Academia?</small>
				</div>
				<img src={studyIllustration} alt="study illustration" />
			</header>
			{data && data.user.role === "EXAMINER" ? <CreateExamButton /> : null}
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
