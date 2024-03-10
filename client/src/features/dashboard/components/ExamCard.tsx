import { MoreOutlined, ShareAltOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, message } from "antd";
import moment from "moment";
import copyTextToClipBoard from "../../../utils/copy-to-clipboard";
import "./ExamCard.styles.sass";

type props = {
	exam: {
		name: string;
		due: Date;
		inviteId: string;
		examiner: {
			firstName: string;
			lastName: string;
			profilePicture?: string;
			createdAt: string;
		};
	};
};

export default function ExamCard({ exam }: props) {
	const [messageApi, contextHolder] = message.useMessage();

	const items: MenuProps["items"] = [
		{
			key: "1",
			icon: <ShareAltOutlined />,
			label: (
				<button
					type="button"
					className="invite-id-share"
					onClick={() => {
						copyIdToClipBoard(exam.inviteId);
					}}
				>
					Copy Invite ID
				</button>
			),
		},
	];

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

	const copyIdToClipBoard = (text: string) => {
		try {
			copyTextToClipBoard(text);
			success("Successfully copied invite id");
		} catch (err: any) {
			error(err.message);
			throw err;
		}
	};

	return (
		<>
			{contextHolder}
			<article className="exam-card">
				<h4>{exam.name}</h4>
				<Dropdown menu={{ items }} placement="bottom" arrow>
					<button type="button" className="more-button">
						<MoreOutlined />
					</button>
				</Dropdown>
				<small>Concluded at:</small>
				<div>{moment(exam.due).format("hh:mma")}</div>
				<small>{moment(exam.due).format("MMMM DD YYYY")}</small>
			</article>
		</>
	);
}
