import { v4 as uuidv4 } from "uuid";
interface Props {
	options: string[];
	handleDeleteOption: (index: number) => void;
	correctOption: number;
	setCorrectOption: (index: number) => void;
}
import "./OptionsSection.styles.sass";
import Option from "./Option";

export default function OptionsSection({
	options,
	handleDeleteOption,
	correctOption,
	setCorrectOption,
}: Props) {
	return (
		<ol className="options-container">
			{options.map((option, index) => (
				<Option
					key={uuidv4()}
					option={option}
					index={index}
					handleDeleteOption={handleDeleteOption}
					setCorrectOption={setCorrectOption}
					correctOption={correctOption}
				/>
			))}
		</ol>
	);
}
