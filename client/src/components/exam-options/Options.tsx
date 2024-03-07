import { v4 as uuidv4 } from "uuid";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
interface Props {
	options: string[];
	handleDeleteOption: (index: number) => void;
	correctOption: number;
	setCorrectOption: (index: number) => void;
}
import "./Options.styles.sass";

export default function Options({
	options,
	handleDeleteOption,
	correctOption,
	setCorrectOption,
}: Props) {
	return (
		<ol className="options-container">
			{options.map((option, index) => (
				<li
					key={uuidv4()}
					className={index === correctOption ? "correct" : ""}
					title={
						index === correctOption
							? "This is currently set as the correct answer"
							: "Click the checkmark to set this option as the correct answer"
					}
				>
					<div>
						{option}
						<div>
							<button
								type="button"
								onClick={() => {
									setCorrectOption(index);
								}}
							>
								<CheckOutlined />
							</button>
							<button
								type="button"
								onClick={() => {
									handleDeleteOption(index);
								}}
							>
								<CloseOutlined />
							</button>
						</div>
					</div>
				</li>
			))}
		</ol>
	);
}
