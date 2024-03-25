import { useParams } from "react-router-dom";
import { gql } from "../../__generated__";
import { useQuery } from "@apollo/client";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import { Table, TableColumnsType } from "antd";
import { Key } from "react";
import { ResultStatus } from "../../__generated__/graphql";

const FETCH_EXAM_RESULTS = gql(
	`query FetchExamResults($id: ID!){
        exam(id: $id){
            name
            due
            description
            results{
                createdAt
              candidate{
                firstName
                lastName
              }
              totalQuestions
              status
              score
            }
        }
    }`
);

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

export default function ExamResults() {
	const { examId } = useParams();
	const { data, loading, error } = useQuery(FETCH_EXAM_RESULTS, {
		variables: { id: examId! },
		onError(error) {
			throw error;
		},
	});

	const dataSource: DataSourceInterface[] | [] | undefined =
		data?.exam?.results?.map((result, index) => {
			return {
				key: index,
				examName: data.exam?.name,
				studentName: `${result?.candidate.firstName} ${result?.candidate.lastName}`,
				status: result?.status,
				score: result?.score ? result.score : "PENDING",
				total: result?.totalQuestions,
				submissionDate: moment(result?.createdAt).format("DD MMM YYYY  hh:mma"),
				createdAt: result?.createdAt,
			};
		});

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

	if (error) return;
	return (
		<div id="exam-results-page">
			<h1>Exam Results</h1>
			{loading ? (
				<LoadingOutlined />
			) : (
				<>
					<h2>{data?.exam?.name}</h2>
					<p>{data?.exam?.description}</p>
					<p>
						{moment(data?.exam?.due).isAfter()
							? "Exam Ends on: "
							: "Ended on: "}
						{moment(data?.exam?.due).format("Do MMMM, YYYY  hh:mma")}
					</p>
					{data && <Table dataSource={dataSource} columns={columns} />}
				</>
			)}
		</div>
	);
}
