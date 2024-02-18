import { FormEvent, useState } from "react";
import "../styles/Login.styles.sass";
import { Link, useNavigate } from "react-router-dom";
import {
	LoadingOutlined,
	EyeInvisibleOutlined,
	EyeOutlined,
} from "@ant-design/icons";
import { message } from "antd";
import { useAuth } from "../../contexts/AuthContext";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();
	const [isPasswordType, setIsPasswordType] = useState(true);
	const navigate = useNavigate();
	const { login } = useAuth();

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
			login(email, password);
			success(`Welcome back!`);
			setTimeout(() => {
				navigate("/");
			}, 1000);
		} catch (err: any) {
			error(err.message);
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			{contextHolder}
			<div id="login">
				<form action="" onSubmit={handleSubmit}>
					<h1>Welcome back!</h1>
					<p id="welcome-p">
						We're glad to have you back. Log in to explore past and upcoming
						exams.
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
					<button type="submit" disabled={loading}>
						{loading ? <LoadingOutlined /> : "Log In"}
					</button>
					<p>
						Don't have an account? <Link to={"/signup"}>Sign Up</Link>
					</p>
				</form>
			</div>
		</>
	);
}
