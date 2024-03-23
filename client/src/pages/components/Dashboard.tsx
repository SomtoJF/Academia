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
import useRoleStore from "../../zustand/role-store.zustand";

const FETCH_USER_NAMES = gql`
	query fetchUserNames($id: ID!) {
		user(id: $id) {
			firstName
			lastName
		}
	}
`;

export default function Dashboard() {
	const { id } = useParams();
	const { loading, data, refetch } = useQuery(FETCH_USER_NAMES, {
		variables: { id: id },
	});
	const role = useRoleStore((state) => state.role);

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
			{data && role === "EXAMINER" ? <CreateExamButton /> : null}
			{loading ? (
				<Spin />
			) : data && role === "STUDENT" ? (
				<StudentDashboard userId={id!} />
			) : data && role === "EXAMINER" ? (
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
