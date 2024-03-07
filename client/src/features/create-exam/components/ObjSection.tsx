import { PlusOutlined } from "@ant-design/icons";
import { ObjectiveQuestions } from "../../../types";
import "../styles/ObjSection.styles.sass";
import { useState } from "react";
import ExamModal from "./ExamModal";

interface Props {
	objQuestions: ObjectiveQuestions[];
	setObjQuestions: (objQuestions: ObjectiveQuestions[]) => void;
}

export default function ObjSection({ objQuestions, setObjQuestions }: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	return (
		<section id="obj-section">
			<h2>Multiple Choice Section</h2>
			<button
				type="button"
				id="new-obj-question"
				onClick={() => setIsModalOpen(true)}
			>
				<PlusOutlined />
				New question
			</button>
			<ExamModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				title="New Objective Question"
				setObjQuestions={setObjQuestions}
				objQuestions={objQuestions}
			/>
		</section>
	);
}
