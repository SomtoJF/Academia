import { Divider } from "antd";
import { ObjectiveQuestions } from "../../types";
import OptionsSection from "../exam-options/OptionsSection";

interface Props {
	question: ObjectiveQuestions;
}

export default function ObjQuestion({ question }: Props) {
	return (
		<li>
			<p>{question.question}</p>
			<OptionsSection
				options={question.options}
				correctOption={question.answer}
			/>
			<Divider />
		</li>
	);
}
