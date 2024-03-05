import { Avatar, Divider } from "antd";
import "./ExaminerInfo.styles.sass";
import { EditOutlined } from "@ant-design/icons";

interface Props {
	firstName: string;
	lastName: string;
	email: string;
	examName: string;
	profilePicture: string;
	setExamName: (name: string) => void;
}

export default function ExaminerInfo({
	firstName,
	lastName,
	profilePicture,
	email,
	examName,
	setExamName,
}: Props) {
	return (
		<div id="examiner-info">
			<Avatar
				src={[profilePicture]}
				style={{
					width: "auto",
					height: "100%",
					backgroundColor: "black",
					fontSize: "1.5rem",
				}}
			>
				{firstName.charAt(0) + " "}
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
		</div>
	);
}
