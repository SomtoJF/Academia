import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import DisplayExams from "./DisplayExams";
import moment from "moment";
import ErrorBoundary from "../../../components/error/ErrorBoundary.small";

const GET_EXAMINER_DATA = gql`
	query getExaminerData($id: ID!) {
		user(id: $id) {
			examsTaken {
				name
				due
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
	name: string;
	due: Date;
	inviteId: string;
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
	// two sections: Upcoming Exams and Past Exams
	const { loading, refetch } = useQuery(GET_EXAMINER_DATA, {
		variables: { id: userId },
		onCompleted(data) {
			setConcludedExams(
				data.user.examsTaken.filter((exam: any) => {
					if (moment(exam.due).isBefore()) return exam;
				})
			);
			setUpcomingExams(
				data.user.examsTaken.filter((exam: any) => {
					if (moment(exam.due).isAfter()) return exam;
				})
			);
		},
	});
	return (
		<>
			{!loading ? (
				concludedExams && (
					<>
						<DisplayExams title="Upcoming Exams" exams={upcomingExams} />
						<DisplayExams title="Concluded Exams" exams={concludedExams} />
					</>
				)
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
