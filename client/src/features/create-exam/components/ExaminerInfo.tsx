import { Avatar, Divider } from "antd";
import "../styles/ExaminerInfo.styles.sass";
import { EditOutlined } from "@ant-design/icons";
import { DatePicker, DatePickerProps } from "antd";
import dayjs from "dayjs";

interface Props {
	firstName: string;
	lastName: string;
	email: string;
	examName: string;
	setExamName: (name: string) => void;
	description: string;
	setDescription: (description: string) => void;
	profilePicture: string;
	dueDate: Date | undefined;
	setDueDate: (date: Date | undefined) => void;
}

export default function ExaminerInfo({
	firstName,
	lastName,
	profilePicture,
	email,
	examName,
	setExamName,
	description,
	setDescription,
	dueDate,
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
			<div id="info-container">
				<h3>{`${firstName} ${lastName}`}</h3>
				<small>{email}</small>
				<Divider style={{ margin: "10px 0px" }} />
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
				<label htmlFor="exam-description">
					Description:
					<input
						type="text"
						name="description"
						id="exam-description"
						placeholder="Brief description of your exam here"
						value={description}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					/>
					<EditOutlined />
				</label>
				<div id="due-date">
					<span>Due date*: </span>
					<DatePicker
						value={dayjs(dueDate)}
						showTime
						onOk={selectDate}
						placeholder="Select due date"
					/>
				</div>
			</div>
		</div>
	);
}
