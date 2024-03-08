import { PlusOutlined } from "@ant-design/icons";
import { Modal, message } from "antd";
import { useState } from "react";
import "../styles/ExamModal.styles.sass";
import Options from "../../../components/exam-options/OptionsSection";
import { ObjectiveQuestions } from "../../../types";

interface Props {
	isModalOpen: boolean;
	setIsModalOpen(value: boolean): void;
	title: string;
	setObjQuestions: (objQuestions: ObjectiveQuestions[]) => void;
	objQuestions: ObjectiveQuestions[];
}

export default function NewObjQuestionModal({
	isModalOpen,
	setIsModalOpen,
	title,
	setObjQuestions,
	objQuestions,
}: Props) {
	const [question, setQuestion] = useState("");
	const [displayNewOptionInput, setDisplayNewOptionInput] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const [newOption, setNewOption] = useState("");
	const [options, setOptions] = useState<Array<string>>([]);
	const [correctOption, setCorrectOption] = useState<number>(0);

	const error = (message: string) => {
		messageApi.open({
			type: "error",
			content: message,
		});
	};

	const handleOk = () => {
		try {
			if (question == "") throw new Error("You didn't state your question");
			if (options.length < 2)
				throw new Error("You must provide at least two options");
			if (correctOption < 0 || correctOption > options.length - 1)
				throw new Error("No option was identified as the correct answer");
			setObjQuestions([
				...objQuestions,
				{
					options: options,
					question: question,
					answer: correctOption,
				},
			]);
			setIsModalOpen(false);
		} catch (err: any) {
			error(err.message);
			throw err;
		}
	};

	const handleCancel = () => {
		setCorrectOption(0);
		setNewOption("");
		setDisplayNewOptionInput(false);
		setIsModalOpen(false);
	};

	const handleDeleteOption = (index: number) => {
		setOptions(options.slice(0, index).concat(options.slice(index + 1)));
	};

	const handleCreateNewOption = () => {
		try {
			if (newOption == "") throw new Error("No option text was provided");
			setOptions(options.concat(newOption));
			setNewOption("");
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
					<h4>Options</h4>
					<Options
						options={options}
						handleDeleteOption={handleDeleteOption}
						correctOption={correctOption}
						setCorrectOption={setCorrectOption}
					/>
					{displayNewOptionInput && (
						<label htmlFor="new-option">
							<input
								type="text"
								name="new-option"
								id="new-option"
								value={newOption}
								placeholder="Option..."
								onChange={(e) => {
									console.log(parseInt(e.target.value));
									setNewOption(e.target.value);
								}}
							/>
							<div className="option-ok-cancel">
								<button
									type="button"
									onClick={() => {
										setDisplayNewOptionInput(false);
										setNewOption("");
									}}
								>
									Cancel
								</button>
								<button type="button" onClick={handleCreateNewOption}>
									Add option
								</button>
							</div>
						</label>
					)}
					<button
						type="button"
						onClick={() => {
							setDisplayNewOptionInput(true);
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
