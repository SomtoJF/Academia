import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./CreateExamButton.styles.sass";
import { useAuth } from "../../../contexts/AuthContext";

export default function CreateExamButton() {
	const { currentUser } = useAuth();
	return (
		<button type="button" id="create-exam-button">
			<Link to={`/user/${currentUser.uid}/create/exam`}>
				<PlusOutlined />
				New Exam
			</Link>
		</button>
	);
}
