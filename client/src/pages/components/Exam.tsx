import { useQuery } from "@apollo/client";
import { Divider, Radio, RadioChangeEvent, Space } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import QuestionPicker from "../../features/exam/QuestionPicker";
import { LoadingOutlined } from "@ant-design/icons";
import ErrorBoundary from "../../components/error/ErrorBoundary.small";
import { v4 as uuidv4 } from "uuid";
import "../styles/Exam.styles.sass";
import { gql } from "../../__generated__";

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

export default function Exam() {
	const { examId } = useParams();
	const [activeObjectiveQuestionIndex, setActiveObjectiveQuestionIndex] =
		useState(0);
	const [activeTheoryQuestion, setActiveTheoryQuestion] = useState(0);
	const [studentObjectiveAnswers, setStudentObjectiveAnswers] = useState<
		(number | undefined)[]
	>([]);
	const [studentTheoryAnswers, setStudentTheoryAnswers] = useState<string[]>(
		[]
	);

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

	const handleExamSubmit = async () => {
		if (studentObjectiveAnswers.length < 1 || studentTheoryAnswers.length < 1)
			throw new Error("You must answer all questions");
		studentObjectiveAnswers.forEach((answer) => {
			if (answer == undefined) throw new Error("You must answer all questions");
		});
		studentTheoryAnswers.forEach((answer) => {
			if (answer == undefined) throw new Error("You must answer all questions");
		});
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
			<div id="exam-page">
				<h1>{data.exam.name}</h1>
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
											onChange={(e: RadioChangeEvent) => {
												console.log("radio checked", e.target.value);
												const updatedAnswers = [
													...studentObjectiveAnswers.slice(
														0,
														activeObjectiveQuestionIndex
													),
													index,
													...studentObjectiveAnswers.slice(index + 1),
												];
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
				<button type="button" id="submit-exam" onClick={handleExamSubmit}>
					Submit Exam
				</button>
			</div>
		);
}
