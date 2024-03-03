import { gql, useMutation } from "@apollo/client";
import "../styles/UpdateAccountForm.styles.sass";
import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";

interface Props {
	firstName: string;
	lastName: string;
	email: string;
}

const UPDATE_USER_MUTATION = gql`
	mutation Mutation($updateUserId: ID!, $edits: UpdateUserArgs!) {
		updateUser(id: $updateUserId, edits: $edits) {
			firstName
			lastName
		}
	}
`;

export default function UpdateAccountForm({
	firstName,
	lastName,
	email,
}: Props) {
	const { id } = useParams();
	const [firstNameInput, setFirstNameInput] = useState(firstName);
	const [lastNameInput, setLastNameInput] = useState(lastName);
	const [emailInput, setEmailInput] = useState(email);
	const [messageApi, contextHolder] = message.useMessage();

	const [updateUserAccount, { loading }] = useMutation(UPDATE_USER_MUTATION, {
		variables: {
			updateUserId: id,
			edits: {
				firstName: firstNameInput,
				lastName: lastNameInput,
				email: emailInput,
			},
		},
	});

	const success = (message: string) => {
		messageApi.open({
			type: "success",
			content: message,
		});
	};

	const error = (message: string) => {
		messageApi.open({
			type: "error",
			content: message,
		});
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			await updateUserAccount();
			success("Account details updated successfully");
			setTimeout(() => {
				window.location.reload();
			}, 2000);
		} catch (err: any) {
			error(err.message);
		}
	};
	return (
		<>
			{contextHolder}
			<form id="update-account-form">
				<h4>Personal Information</h4>
				<div id="input-container">
					<label htmlFor="firstName">
						First Name
						<input
							type="text"
							name="firstName"
							id="firstName"
							value={firstNameInput}
							onChange={(e) => setFirstNameInput(e.target.value)}
						/>
					</label>
					<label htmlFor="lastName">
						Last Name
						<input
							type="text"
							name="lastName"
							id="lastName"
							value={lastNameInput}
							onChange={(e) => setLastNameInput(e.target.value)}
						/>
					</label>
					<label htmlFor="email">
						Email Address
						<input
							type="email"
							name="email"
							id="email"
							value={emailInput}
							disabled
							onChange={(e) => setEmailInput(e.target.value)}
						/>
					</label>
				</div>
				<button type="submit" disabled={loading} onClick={handleSubmit}>
					{loading ? <LoadingOutlined /> : "Update Profile"}
				</button>
			</form>
		</>
	);
}
