import { Divider } from "antd";
import { ObjectiveQuestions } from "../../types";
import { CloseOutlined } from "@ant-design/icons";
import OptionsSection from "../exam-options/OptionsSection";

interface Props {
	question: ObjectiveQuestions;
	index: number;
	handleDeleteQuestion: (index: number) => void;
}

const styles = {
	questionContainer: {
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
	},
	questionParagraph: { flex: 1 },
	deleteButton: { backgroundColor: "inherit", border: "none" },
};

export default function ObjQuestion({
	question,
	index,
	handleDeleteQuestion,
}: Props) {
	return (
		<li>
			<div className="question-text-container" style={styles.questionContainer}>
				<p style={styles.questionParagraph}>{question.question}</p>
				<button
					type="button"
					style={styles.deleteButton}
					onClick={() => {
						handleDeleteQuestion(index);
					}}
				>
					<CloseOutlined />
				</button>
			</div>
			<OptionsSection
				options={question.options}
				correctOption={question.answer}
			/>
			<Divider />
		</li>
	);
}
