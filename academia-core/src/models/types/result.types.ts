export enum ResultStatus {
	SUCCESS = "SUCCESS",
	PENDING = "PENDING",
	FAILED = "FAILED",
}

export type Result = {
	_id: string;
	examId: string;
	candidateId: string;
	objectiveAnswers: number[];
	theoryAnswers: string[];
	totalQuestions: number;
	score: number;
	status: ResultStatus;
	createdAt: Date;
	updatedAt: Date;
};
