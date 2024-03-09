import { PlusOutlined } from "@ant-design/icons";
import { Link, useParams } from "react-router-dom";
import "./CreateExamButton.styles.sass";

export default function CreateExamButton() {
	const { id } = useParams();
	return (
		<button type="button" id="create-exam-button">
			<Link to={`/user/${id}/create/exam`}>
				<PlusOutlined />
				New Exam
			</Link>
		</button>
	);
}
