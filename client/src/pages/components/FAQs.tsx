import { Collapse, CollapseProps } from "antd";

const items: CollapseProps["items"] = [
	{
		key: "1",
		label: "What is Academia?",
		children: (
			<p>
				Academia is an online examination platform with automatic grading
				support from multiple choice and open-ended questions.
			</p>
		),
	},
	{
		key: "2",
		label: "What makes Academia different from other online exam platforms?",
		children: (
			<p>
				Academia is different from other online examination platforms due to
				it's ability to automatically grade open-ended questions
			</p>
		),
	},
	{
		key: "3",
		label: "How do we grade your exams?",
		children: (
			<p>
				We grades open-ended questions by finding the sematic similarity between
				a student's answer and an examiner's list of answers for that question.
				The mark allocated to the student for that question is dependent on the
				similar between the answers of both parties.
			</p>
		),
	},
	{
		key: "4",
		label: "What is cosine similarity?",
		children: (
			<p>
				Cosine similarity is a way to measure how similar two things are,
				particularly useful when those things are represented as vectors. It's
				like comparing the direction of two arrows, rather than their lengths.
				<h3>For example:</h3>
				<ul>
					<li>
						Imagine you have two vectors, like arrows in space. Cosine
						similarity calculates the angle between those vectors.
					</li>
					<li>
						A smaller angle indicates the vectors are more similar in direction
						(think parallel arrows), resulting in a higher cosine similarity
						score (closer to 1).
					</li>
					<li>
						Conversely, a larger angle means the vectors are pointing in
						different directions (think perpendicular arrows), resulting in a
						lower cosine similarity score (closer to 0).
					</li>
				</ul>
				One key advantage of cosine similarity is that it considers the
				direction of the vectors, not their magnitude (length). So, even if two
				vectors have different lengths, they can still have a high cosine
				similarity if they point in the same direction.
				<br />
				You can find more information about cosine similarity{" "}
				<a
					href="https://en.wikipedia.org/wiki/Cosine_similarity"
					target="_blank"
				>
					here
				</a>
				.
			</p>
		),
	},
	{
		key: "5",
		label:
			"Why isn't isn't cosine similarity a sufficient stand-alone solution for semantic similarity?",
		children: (
			<p>
				<p>
					Cosine similarity is a useful tool, but it has limitations when it
					comes to understanding the true semantic similarity of text. This
					document explores those limitations and how using text entailment can
					be a good solution.
				</p>
				<h2>Cosine Similarity's Shortcomings</h2>
				<ul>
					<li>
						<strong>Focuses on word overlap, not meaning:</strong> Cosine
						similarity compares word frequencies, not how those words interact
						to convey meaning. Sentences with similar words but different
						meanings can have high cosine similarity scores.
					</li>
					<ul>
						<li>
							<i>Example:</i> "The bank is by the river" and "I went to the bank
							to deposit money" would have high cosine similarity despite
							different meanings of "bank."
						</li>
					</ul>
					<li>
						<strong>Limited understanding of context:</strong> Cosine similarity
						doesn't consider context or sentence structure. Sentences with
						similar word sequences but opposite meanings can appear similar.
					</li>
					<ul>
						<li>
							<i>Example:</i> "This movie was excellent" and "This movie was
							terribly boring" might have similar cosine similarity scores due
							to shared words.
						</li>
					</ul>
				</ul>
				<h2>Text Entailment and the Solution</h2>
				<p>
					Text entailment asks if one sentence (the hypothesis) can be inferred
					from another (the text). It goes beyond surface-level similarity.
				</p>
				<ul>
					<li>
						<i>Example:</i> "The bank is by the river" entails "There is a bank
						somewhere." (True)
					</li>
					<li>
						<i>Example:</i> "This movie was excellent" doesn't entail "This
						movie was terribly boring" (False).
					</li>
				</ul>
				<h2>Why using them together helps</h2>
				<p>
					Combining cosine similarity with text entailment can provide a more
					robust measure of semantic similarity.
				</p>
				<ul>
					<li>
						Cosine similarity can identify candidate sentences with similar word
						usage.
					</li>
					<li>
						Text entailment can then verify if those sentences truly convey
						similar meanings based on logical inference.
					</li>
				</ul>
				<p>
					This combined approach helps address the limitations of cosine
					similarity alone, leading to a more accurate understanding of how
					similar two pieces of text truly are in meaning.
				</p>
			</p>
		),
	},
	{
		key: "6",
		label: "Who built Academia?",
		children: <p>Academia was built by Francis Somtochukwu</p>,
	},
];

export default function FAQs() {
	return (
		<div id="faqs">
			<h1>Frequently Asked Questions</h1>
			<Collapse items={items} defaultActiveKey={["1"]} />
			<p>
				If you have more questions send an email to:{" "}
				<a href="mailto:somtochukwujf@gmail.com">somtochukwujf@gmail.com</a>
			</p>
		</div>
	);
}
