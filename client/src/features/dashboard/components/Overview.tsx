import {
	CheckCircleOutlined,
	IssuesCloseOutlined,
	PlusCircleOutlined,
	WarningOutlined,
} from "@ant-design/icons";
import "./Overview.styles.sass";

interface Props {
	concludedExams: any[];
	upcomingExams: any[];
	submittedExams?: any[];
}

export default function Overview({
	upcomingExams,
	concludedExams,
	submittedExams,
}: Props) {
	return (
		<section id="dashboard-overview">
			<h3>Overview</h3>
			<div id="overview-container">
				<article>
					<div>
						<WarningOutlined />
					</div>
					<p>{concludedExams.length}</p>
					<p>Exams Ended</p>
				</article>
				<article>
					<div>
						<IssuesCloseOutlined />
					</div>
					<p>{upcomingExams.length}</p>
					<p>Upcoming Exams</p>
				</article>
				<article>
					<div>
						<PlusCircleOutlined />
					</div>
					<p>{concludedExams.length + upcomingExams.length}</p>
					<p>Exams Registered for</p>
				</article>
				{submittedExams && (
					<article>
						<div>
							<CheckCircleOutlined />
						</div>
						<p>{submittedExams.length}</p>
						<p>Exams submitted</p>
					</article>
				)}
			</div>
		</section>
	);
}
