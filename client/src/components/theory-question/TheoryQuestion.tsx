import { Divider } from "antd";
import { TheoryQuestion as TheoryQuestionInterface } from "../../types";

interface Props {
	question: TheoryQuestionInterface;
}

export default function TheoryQuestion({ question }: Props) {
	return (
		<li>
			<p>{question.question}</p>
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
