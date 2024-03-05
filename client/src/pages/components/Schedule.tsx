import { Calendar, CalendarProps } from "antd";
import type { Dayjs } from "dayjs";
import "../styles/Schedule.styles.sass";

export default function Schedule() {
	const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
		console.log(value.format("YYYY-MM-DD"), mode);
	};

	return (
		<div id="schedule">
			<h1>My Calendar</h1>
			<Calendar onPanelChange={onPanelChange} />
		</div>
	);
}
