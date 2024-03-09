import { PlusOutlined } from "@ant-design/icons";
import { TheoryQuestion as TheoryQuestionInterface } from "../../../types";
import "../styles/ObjSection.styles.sass";
import { useState } from "react";

import { v4 as uuidv4 } from "uuid";
import TheoryQuestion from "../../../components/theory-question/TheoryQuestion";
import NewTheoryQuestionModal from "./NewTheoryQuestionModal";

interface Props {
	theoryQuestions: TheoryQuestionInterface[];
	setTheoryQuestions: (theoryQuestions: TheoryQuestionInterface[]) => void;
}

export default function TheorySection({
	theoryQuestions,
	setTheoryQuestions,
}: Props) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleDeleteQuestion = (index: number) => {
		setTheoryQuestions(
			theoryQuestions.slice(0, index).concat(theoryQuestions.slice(index + 1))
		);
	};
	return (
		<section id="obj-section">
			<h2>Theory Section</h2>
			<ol>
				{theoryQuestions.map((question, index) => (
					<TheoryQuestion
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
			<NewTheoryQuestionModal
				isModalOpen={isModalOpen}
				setIsModalOpen={setIsModalOpen}
				title="New Theory Question"
				theoryQuestions={theoryQuestions}
				setTheoryQuestions={setTheoryQuestions}
			/>
		</section>
	);
}
