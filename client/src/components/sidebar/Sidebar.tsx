import {
	CalendarOutlined,
	DisconnectOutlined,
	DotChartOutlined,
	HomeOutlined,
	QuestionOutlined,
	UserOutlined,
} from "@ant-design/icons";
import "./Sidebar.styles.sass";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink, useParams } from "react-router-dom";
import Logo from "../logo/Logo";

export default function Sidebar() {
	const { logout } = useAuth();
	const { id } = useParams();
	return (
		<aside id="sidebar">
			<Logo />
			<ul>
				<li>
					<NavLink to={`/user/${id}/dashboard`}>
						<HomeOutlined /> Dashboard
					</NavLink>
				</li>
				<li>
					<NavLink to={"/hsjs"}>
						<DotChartOutlined /> Results
					</NavLink>
				</li>
				<li>
					<NavLink to={"/hsj"}>
						<CalendarOutlined /> Schedule
					</NavLink>
				</li>
				<li>
					<NavLink to={"/sjsjd"}>
						<UserOutlined /> My Account
					</NavLink>
				</li>
				<li>
					<NavLink to={"/hhdj"}>
						<QuestionOutlined />
						FAQs
					</NavLink>
				</li>
			</ul>
			<div id="auth-container">
				<button id="logout" onClick={logout}>
					<DisconnectOutlined /> Logout
				</button>
			</div>
		</aside>
	);
}
