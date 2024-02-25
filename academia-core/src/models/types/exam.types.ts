export interface ExamInterface {
	_id: string;
	name: string;
	examinerId: string;
	candidatesId: string[];
	objectiveQuestions?: ObjQuestionInterface[];
	theoryQuestions?: TheoryQuestionInterface[];
	due: Date;
}

export type ObjQuestionInterface = {
	question: string;
	options: string[];
	answer: number;
};
export type TheoryQuestionInterface = {
	question: string;
	answers: string[];
};
