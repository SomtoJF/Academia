import {
	AppstoreOutlined,
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
import gsap from "gsap";
import { useEffect, useState } from "react";

export default function Sidebar() {
	const { logout } = useAuth();
	const { id } = useParams();
	const [isSidebarExpanded, setSideBarExpanded] = useState(false);

	const expandSideBar = () =>
		gsap.to("#sidebar", {
			width: "max(250px, 15%)",
			duration: "0.25",
			onComplete: () => {
				gsap.to(".link-text", { display: "inline" });
			},
		});
	const collapseSideBar = () => {
		const elements = document.getElementsByClassName("link-text");

		// Loop through the collection and set their display style to 'none'
		for (let i = 0; i < elements.length; i++) {
			const element = elements[i] as HTMLElement;
			element.style.display = "none";
		}

		gsap.to("#sidebar", { width: 60, duration: "0.25" });
	};

	useEffect(() => {
		if (isSidebarExpanded) expandSideBar();
		else
			setTimeout(() => {
				collapseSideBar();
			}, 300);
	}, [isSidebarExpanded]);

	return (
		<aside
			id="sidebar"
			onMouseOver={() => {
				setSideBarExpanded(true);
			}}
			onMouseLeave={() => {
				setSideBarExpanded(false);
			}}
		>
			<ul>
				<li>
					<NavLink to={"/"}>
						<HomeOutlined /> <span className="link-text">Home</span>
					</NavLink>
				</li>
				<li>
					<NavLink to={`/user/${id}/dashboard`}>
						<AppstoreOutlined /> <span className="link-text">Dashboard</span>
					</NavLink>
				</li>
				<li>
					<NavLink to={"/hsjs"}>
						<DotChartOutlined /> <span className="link-text">Results</span>
					</NavLink>
				</li>
				<li>
					<NavLink to={"/hsj"}>
						<CalendarOutlined /> <span className="link-text">Schedule</span>
					</NavLink>
				</li>
				<li>
					<NavLink to={"/sjsjd"}>
						<UserOutlined /> <span className="link-text">My Account</span>
					</NavLink>
				</li>
				<li>
					<NavLink to={"/hhdj"}>
						<QuestionOutlined />
						<span className="link-text">FAQs</span>
					</NavLink>
				</li>
			</ul>
			<div id="auth-container">
				<button id="logout" onClick={logout}>
					<DisconnectOutlined /> <span className="link-text">Logout</span>
				</button>
			</div>
		</aside>
	);
}
