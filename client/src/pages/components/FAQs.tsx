import { Collapse, CollapseProps } from "antd";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps["items"] = [
	{
		key: "1",
		label: "What is Academia?",
		children: <p>{text}</p>,
	},
	{
		key: "2",
		label: "What makes Academia different from other online exam platforms?",
		children: <p>{text}</p>,
	},
	{
		key: "3",
		label: "How do we grade your exams?",
		children: <p>{text}</p>,
	},
	{
		key: "4",
		label: "What is cosine similarity?",
		children: <p>{text}</p>,
	},
	{
		key: "5",
		label: "Why isn't isn't cosine similarity sufficient for our use case?",
		children: <p>{text}</p>,
	},
	{
		key: "4",
		label: "Who built Academia?",
		children: <p>Francis Somtochukwu</p>,
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
