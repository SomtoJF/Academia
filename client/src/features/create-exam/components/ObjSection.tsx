import { PlusOutlined } from "@ant-design/icons";
import { ObjectiveQuestions } from "../../../types";
import "../styles/ObjSection.styles.sass";
import { useState } from "react";
import NewObjQuestionModal from "./NewObjQuestionModal";
import ObjQuestion from "../../../components/obj-question/ObjQuestion";
import { v4 as uuidv4 } from "uuid";

interface Props {
	objQuestions: ObjectiveQuestions[];
	setObjQuestions: (objQuestions: ObjectiveQuestions[]) => void;
}

export default function ObjSection({ objQuestions, setObjQuestions }: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleDeleteQuestion = (index: number) => {
		setObjQuestions(
			objQuestions.slice(0, index).concat(objQuestions.slice(index + 1))
		);
	};
	return (
		<section id="obj-section">
			<h2>Multiple Choice Section</h2>
			<ol>
				{objQuestions.map((question, index) => (
					<ObjQuestion
						key={uuidv4()}
						question={question}
						index={index}
						handleDeleteQuestion={handleDeleteQuestion}
					/>
				))}
			</ol>
			<button
				type="button"
				id="new-obj-question"
				onClick={() => setIsModalOpen(true)}
			>
				<PlusOutlined />
				New question
			</button>
			<NewObjQuestionModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				title="New Objective Question"
				setObjQuestions={setObjQuestions}
				objQuestions={objQuestions}
			/>
		</section>
	);
}
