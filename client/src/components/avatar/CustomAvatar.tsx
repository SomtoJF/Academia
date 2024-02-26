import { Avatar } from "antd";

interface Props {
	firstName: string;
	lastName: string;
	profilePicture: string | undefined;
}

export default function CustomAvatar({
	firstName,
	lastName,
	profilePicture,
}: Props) {
	return (
		<Avatar
			src={profilePicture ? profilePicture : null}
			style={{ backgroundColor: "#CB9BFA" }}
			size={35}
		>{`${firstName.charAt(0)}${lastName.charAt(0)}`}</Avatar>
	);
}
