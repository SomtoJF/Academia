import { useParams } from "react-router-dom";
import ExaminerInfo from "../../features/create-exam/components/ExaminerInfo";
import "../styles/CreateExam.styles.sass";
import { gql, useMutation, useQuery } from "@apollo/client";
import { FormEvent, useEffect, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Exam, ObjectiveQuestions } from "../../types";
import ObjSection from "../../features/create-exam/components/ObjSection";
import storageAvailable from "../../utils/storage-available";
import { message } from "antd";
const FETCH_USER_DATA = gql`
	query fetchUserRole($id: ID!) {
		user(id: $id) {
			firstName
			lastName
			profilePicture
			email
			role
		}
	}
`;

const CREATE_EXAM_MUTATION = gql`
	mutation Mutation($edits: CreateExamArgs!) {
		createExam(edits: $edits) {
			_id
			inviteId
		}
	}
`;

export default function CreateExam() {
	const [examName, setExamName] = useState("");
	const [objectiveQuestions, setObjectiveQuestions] = useState<
		ObjectiveQuestions[]
	>([]);
	const [dueDate, setDueDate] = useState<Date>();
	const [submitLoading, setSubmitLoading] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const [createExam] = useMutation(CREATE_EXAM_MUTATION);
	const { id } = useParams();

	const { error, loading, data } = useQuery(FETCH_USER_DATA, {
		variables: { id: id },
		onCompleted(data) {
			console.log(data);
			if (data.user.role !== "EXAMINER") {
				throw new Error("Unauthorized");
			}
		},
	});

	useEffect(() => {
		if (localStorage.getItem("exam-name")) {
			getDraft();
			successMesage("Loaded successfully from draft");
		}
	}, []);

	const errorMesage = (message: string) => {
		messageApi.open({
			type: "error",
			content: message,
		});
	};
	const successMesage = (message: string) => {
		messageApi.open({
			type: "success",
			content: message,
		});
	};

	const getDraft = () => {
		if (localStorage.getItem("exam-name"))
			setExamName(localStorage.getItem("exam-name")!);
		if (localStorage.getItem("due-date"))
			setDueDate(JSON.parse(localStorage.getItem("due-date")!));
		if (localStorage.getItem("objective-questions"))
			setObjectiveQuestions(
				JSON.parse(localStorage.getItem("objective-questions")!)
			);
	};

	const handleSaveDraft = () => {
		try {
			if (!storageAvailable("localStorage"))
				throw new Error("Cannot access storage");
			localStorage.setItem("exam-name", examName);
			if (dueDate) localStorage.setItem("due-date", JSON.stringify(dueDate));
			if (objectiveQuestions.length > 0)
				localStorage.setItem(
					"objective-questions",
					JSON.stringify(objectiveQuestions)
				);
			successMesage("Saved successfully");
		} catch (err: any) {
			errorMesage(err.message);
		}
	};

	const handleClearDraft = () => {
		try {
			if (!storageAvailable("localStorage"))
				throw new Error("Cannot access storage");
			localStorage.removeItem("exam-name");
			localStorage.removeItem("due-date");
			localStorage.removeItem("objective-questions");
			successMesage("Cleared successfully");
		} catch (err: any) {
			errorMesage(err.message);
		}
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		try {
			if (!dueDate) throw new Error("A due date is required");
			if (examName === "") throw new Error("You must set an exam name");
			const payload: Partial<Exam> = {
				examinerId: id,
				name: examName,
				due: dueDate,
				objectiveQuestions: objectiveQuestions,
			};
			createExam({ variables: { edits: payload } });
			setSubmitLoading(true);
		} catch (error) {
		} finally {
			setSubmitLoading(false);
		}
	};

	if (error) throw new Error("Something went wrong while validating user role");

	return (
		<>
			{contextHolder}
			<div id="create-exam">
				{loading ? (
					<div id="loading-container">
						<LoadingOutlined />
					</div>
				) : data ? (
					<ExaminerInfo
						firstName={data.user.firstName}
						lastName={data.user.lastName}
						email={data.user.email}
						profilePicture={data.user.profilePicture}
						examName={examName}
						dueDate={dueDate}
						setExamName={setExamName}
						setDueDate={setDueDate}
					/>
				) : null}
				<h1>Create a new exam</h1>
				<form>
					<ObjSection
						objQuestions={objectiveQuestions}
						setObjQuestions={setObjectiveQuestions}
					/>
					<button
						type="button"
						className="new-exam-control"
						onClick={handleSaveDraft}
					>
						Save Draft
					</button>

					<button
						type="button"
						className="new-exam-control"
						onClick={handleClearDraft}
					>
						Clear Draft
					</button>

					<button
						type="submit"
						className="new-exam-control"
						disabled={submitLoading}
						onClick={handleSubmit}
					>
						{submitLoading ? <LoadingOutlined /> : "Create Exam"}
					</button>
				</form>
			</div>
		</>
	);
}
