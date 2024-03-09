import { ObjectiveQuestions } from "./objective-question.interface";
import { TheoryQuestion } from "./theory-question.interface";

export interface Exam {
	name: string;
	due: Date | number;
	objectiveQuestions: ObjectiveQuestions[];
	theoryQuestions: TheoryQuestion[];
	examinerId: string;
}
