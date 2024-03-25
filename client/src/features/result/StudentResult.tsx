import { useQuery } from "@apollo/client";
import { gql } from "../../__generated__";
import { useParams } from "react-router-dom";
import { Table, TableColumnsType } from "antd";
import moment from "moment";
import { ResultStatus } from "../../__generated__/graphql";
import { Key } from "react";
import "../../pages/styles/ExamResults.styles.sass";

interface DataSourceInterface {
	key: Key;
	examName: string | undefined;
	studentName: string;
	status: ResultStatus | undefined;
	score: string | number;
	total: number | undefined;
	createdAt: number;
	submissionDate: string;
}

export default function StudentResult() {
	const { id } = useParams();
	const GET_STUDENT_RESULTS = gql(`
        query GetResultsQuery($candidateId: ID!) {
            results(candidateId: $candidateId) {
              createdAt
              exam {
                name
              }
              candidate{
                firstName
                lastName
              }
              totalQuestions
              status
              score
            }
        }
    `);
	const { data } = useQuery(GET_STUDENT_RESULTS, {
		variables: { candidateId: id! },
		onError(error) {
			throw error;
		},
	});

	const dataSource: DataSourceInterface[] | [] | undefined = data?.results?.map(
		(result, index) => {
			return {
				key: index,
				examName: result?.exam.name,
				studentName: `${result?.candidate.firstName} ${result?.candidate.lastName}`,
				status: result?.status,
				score: result?.score ? result.score : "PENDING",
				total: result?.totalQuestions,
				submissionDate: moment(result?.createdAt).format("DD MMM YYYY  hh:mma"),
				createdAt: result?.createdAt,
			};
		}
	);

	const columns: TableColumnsType<DataSourceInterface> = [
		{
			title: "Exam Name",
			dataIndex: "examName",
			key: "exam-name",
		},
		{
			title: "Student Name",
			dataIndex: "studentName",
			key: "student-name",
		},
		{
			title: "Grading",
			dataIndex: "status",
			key: "status",
			render: (_, { status }) => (
				<span
					className={
						status === ResultStatus.Pending
							? "pending"
							: status === ResultStatus.Success
							? "success"
							: status === ResultStatus.Failed
							? "failed"
							: ""
					}
				>
					{status}
				</span>
			),
		},
		{
			title: "Score",
			dataIndex: "score",
			key: "score",
		},
		{
			title: "Total Questions",
			dataIndex: "total",
			key: "total",
		},
		{
			title: "Date of Submission",
			dataIndex: "submissionDate",
			key: "submission-date",
			sorter: (a, b) => a.createdAt - b.createdAt,
		},
	];

	return (
		<div className="result-page">
			<h1>My Results</h1>
			<p>Here you can see the results for exams which you submitted.</p>
			{data && <Table dataSource={dataSource} columns={columns} />}
		</div>
	);
}
