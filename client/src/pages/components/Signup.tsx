import { FormEvent, useState } from "react";
import "../styles/Signup.styles.sass";
import { Link, useNavigate } from "react-router-dom";
import {
	LoadingOutlined,
	QuestionCircleOutlined,
	EyeOutlined,
	EyeInvisibleOutlined,
} from "@ant-design/icons";
import { Tooltip, message, RadioChangeEvent, Radio } from "antd";
import { useAuth } from "../../contexts/AuthContext";
import createUserInBackend from "../../services/signup";

export default function Signup() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstname] = useState("");
	const [lastName, setLastname] = useState("");
	const [loading, setLoading] = useState(false);
	const [role, setRole] = useState<"student" | "examiner">("student");
	const [messageApi, contextHolder] = message.useMessage();
	const navigate = useNavigate();
	const [isPasswordType, setIsPasswordType] = useState(true);
	const { signup } = useAuth();

	const success = (message: string) => {
		messageApi.open({
			type: "success",
			content: message,
		});
	};

	const error = (message: string) => {
		messageApi.open({
			type: "error",
			content: message,
		});
	};

	const handlePasswordTypeChange = () => {
		setIsPasswordType(!isPasswordType);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			setLoading(true);
			const response = await signup(email, password);
			const uuid = response.uid;
			await createUserInBackend({ email, firstName, lastName, role, id: uuid });
			success("Account created successfully");
			setTimeout(() => {
				navigate("/login");
			}, 1000);
		} catch (err: any) {
			error(
				err.response?.data?.message ? err.response.data.message : err.message
			);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	const onChangeRole = (e: RadioChangeEvent) => {
		setRole(e.target.value);
	};

	return (
		<>
			{contextHolder}
			<div id="signup">
				<form action="" onSubmit={handleSubmit}>
					<h1>Create an account.</h1>
					<p id="welcome-p">
						Creating an account takes less than a minute --we promise.
					</p>
					<label htmlFor="email">
						Email*
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
						Password*
						<div id="password-input-container">
							<input
								required
								type={isPasswordType ? "password" : "text"}
								name="password"
								id="password"
								value={password}
								placeholder="Enter your password"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
							<button type="button" onClick={handlePasswordTypeChange}>
								{isPasswordType ? <EyeOutlined /> : <EyeInvisibleOutlined />}
							</button>
						</div>
					</label>
					<label htmlFor="firstName">
						First Name*
						<input
							required
							type="text"
							name="firstname"
							id="firstname"
							value={firstName}
							placeholder="Enter your first name"
							onChange={(e) => {
								setFirstname(e.target.value);
							}}
						/>
					</label>
					<label htmlFor="firstName">
						Last Name*
						<input
							required
							type="text"
							name="lastname"
							id="lastname"
							value={lastName}
							placeholder="Enter your last name"
							onChange={(e) => {
								setLastname(e.target.value);
							}}
						/>
					</label>
					<label htmlFor="role" id="role-label">
						<Tooltip title="Select the Student role if your goal is to use this platform to take examinations. Select Examiner if you're an educator looking to create exams">
							<span style={{ width: "fit-content" }}>
								Role* <QuestionCircleOutlined />
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
		</>
	);
}
