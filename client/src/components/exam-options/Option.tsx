import { v4 as uuidv4 } from "uuid";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import "./Option.styles.sass";

interface Props {
	option: string;
	index: number;
	handleDeleteOption?: (index: number) => void;
	correctOption?: number;
	setCorrectOption?: (index: number) => void;
}

export default function Option({
	option,
	index,
	handleDeleteOption,
	setCorrectOption,
	correctOption,
}: Props) {
	return (
		<li
			key={uuidv4()}
			className={index === correctOption ? "option correct" : "option"}
			title={
				index === correctOption
					? "This is currently set as the correct answer"
					: "Click the checkmark to set this option as the correct answer"
			}
		>
			<div>
				{option}
				<div>
					{setCorrectOption && (
						<button
							type="button"
							onClick={() => {
								setCorrectOption(index);
							}}
						>
							<CheckOutlined />
						</button>
					)}
					{handleDeleteOption && (
						<button
							type="button"
							onClick={() => {
								handleDeleteOption(index);
							}}
						>
							<CloseOutlined />
						</button>
					)}
				</div>
			</div>
		</li>
	);
}
