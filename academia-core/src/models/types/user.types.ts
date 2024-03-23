export interface UserInterface {
	_id: string;
	email: string;
	firstName: string;
	lastName: string;
	profilePicture?: string;
	role: Role;
}

enum Role {
	STUDENT = "STUDENT",
	EXAMINER = "EXAMINER",
}
