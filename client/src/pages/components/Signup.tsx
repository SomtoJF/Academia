import { FormEvent, useState } from "react";
import "../styles/Signup.styles.sass";
import { Link } from "react-router-dom";
import { LoadingOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import type { RadioChangeEvent } from "antd";
import { Radio } from "antd";
import { Tooltip } from "antd";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstname, setFirstname] = useState("");
	const [lastname, setLastname] = useState("");
	const [loading, setLoading] = useState(false);
	const [role, setRole] = useState<"student" | "examiner">("student");

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		try {
			setLoading(true);
		} catch (error) {
			throw error;
		} finally {
			setLoading(false);
		}
	};

	const onChangeRole = (e: RadioChangeEvent) => {
		setRole(e.target.value);
	};

	return (
		<div id="signup">
			<form action="" onSubmit={handleSubmit}>
				<h1>Create an account.</h1>
				<p id="welcome-p">
					Creating an account takes less than a minute --we promise.
				</p>
				<label htmlFor="email">
					Email
					<input
						required
						type="email"
						name="email"
						id="email"
						value={email}
						placeholder="Enter your email"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
				</label>
				<label htmlFor="password">
					Password
					<input
						required
						type="password"
						name="password"
						id="password"
						value={password}
						placeholder="Enter your password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
				</label>
				<label htmlFor="firstname">
					First Name
					<input
						required
						type="text"
						name="firstname"
						id="firstname"
						value={firstname}
						placeholder="Enter your first name"
						onChange={(e) => {
							setFirstname(e.target.value);
						}}
					/>
				</label>
				<label htmlFor="firstname">
					Last Name
					<input
						required
						type="text"
						name="lastname"
						id="lastname"
						value={lastname}
						placeholder="Enter your last name"
						onChange={(e) => {
							setLastname(e.target.value);
						}}
					/>
				</label>
				<label htmlFor="role" id="role-label">
					<Tooltip title="Select the Student role if your goal is to use this platform to take examinations. Select Examiner if you're an educator looking to create exams">
						<span style={{ width: "fit-content" }}>
							Role <QuestionCircleOutlined />
						</span>
					</Tooltip>
					<Radio.Group onChange={onChangeRole} value={role}>
						<Radio value={"student"}>Student</Radio>
						<Radio value={"examiner"}>Examiner</Radio>
					</Radio.Group>
				</label>

				<button type="submit" disabled={loading}>
					{loading ? <LoadingOutlined /> : " Sign Up"}
				</button>
				<p>
					Already have an account? <Link to={"/login"}> Log In</Link>
				</p>
			</form>
		</div>
	);
}
