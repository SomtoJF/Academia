import { Empty } from "antd";
import useRoleStore from "../../zustand/role-store.zustand";
import StudentResult from "../../features/result/StudentResult";
import ExaminerResult from "../../features/result/ExaminerResult";
import "../styles/Result.styles.sass";

export default function Result() {
	const role = useRoleStore((state) => state.role);
	if (role && role === "STUDENT") return <StudentResult />;
	if (role && role === "EXAMINER") return <ExaminerResult />;
	return <Empty />;
}
