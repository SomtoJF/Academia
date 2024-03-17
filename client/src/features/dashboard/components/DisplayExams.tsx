import "./DisplayExams.styles.sass";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import ErrorBoundary from "../../../components/error/ErrorBoundary.small";
import { DisplayExamTitles } from "../../../types";
import { Link, useParams } from "react-router-dom";
import { Tooltip } from "antd";
import patternImage from "../../../assets/patternpad.svg";

type props = {
	title: DisplayExamTitles;
	exams: Exam[] | [];
};

type Exam = {
	_id: string;
	name: string;
	description: string;
	due: Date;
	inviteId: string;
	examiner: {
		firstName: string;
		lastName: string;
		profilePicture?: string;
		createdAt: string;
	};
};

export default function DisplayExams({ title, exams }: props) {
	const { id } = useParams();

	if (!exams[0]) {
		return (
			<ErrorBoundary
				loading={false}
				message={
					title == DisplayExamTitles.OUTSTANDING
						? "You have no outstanding exams"
						: "No exams have been concluded yet"
				}
			/>
		);
	}

	return (
		<section className="exam-display">
			<h2>{title}</h2>
			<div className="exam-item-container">
				{exams.map((exam) => (
					<article className="exam-item" key={uuidv4()}>
						<figure>
							<img src={patternImage} alt="random pattern image" />
						</figure>
						<h3>{exam.name}</h3>
						<div className="date title">Due</div>
						<Tooltip title={exam.description}>
							<p>{exam.description}</p>
						</Tooltip>
						<div className="date time">
							{moment(exam.due).format("MMMM D, YYYY")} <br />
							<b>At: </b>
							{moment(exam.due).format("hh: mma")}
						</div>
						<Link to={`/user/${id}/exam/${exam._id}`}>Start</Link>
					</article>
				))}
			</div>
		</section>
	);
}
