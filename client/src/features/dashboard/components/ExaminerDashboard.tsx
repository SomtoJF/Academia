import { gql, useQuery } from "@apollo/client";
import DisplayExams from "./DisplayExams";
import { useState } from "react";
import moment from "moment";
import ErrorBoundary from "../../../components/error/ErrorBoundary.small";
import { DisplayExamTitles } from "../../../types";
import { v4 as uuidv4 } from "uuid";

const GET_EXAMINER_DATA = gql`
	query getExaminerData($id: ID!) {
		user(id: $id) {
			examsSet {
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

export default function ExaminerDashboard({ userId }: props) {
	const [concludedExams, setConcludedExams] = useState<Array<Exam>>([]);
	const [upcomingExams, setUpcomingExams] = useState<Array<Exam>>([]);
	const { loading, refetch } = useQuery(GET_EXAMINER_DATA, {
		variables: { id: userId },
		onCompleted(data) {
			console.log(data);
			setConcludedExams(
				data.user.examsSet.filter((exam: any) => {
					if (moment(exam.due).isBefore()) return exam;
				})
			);
			setUpcomingExams(
				data.user.examsSet.filter((exam: any) => {
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
						<DisplayExams
							title={DisplayExamTitles.UPCOMING}
							exams={upcomingExams}
							key={uuidv4()}
						/>
						<DisplayExams
							title={DisplayExamTitles.CONCLUDED}
							exams={concludedExams}
							key={uuidv4()}
						/>
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
