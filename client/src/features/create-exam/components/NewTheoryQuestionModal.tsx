import { PlusOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import { useState } from "react";
import "../styles/ExamModal.styles.sass";
import { TheoryQuestion } from "../../../types";
import Option from "../../../components/exam-options/Option";
import { v4 } from "uuid";

interface Props {
	isModalOpen: boolean;
	setIsModalOpen(value: boolean): void;
	title: string;
	theoryQuestions: TheoryQuestion[];
	setTheoryQuestions(value: TheoryQuestion[]): void;
}

export default function NewTheoryQuestionModal({
	isModalOpen,
	setIsModalOpen,
	title,
	theoryQuestions,
	setTheoryQuestions,
}: Props) {
	const [question, setQuestion] = useState("");
	const [displaynewAnswerInput, setDisplaynewAnswerInput] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const [newAnswer, setNewAnswer] = useState("");
	const [answers, setAnswers] = useState<Array<string>>([]);

	const error = (message: string) => {
		messageApi.open({
			type: "error",
			content: message,
		});
	};

	const handleOk = () => {
		try {
			if (question == "") throw new Error("You didn't state your question");
			if (answers.length < 1)
				throw new Error("You must provide an answer to this question");

			setTheoryQuestions([
				...theoryQuestions,
				{
					question: question,
					answers: answers,
				},
			]);
			setIsModalOpen(false);
		} catch (err: any) {
			error(err.message);
			throw err;
		}
	};

	const handleCancel = () => {
		setNewAnswer("");
		setDisplaynewAnswerInput(false);
		setIsModalOpen(false);
	};

	const handleDeleteAnswer = (index: number) => {
		setAnswers(answers.slice(0, index).concat(answers.slice(index + 1)));
	};

	const handleCreateNewAnswer = () => {
		try {
			if (newAnswer == "") throw new Error("No option text was provided");
			setAnswers(answers.concat(newAnswer));
			setNewAnswer("");
		} catch (err: any) {
			error(err.message);
			throw err;
		}
	};
	return (
		<>
			{contextHolder}
			<Modal
				okText="Add Question"
				title={title}
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<div className="questions-wrapper">
					<h4>Question</h4>
					<textarea
						name="question"
						className="question-input"
						id="question"
						cols={30}
						rows={10}
						placeholder="Question here..."
						value={question}
						onChange={(e) => {
							setQuestion(e.target.value);
						}}
					/>
					<h3>Answers</h3>
					<ul>
						{answers.map((answer, index) => (
							<Option
								option={answer}
								index={index}
								key={v4()}
								handleDeleteOption={handleDeleteAnswer}
							/>
						))}
					</ul>

					{displaynewAnswerInput && (
						<label htmlFor="new-option">
							<input
								type="text"
								name="new-option"
								id="new-option"
								value={newAnswer}
								placeholder="Answer..."
								onChange={(e) => {
									console.log(parseInt(e.target.value));
									setNewAnswer(e.target.value);
								}}
							/>
							<div className="option-ok-cancel">
								<button
									type="button"
									onClick={() => {
										setDisplaynewAnswerInput(false);
										setNewAnswer("");
									}}
								>
									Cancel
								</button>
								<button type="button" onClick={handleCreateNewAnswer}>
									Add option
								</button>
							</div>
						</label>
					)}
					<button
						type="button"
						onClick={() => {
							setDisplaynewAnswerInput(true);
						}}
						className="new-option"
					>
						<PlusOutlined />
						New option
					</button>
				</div>
			</Modal>
		</>
	);
}
