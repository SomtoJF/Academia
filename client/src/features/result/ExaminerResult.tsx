import { useQuery } from "@apollo/client";
import { gql } from "../../__generated__";
import { Link, useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { Key } from "react";
import { Table, TableColumnsType, message } from "antd";
import moment from "moment";
import copyTextToClipBoard from "../../utils/copy-to-clipboard";
import "./ExaminerResult.styles.sass";

const FETCH_EXAMINER_EXAMS = gql(`
query FetchExaminerExams($userId: ID!) {
	user(id: $userId) {
	  examsSet {
		_id
		candidatesId
		createdAt
		due
		name
		inviteId
	  }
	}
}`);

interface DataSourceInterface {
	key: Key;
	examName: string | undefined;
	registrationCount: undefined | number;
	inviteId: string | undefined;
	action: string | undefined;
	due: string;
	dueTime: number;
}

export default function ExaminerResult() {
	const { id } = useParams();
	const { loading, data, error } = useQuery(FETCH_EXAMINER_EXAMS, {
		variables: { userId: id! },
	});
	const [messageApi, contextHolder] = message.useMessage();

	const success = (message: string) => {
		messageApi.open({
			type: "success",
			content: message,
		});
	};

	const errorMessage = (message: string) => {
		messageApi.open({
			type: "error",
			content: message,
		});
	};

	const handleCopyToClipboard = (text: string) => {
		try {
			copyTextToClipBoard(text);
			success("Copied to clipboard");
		} catch (err) {
			errorMessage("Failed to copy");
			throw err;
		}
	};

	const dataSource: DataSourceInterface[] | [] | undefined =
		data?.user?.examsSet?.map((exam, index) => {
			return {
				key: index,
				examName: exam.name,
				due: moment(exam?.due).format("DD MMM YYYY  hh:mma"),
				inviteId: exam.inviteId,
				registrationCount: exam.candidatesId?.length,
				action: exam._id,
				dueTime: exam.due,
			};
		});

	const columns: TableColumnsType<Partial<DataSourceInterface>> = [
		{
			title: "Exam Name",
			dataIndex: "examName",
			key: "name",
		},
		{
			title: "No. of Candidates",
			dataIndex: "registrationCount",
			key: "candidate-count",
		},
		{
			title: "InviteId",
			dataIndex: "inviteId",
			key: "invite-id",
			render: (_, { inviteId }) => (
				<button
					type="button"
					className="invite-id-copy"
					onClick={() => {
						if (inviteId) handleCopyToClipboard(inviteId);
					}}
				>
					Copy Invite ID
				</button>
			),
		},
		{
			title: "Due Date",
			dataIndex: "due",
			key: "due-date",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			render: (_, { action }) => (
				<Link to={`/user/${id}/exam-results/${action}`} className="exam-link">
					View Results
				</Link>
			),
		},
	];

	if (error)
		return (
			<p>
				An Error Occured! <br />
				Try refreshing the page
			</p>
		);

	return (
		<>
			{contextHolder}
			<div className="result-page examiner-result-page">
				{loading ? (
					<LoadingOutlined />
				) : (
					<>
						<h1>My Exams</h1>
						<Table dataSource={dataSource} columns={columns} />
					</>
				)}
			</div>
		</>
	);
}
