import { useMutation, useQuery } from "@apollo/client";
import { Divider, Radio, Space, message } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionPicker from "../../features/exam/QuestionPicker";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import ErrorBoundary from "../../components/error/ErrorBoundary.small";
import { v4 as uuidv4 } from "uuid";
import "../styles/Exam.styles.sass";
import { gql } from "../../__generated__";
import moment from "moment";
import gsap from "gsap";

const FETCH_EXAM = gql(`
	query fetchExam($examId: ID!) {
		exam(id: $examId) {
			name
			description
			due
			objectiveQuestions {
				question
				options
			}
			theoryQuestions {
				question
			}
			examiner {
				firstName
				lastName
			}
		}
	}
`);

const SUBMIT_EXAM = gql(`
	mutation submitExam($edits: CreateResultArgs!){
		createResult(edits: $edits) {
    		candidateId
    		status
  		}
	}
`);

export default function Exam() {
	const { examId, id } = useParams();
	const [messageApi, contextHolder] = message.useMessage();
	const [activeObjectiveQuestionIndex, setActiveObjectiveQuestionIndex] =
		useState(0);
	const [activeTheoryQuestion, setActiveTheoryQuestion] = useState(0);
	const [studentObjectiveAnswers, setStudentObjectiveAnswers] = useState<
		number[]
	>([]);
	const [studentTheoryAnswers, setStudentTheoryAnswers] = useState<string[]>(
		[]
	);
	const [submitLoading, setSubmitLoading] = useState(false);
	const [submitExam] = useMutation(SUBMIT_EXAM);
	const navigate = useNavigate();

	const { loading, data, error, refetch } = useQuery(FETCH_EXAM, {
		variables: { examId: examId! },
		onCompleted(data) {
			if (data.exam) {
				if (data.exam.objectiveQuestions) {
					setStudentObjectiveAnswers(
						new Array(data.exam.objectiveQuestions.length)
					);
				}
				if (data.exam.theoryQuestions) {
					setStudentTheoryAnswers(new Array(data.exam.theoryQuestions.length));
				}
			}
		},
	});

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

	const closeNoticeBar = () => {
		gsap.to("#exam-notice", {
			opacity: 0,
			display: "none",
		});
	};

	const handleExamSubmit = async () => {
		try {
			if (!confirm("Are you sure you want to submit?")) return;
			setSubmitLoading(true);

			for (let i = 0; i < studentObjectiveAnswers.length; i++) {
				if (isNaN(studentObjectiveAnswers[i]))
					throw new Error(
						`Objective question ${
							i + 1
						} hasn't been answered. Answer all questions`
					);
			}

			for (let i = 0; i < studentTheoryAnswers.length; i++) {
				if (!studentTheoryAnswers[i])
					throw new Error("You must answer all theory questions");
			}

			await submitExam({
				variables: {
					edits: {
						examId: examId!,
						candidateId: id!,
						objectiveAnswers: studentObjectiveAnswers,
						theoryAnswers: studentTheoryAnswers,
					},
				},
			});
			success("submitted successfully");
			setTimeout(() => {
				navigate(`/user/${id}/dashboard`);
			}, 1000);
		} catch (err: any) {
			errorMessage(err.message);
			throw err;
		} finally {
			setSubmitLoading(false);
		}
	};

	const switchToNextQuestion = (
		currentQuestionIndex: number,
		questionSwitchCallback: (newQuestionIndex: number) => void
	) => {
		questionSwitchCallback(currentQuestionIndex + 1);
	};

	const switchToPreviousQuestion = (
		currentQuestionIndex: number,
		questionSwitchCallback: (newQuestionIndex: number) => void
	) => {
		if (currentQuestionIndex > 0)
			questionSwitchCallback(currentQuestionIndex - 1);
	};

	if (loading)
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
					height: "100%",
				}}
			>
				<LoadingOutlined />
			</div>
		);

	if (error)
		return (
			<ErrorBoundary
				loading={loading}
				message="We couldn't fetch this exam"
				refetch={refetch}
			/>
		);

	if (data && data.exam)
		return (
			<>
				{contextHolder}
				<div id="exam-page">
					<div id="exam-notice">
						<p>
							Note that once the due time has passed, this exam can no longer be
							submitted
						</p>
						<button type="button" onClick={closeNoticeBar}>
							<CloseOutlined />
						</button>
					</div>
					<h1>{data.exam.name}</h1>
					<p>{data.exam.description}</p>
					<p id="exam-examiner-data">
						<b>Uploaded By:</b>{" "}
						{`${data.exam.examiner.firstName} ${data.exam.examiner.lastName}`}
					</p>
					<p>
						<b>Due:</b>{" "}
						{moment(data.exam.due).format("dddd, Do MMMM, YYYY. hh:mma")}
					</p>
					<Divider />
					{data.exam.objectiveQuestions && (
						<section className="question-container">
							<h2>Multiple-Choice Questions</h2>
							<QuestionPicker
								questions={data.exam.objectiveQuestions}
								setActiveQuestion={setActiveObjectiveQuestionIndex}
								activeQuestion={activeObjectiveQuestionIndex}
								key={uuidv4()}
							/>
							<div id="obj-question">
								<p>
									{
										data.exam.objectiveQuestions[activeObjectiveQuestionIndex]
											.question
									}
								</p>
								<Radio.Group
									value={studentObjectiveAnswers[activeObjectiveQuestionIndex]}
								>
									<Space direction="vertical">
										{data.exam.objectiveQuestions[
											activeObjectiveQuestionIndex
										].options.map((option, index) => (
											<Radio
												value={index}
												key={uuidv4()}
												onChange={() => {
													const updatedAnswers = [...studentObjectiveAnswers];
													updatedAnswers[activeObjectiveQuestionIndex] = index;
													setStudentObjectiveAnswers(updatedAnswers);
												}}
											>
												{option}
											</Radio>
										))}
									</Space>
								</Radio.Group>
							</div>
							<div className="control-buttons-container">
								<button
									type="button"
									disabled={activeObjectiveQuestionIndex <= 0}
									onClick={() => {
										switchToPreviousQuestion(
											activeObjectiveQuestionIndex,
											setActiveObjectiveQuestionIndex
										);
									}}
								>
									Previous
								</button>
								<button
									type="button"
									disabled={
										activeObjectiveQuestionIndex >=
										data.exam.objectiveQuestions.length - 1
									}
									onClick={() => {
										switchToNextQuestion(
											activeObjectiveQuestionIndex,
											setActiveObjectiveQuestionIndex
										);
									}}
								>
									Next
								</button>
							</div>
						</section>
					)}
					<Divider />

					{data.exam.theoryQuestions && (
						<section className="question-container">
							<h2>Theory Questions</h2>
							<QuestionPicker
								questions={data.exam.theoryQuestions}
								setActiveQuestion={setActiveTheoryQuestion}
								activeQuestion={activeTheoryQuestion}
								key={uuidv4()}
							/>
							<p>{data.exam.theoryQuestions[activeTheoryQuestion].question}</p>
							<textarea
								name={data.exam.theoryQuestions[activeTheoryQuestion].question}
								id={data.exam.theoryQuestions[activeTheoryQuestion].question}
								placeholder="Type in your answer here..."
								cols={30}
								rows={10}
								onChange={(e) => {
									const theoryAnswersClone = [...studentTheoryAnswers];
									theoryAnswersClone[activeTheoryQuestion] = e.target.value;
									setStudentTheoryAnswers(theoryAnswersClone);
								}}
							/>
							<div className="control-buttons-container">
								<button
									type="button"
									disabled={activeTheoryQuestion <= 0}
									onClick={() => {
										switchToPreviousQuestion(
											activeTheoryQuestion,
											setActiveTheoryQuestion
										);
									}}
								>
									Previous
								</button>
								<button
									type="button"
									disabled={
										activeTheoryQuestion >= data.exam.theoryQuestions.length - 1
									}
									onClick={() => {
										switchToNextQuestion(
											activeTheoryQuestion,
											setActiveTheoryQuestion
										);
									}}
								>
									Next
								</button>
							</div>
						</section>
					)}
					<button
						type="button"
						id="submit-exam"
						onClick={handleExamSubmit}
						disabled={submitLoading}
					>
						{submitLoading ? <LoadingOutlined /> : "Submit Exam"}
					</button>
				</div>
			</>
		);
}
