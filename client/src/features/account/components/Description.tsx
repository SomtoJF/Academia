import { Descriptions } from "antd";
import type { DescriptionsProps } from "antd";
import moment from "moment";

interface Props {
	firstName: string;
	lastName: string;
	email: string;
	createdAt: Date;
	updatedAt: Date;
	role: string;
}

const Description = ({
	firstName,
	lastName,
	email,
	createdAt,
	updatedAt,
	role,
}: Props) => {
	const items: DescriptionsProps["items"] = [
		{
			key: "1",
			label: "First Name",
			children: firstName,
		},
		{
			key: "2",
			label: "Last Name",
			children: lastName,
		},
		{
			key: "3",
			label: "Email",
			children: email,
		},
		{
			key: "6",
			label: "Role",
			children: role,
		},
		{
			key: "4",
			label: "Created At",
			children: moment(createdAt).format("MMMM DD, YYYY"),
		},
		{
			key: "5",
			label: "Last Updated At",
			children: moment(updatedAt).format("MMMM DD, YYYY"),
		},
	];
	return (
		<section>
			<Descriptions title="My Profile" items={items} />
		</section>
	);
};

export default Description;
