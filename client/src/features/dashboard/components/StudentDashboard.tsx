import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import DisplayExams from "./DisplayExams";
import moment from "moment";
import ErrorBoundary from "../../../components/error/ErrorBoundary.small";
import { DisplayExamTitles } from "../../../types";
import { v4 as uuidv4 } from "uuid";
import { LoadingOutlined } from "@ant-design/icons";
import Overview from "./Overview";

const GET_EXAMINER_DATA = gql`
	query getExaminerData($id: ID!) {
		user(id: $id) {
			examsRegisteredFor {
				_id
				name
				due
				description
				inviteId
				examiner {
					firstName
					lastName
					profilePicture
					createdAt
				}
			}
			examsTaken {
				_id
				name
				due
				description
				inviteId
				examiner {
					firstName
					lastName
					profilePicture
					createdAt
				}
			}
		}
	}
`;

interface props {
	userId: string;
}

type Exam = {
	_id: string;
	name: string;
	due: Date;
	inviteId: string;
	description: string;
	examiner: {
		firstName: string;
		lastName: string;
		profilePicture?: string;
		createdAt: string;
	};
};

export default function StudentDashboard({ userId }: props) {
	const [concludedExams, setConcludedExams] = useState<Array<Exam>>([]);
	const [upcomingExams, setUpcomingExams] = useState<Array<Exam>>([]);
	const [examsTaken, setExamsTaken] = useState<Array<Exam>>([]);
	// two sections: Upcoming Exams and Past Exams
	const { loading, refetch, data } = useQuery(GET_EXAMINER_DATA, {
		variables: { id: userId },
		onError(err) {
			throw err;
		},
		onCompleted(data) {
			console.log(data);
			setConcludedExams(
				data.user.examsRegisteredFor.filter((exam: any) => {
					if (moment(exam.due).isBefore()) return exam;
				})
			);
			setUpcomingExams(
				data.user.examsRegisteredFor.filter((exam: any) => {
					if (moment(exam.due).isAfter()) return exam;
				})
			);
			setExamsTaken(data.user.examsTaken);
		},
	});
	return (
		<>
			{loading ? (
				<div className="error-boundary">
					<p>Fetching data from server...</p>{" "}
					<button type="button">
						<LoadingOutlined />
					</button>
				</div>
			) : data ? (
				<>
					<Overview
						upcomingExams={upcomingExams}
						concludedExams={concludedExams}
						submittedExams={examsTaken}
					/>
					<DisplayExams
						title={DisplayExamTitles.OUTSTANDING}
						key={uuidv4()}
						exams={upcomingExams}
					/>
					<DisplayExams
						title={DisplayExamTitles.CONCLUDED}
						key={uuidv4()}
						exams={concludedExams}
					/>
				</>
			) : (
				<ErrorBoundary
					message="Failed to retrieve data"
					loading
					refetch={refetch}
				/>
			)}
		</>
	);
}
