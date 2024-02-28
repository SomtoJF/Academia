import { Modal } from "antd";
import { useState } from "react";
import "./SearchResultModal.sass";
import { CopyOutlined } from "@ant-design/icons";
import { message } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import { gql, useMutation } from "@apollo/client";
import moment from "moment";

interface props {
	open: boolean;
	setOpen(value: boolean): void;
	exam: {
		_id: string;
		inviteId: string;
		name: string;
		due: Date;
		candidates: candidates[];
		examiner: examiner;
	};
}

type candidates = {
	_id: string;
};

type examiner = {
	firstName: string;
	lastName: string;
	email: string;
	profilePicture: string;
};

const EXAM_REGISTRATION_MUTATION = gql`
	mutation Mutation($updateExamId: ID!, $edits: UpdateExamArgs!) {
		updateExam(id: $updateExamId, edits: $edits) {
			candidatesId
		}
	}
`;

export default function SearchResultModal({ open, setOpen, exam }: props) {
	const [confirmLoading, setConfirmLoading] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const { currentUser } = useAuth();
	const uid = currentUser.uid;
	const [registerForExam] = useMutation(EXAM_REGISTRATION_MUTATION, {
		variables: { updateExamId: exam._id, edits: { candidatesId: uid } },
	});

	const handleOk = async () => {
		setConfirmLoading(true);
		try {
			if (moment(exam.due).isBefore())
				throw new Error("This exam has already taken place");
			const response = await registerForExam();
			success("Registration successful");
			console.log(response);
		} catch (err: any) {
			error(err.message);
			throw err;
		} finally {
			setConfirmLoading(false);
		}
	};

	const handleCancel = () => {
		setOpen(false);
	};

	const success = (message: string) => {
		messageApi.open({
			type: "success",
			content: message,
		});
	};

	const error = (message: string) => {
		messageApi.open({
			type: "error",
			content: message,
		});
	};

	const copyTextToClipBoard = (text: string) => {
		if (navigator.clipboard) {
			// Check if Clipboard API is available
			navigator.clipboard
				.writeText(text)
				.then(() => {
					success(
						"Exam ID copied to clipboard successfully. Share this ID with others to enable them register for this exam"
					);
				})
				.catch((err) => {
					error("Failed to copy text to clipboard");
					console.error("Failed to copy text to clipboard:", err);
				});
		} else {
			error("Clipboard API not available.");
			console.error("Clipboard API not available.");
		}
	};

	return (
		<>
			{contextHolder}
			<Modal
				okText="Register"
				title="Register to take this exam?"
				open={open}
				onOk={handleOk}
				confirmLoading={confirmLoading}
				onCancel={handleCancel}
			>
				<div id="search-result">
					<button
						type="button"
						id="copy-id"
						onClick={() => {
							copyTextToClipBoard(exam.inviteId);
						}}
					>
						<CopyOutlined />
					</button>
					<h3>{exam.name}</h3>

					<p id="lecturer">
						{exam.examiner.firstName} {exam.examiner.lastName}
					</p>
					<p id="due-date">
						Due: {moment(exam.due).format("dddd, MMMM Do YYYY, h:mm:ss a")}
					</p>
				</div>
			</Modal>
		</>
	);
}
