import moment from "moment";

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
	return (
		<article className="exam-card">
			<h4>{exam.name}</h4>
			<small>Concluded at:</small>
			<div>{moment(exam.due).format("hh:mma")}</div>
			<small>{moment(exam.due).format("MMMM DD YYYY")}</small>
		</article>
	);
}
