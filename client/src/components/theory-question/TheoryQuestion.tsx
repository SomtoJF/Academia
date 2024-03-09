import { Divider } from "antd";
import { TheoryQuestion as TheoryQuestionInterface } from "../../types";
import { CloseOutlined } from "@ant-design/icons";

interface Props {
	question: TheoryQuestionInterface;
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

export default function TheoryQuestion({
	question,
	handleDeleteQuestion,
	index,
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
			<h5>Answers</h5>
			<ul>
				{question.answers.map((answer) => (
					<li>{answer}</li>
				))}
			</ul>
			<Divider />
		</li>
	);
}
