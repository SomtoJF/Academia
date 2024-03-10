import { useNavigate, useParams } from "react-router-dom";
import ExaminerInfo from "../../features/create-exam/components/ExaminerInfo";
import "../styles/CreateExam.styles.sass";
import { gql, useMutation, useQuery } from "@apollo/client";
import { FormEvent, useEffect, useState } from "react";
import { LoadingOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Exam, ObjectiveQuestions } from "../../types";
import ObjSection from "../../features/create-exam/components/ObjSection";
import storageAvailable from "../../utils/storage-available";
import { message, Modal } from "antd";
import TheorySection from "../../features/create-exam/components/TheorySection";
import { TheoryQuestion } from "../../types/interface/theory-question.interface";
import moment from "moment";
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
	const [description, setDescription] = useState("");
	const [theoryQuestions, setTheoryQuestions] = useState<TheoryQuestion[]>([]);
	const [dueDate, setDueDate] = useState<Date>();
	const [submitLoading, setSubmitLoading] = useState(false);
	const [messageApi, messageContext] = message.useMessage();
	const [modal, confirmContext] = Modal.useModal();
	const [createExam] = useMutation(CREATE_EXAM_MUTATION);
	const { id } = useParams();
	const navigate = useNavigate();

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

	const confirm = (content: string, onOk: () => any) => {
		modal.confirm({
			title: "Confirm",
			icon: <ExclamationCircleOutlined />,
			content: content,
			okText: "Yes, go ahead",
			cancelText: "Cancel",
			onOk: onOk,
		});
	};

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
		if (localStorage.getItem("description"))
			setDescription(localStorage.getItem("description")!);
		if (localStorage.getItem("theory-questions"))
			setTheoryQuestions(JSON.parse(localStorage.getItem("theory-questions")!));
	};

	const handleSaveDraft = () => {
		try {
			if (!storageAvailable("localStorage"))
				throw new Error("Cannot access storage");
			localStorage.setItem("exam-name", examName);
			localStorage.setItem("description", description);
			if (dueDate) localStorage.setItem("due-date", JSON.stringify(dueDate));
			if (objectiveQuestions.length > 0)
				localStorage.setItem(
					"objective-questions",
					JSON.stringify(objectiveQuestions)
				);
			if (theoryQuestions.length > 0)
				localStorage.setItem(
					"theory-questions",
					JSON.stringify(theoryQuestions)
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
			localStorage.removeItem("description");
			localStorage.removeItem("due-date");
			localStorage.removeItem("objective-questions");
			successMesage("Cleared successfully");
		} catch (err: any) {
			errorMesage(err.message);
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			setSubmitLoading(true);
			if (!dueDate) throw new Error("A due date is required");
			if (moment(dueDate).isBefore())
				throw new Error("Your exam due date must be in the future");
			if (examName === "") throw new Error("You must set a name for this exam");
			if (description === "")
				throw new Error("You must set a description for this exam");
			const payload: Partial<Exam> = {
				examinerId: id,
				description: description,
				name: examName,
				due: new Date(dueDate).getTime(),
				objectiveQuestions: objectiveQuestions,
				theoryQuestions: theoryQuestions,
			};
			await createExam({ variables: { edits: payload } });
			successMesage("Exam uploaded successfully");
			setTimeout(() => {
				navigate(`/user/${id}/dashboard`);
			}, 2000);
		} catch (error: any) {
			errorMesage(error.message);
			throw error;
		} finally {
			setSubmitLoading(false);
		}
	};

	if (error) throw new Error("Something went wrong while validating user role");

	return (
		<>
			{messageContext}
			{confirmContext}
			<div id="create-exam">
				{loading ? (
					<div id="loading-container">
						<LoadingOutlined />
					</div>
				) : data ? (
					<ExaminerInfo
						description={description}
						setDescription={setDescription}
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
					<TheorySection
						theoryQuestions={theoryQuestions}
						setTheoryQuestions={setTheoryQuestions}
					/>
					<button
						type="button"
						className="new-exam-control"
						onClick={() => {
							confirm(
								"This action will overwrite whatever exists in storage. Do you want to go ahead with this action?",
								handleSaveDraft
							);
						}}
					>
						Save Draft
					</button>

					<button
						type="button"
						className="new-exam-control"
						onClick={() => {
							confirm(
								"This action will clear all data from storage. Do you want to go ahead with this action?",
								handleClearDraft
							);
						}}
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
