import { Avatar, Divider } from "antd";
import "./ExaminerInfo.styles.sass";
import { EditOutlined } from "@ant-design/icons";
import { DatePicker, DatePickerProps } from "antd";

interface Props {
	firstName: string;
	lastName: string;
	email: string;
	examName: string;
	profilePicture: string;
	setDueDate: (date: Date | undefined) => void;
	setExamName: (name: string) => void;
}

export default function ExaminerInfo({
	firstName,
	lastName,
	profilePicture,
	email,
	examName,
	setExamName,
	setDueDate,
}: Props) {
	const selectDate = (value: DatePickerProps["value"]) => {
		setDueDate(value?.toDate());
	};
	return (
		<div id="examiner-info">
			<Avatar
				src={[profilePicture]}
				style={{
					width: "auto",
					height: "100%",
					backgroundColor: "#CB9BFA",
					color: "#1F1F29",
					fontWeight: "bold",
					fontSize: "1.5rem",
					border: "solid 2px #1F1F29",
				}}
			>
				{firstName.charAt(0)}
				{lastName.charAt(0)}
			</Avatar>
			<h3>{`${firstName} ${lastName}`}</h3>
			<small>{email}</small>
			<Divider />
			<label htmlFor="exam-name">
				Exam Name:
				<input
					type="text"
					name="examName"
					id="exam-name"
					placeholder="Exam Name"
					value={examName}
					onChange={(e) => {
						setExamName(e.target.value);
					}}
				/>
				<EditOutlined />
			</label>
			<div id="due-date">
				<span>Due date*: </span>
				<DatePicker showTime onOk={selectDate} placeholder="Select due date" />
			</div>
		</div>
	);
}
