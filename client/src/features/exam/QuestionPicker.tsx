import { v4 as uuidv4 } from "uuid";
import "./QuestionPicker.styles.sass";
import { ObjQuestion, TheoryQuestion } from "../../__generated__/graphql";

interface Props {
	questions: Partial<ObjQuestion>[] | Partial<TheoryQuestion>[];
	activeQuestion: number;
	setActiveQuestion: (index: number) => void;
}

export default function QuestionPicker({
	questions,
	setActiveQuestion,
	activeQuestion,
}: Props) {
	return (
		<div id="question-picker">
			{questions.map((_, index) => (
				<button
					key={uuidv4()}
					onClick={() => {
						setActiveQuestion(index);
					}}
					className={index === activeQuestion ? "active" : ""}
				>
					{index + 1}
				</button>
			))}
		</div>
	);
}
