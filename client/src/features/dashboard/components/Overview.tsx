import {
	CheckCircleOutlined,
	ClockCircleOutlined,
	IssuesCloseOutlined,
	PlusCircleOutlined,
} from "@ant-design/icons";
import "./Overview.styles.sass";

interface Props {
	concludedExams: any[];
	upcomingExams: any[];
}

export default function Overview({ upcomingExams, concludedExams }: Props) {
	return (
		<section id="dashboard-overview">
			<h3>Overview</h3>
			<div id="overview-container">
				<article>
					<div>
						<CheckCircleOutlined />
					</div>
					<p>{concludedExams.length}</p>
					<p>Exams concluded</p>
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
				<article>
					<div>
						<ClockCircleOutlined />
					</div>
					<p>{concludedExams.length}</p>
					<p>Exams concluded</p>
				</article>
			</div>
		</section>
	);
}
