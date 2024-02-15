import { FormEvent, useState } from "react";
import "../styles/Login.styles.sass";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);

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

	return (
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
				<button type="submit" disabled={loading}>
					{loading ? <LoadingOutlined /> : "Log In"}
				</button>
				<p>
					Don't have an account? <Link to={"/signup"}>Sign Up</Link>
				</p>
			</form>
		</div>
	);
}
