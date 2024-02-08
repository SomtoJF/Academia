import "./Support.styles.sass";
import openSource from "../../../assets/open-source.svg";
import multiChoice from "../../../assets/multi-choice.svg";
import openEnded from "../../../assets/open-ended.svg";
import grade from "../../../assets/grade.svg";

export default function Support() {
	return (
		<section id="why">
			<h2>Why Academia?</h2>
			<div>
				<article>
					<p>Multiple choice question support</p>
					<figure>
						<img src={multiChoice} alt="multiple choice illustration" />
					</figure>
					<p>
						Save time creating exams, ensure consistent evaluation, and cater to
						various learning styles.
					</p>
				</article>
				<article>
					<p>Open-ended question support</p>
					<figure>
						<img src={openEnded} alt="open ended illustration" />
					</figure>
					<p>
						Academia assesses analytical skills by encouraging detailed
						explanations through our support for open-ended questions.
					</p>
				</article>
				<article>
					<p>Real-time grading</p>
					<figure>
						<img src={grade} alt="grading illustration" />
					</figure>
					<p>
						Reduce instructor workload, provide immediate feedback to students,
						and personalize learning experiences.
					</p>
				</article>
				<article>
					<p>Open Source</p>
					<figure>
						<img src={openSource} alt="open source illustration" />
					</figure>
					<p>
						Benefit from community contributions. FOSS fosters code
						transparency, and ensures you maintain complete control over the
						platform.
					</p>
				</article>
			</div>
		</section>
	);
}
