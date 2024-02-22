export interface UserInterface {
	_id: string;
	email: string;
	firstName: string;
	lastName: string;
	profilePicture?: string;
	role: Role;
	// role: Role;
	examsTakenId?: string[];
	examsSetId?: string[];
}

enum Role {
	STUDENT = "STUDENT",
	EXAMINER = "EXAMINER",
}
