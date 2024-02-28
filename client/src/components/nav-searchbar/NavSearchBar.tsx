import { FormEvent, useState } from "react";
import "./NavSearchBar.styles.sass";
import { Input } from "antd";
import { gql, useLazyQuery } from "@apollo/client";
import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";
import SearchResultModal from "./SearchResultModal";

const EXAM_SEARCH_QUERY = gql`
	query getExam($inviteId: ID!) {
		examByInvite(inviteId: $inviteId) {
			_id
			inviteId
			name
			due
			candidates {
				_id
			}
			examiner {
				firstName
				lastName
				email
				profilePicture
			}
			inviteId
		}
	}
`;

export default function NavSearchBar() {
	const [inviteId, setInviteId] = useState("");
	const [getExam, { loading, data }] = useLazyQuery(EXAM_SEARCH_QUERY, {
		onCompleted(data) {
			console.log(data);
		},
	});
	const [messageApi, contextHolder] = message.useMessage();
	const [open, setOpen] = useState(true);

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

	const handleSearch = async (e: FormEvent) => {
		try {
			e.preventDefault();
			if (inviteId.length !== 6) {
				throw new Error(
					"invalid search ID. A valid ID must be exactly 6 characters long"
				);
			}
			const result = await getExam({ variables: { inviteId } });
			if (result.error) throw result.error;
			if (result.data.examByInvite == null) throw new Error("Not found");

			success("Exam found");
			setOpen(true);
		} catch (err: any) {
			error(err.message);
			throw err;
		}
	};
	return (
		<>
			{contextHolder}
			<nav className="nav-searchbar">
				<form action="">
					<Input
						size="large"
						placeholder="Exam ID here"
						required
						value={inviteId}
						onChange={(e) => {
							setInviteId(e.target.value);
						}}
						minLength={6}
						maxLength={6}
						style={{ width: "80%" }}
					/>
					<button type="submit" onClick={handleSearch} disabled={loading}>
						{loading ? <LoadingOutlined /> : "Search"}
					</button>
				</form>
			</nav>
			{data && data.examByInvite && (
				<SearchResultModal
					open={open}
					setOpen={setOpen}
					exam={data.examByInvite}
				/>
			)}
		</>
	);
}
