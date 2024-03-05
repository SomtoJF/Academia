import { useParams } from "react-router-dom";
import ExaminerInfo from "../../features/create-exam/components/ExaminerInfo";
import "../styles/CreateExam.styles.sass";
import { gql, useMutation, useQuery } from "@apollo/client";
import { FormEvent, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Exam, ObjectiveQuestions } from "../../types";
import ObjSection from "../../features/create-exam/components/ObjSection";
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
				<button type="submit" disabled={submitLoading} onClick={handleSubmit}>
					{submitLoading ? <LoadingOutlined /> : "Create Exam"}
				</button>
			</form>
		</div>
	);
}
