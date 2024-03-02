import "./DisplayExams.styles.sass";
import ExamCard from "./ExamCard";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { useEffect, useState } from "react";
import { ArrowRightOutlined, WalletOutlined } from "@ant-design/icons";
import CustomAvatar from "../../../components/avatar/CustomAvatar";
import ErrorBoundary from "../../../components/error/ErrorBoundary.small";

type props = {
	title: string;
	exams: Exam[] | [];
};

type Exam = {
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

export default function DisplayExams({ title, exams }: props) {
	console.log(exams);
	const [closestDatedItem, setClosestDatedItem] = useState<Exam>(exams[0]);
	const getClosestDatedItem = () => {
		let mostRecentItem = exams[0];
		let smallestTimeDifference = Math.abs(moment().diff(exams[0].due));

		for (let i = 0; i < exams.length; i++) {
			const itemTimeDifference = Math.abs(moment().diff(exams[i].due));
			if (itemTimeDifference < smallestTimeDifference) {
				smallestTimeDifference = itemTimeDifference;
				mostRecentItem = exams[i];
			}
		}

		return mostRecentItem;
	};
	useEffect(() => {
		if (exams[0]) {
			const closestdatedExam = getClosestDatedItem();
			setClosestDatedItem(closestdatedExam);
		}
	}, []);
	if (!exams[0]) {
		return (
			<ErrorBoundary loading={false} message="You have no upcoming exams" />
		);
	}
	return (
		<section className="exam-display">
			<h2>{title}</h2>
			<div className="data-container">
				<div>
					{exams.slice(0, 4).map((exam) => (
						<ExamCard exam={exam} key={uuidv4()} />
					))}
				</div>
				{closestDatedItem && (
					<div id="closest-item">
						<h3>{closestDatedItem.name}</h3>
						<button type="button">
							<WalletOutlined />
						</button>
						<div className="examiner">
							<CustomAvatar
								firstName={closestDatedItem.examiner.firstName}
								lastName={closestDatedItem.examiner.lastName}
								profilePicture={closestDatedItem.examiner.profilePicture}
							/>
							<p>
								{`${closestDatedItem.examiner.firstName} ${closestDatedItem.examiner.lastName}`}
							</p>
						</div>
						<small className="due">
							<b>Due at: </b>
							{moment(closestDatedItem.due).format("HH:mm MMMM DD YYYY")}
						</small>
					</div>
				)}
			</div>
			<div className="show-all-container">
				<p>Show all</p>
				<button type="button" aria-roledescription="button">
					<ArrowRightOutlined />
				</button>
			</div>
		</section>
	);
}
