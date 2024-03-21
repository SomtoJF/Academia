import {
	AppstoreOutlined,
	CalendarOutlined,
	DisconnectOutlined,
	DotChartOutlined,
	HomeOutlined,
	QuestionOutlined,
	UserOutlined,
	VerticalLeftOutlined,
	VerticalRightOutlined,
} from "@ant-design/icons";
import "./Sidebar.styles.sass";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink, useParams } from "react-router-dom";
import gsap from "gsap";
import { useState } from "react";
import { message } from "antd";

export default function Sidebar() {
	const { logout } = useAuth();
	const { id } = useParams();
	const [isSidebarExpanded, setSideBarExpanded] = useState(false);
	const [messageApi, contextHolder] = message.useMessage();

	const success = (message: string) => {
		messageApi.open({
			type: "success",
			content: message,
		});
	};

	const expandSideBar = () => {
		gsap.to("#sidebar", {
			width: "max(250px, 15%)",
			duration: "0.25",
			onComplete: () => {
				gsap.to(".link-text", { display: "inline" });
			},
		});
		setSideBarExpanded(true);
	};
	const collapseSideBar = () => {
		setTimeout(() => {
			gsap.to(".link-text", {
				display: "none",
				duration: "0.1",
				onComplete: () => {
					gsap.to("#sidebar", {
						width: 60,
						duration: "0.25",
					});
				},
			});
			setSideBarExpanded(false);
		}, 500);
	};

	const handleLogout = async () => {
		success("Successfully logged out");
		setTimeout(() => {
			logout();
		}, 1000);
	};

	return (
		<>
			{contextHolder}
			<aside id="sidebar">
				<ul>
					<li onClick={isSidebarExpanded ? collapseSideBar : expandSideBar}>
						<a href="" style={{ pointerEvents: "none" }}>
							{isSidebarExpanded ? (
								<VerticalRightOutlined />
							) : (
								<VerticalLeftOutlined />
							)}{" "}
							<span className="link-text">
								{isSidebarExpanded ? "Collapse" : null}
							</span>
						</a>
					</li>
					<li onClick={collapseSideBar}>
						<NavLink to={"/"}>
							<HomeOutlined /> <span className="link-text">Home</span>
						</NavLink>
					</li>
					<li onClick={collapseSideBar}>
						<NavLink to={`/user/${id}/dashboard`}>
							<AppstoreOutlined /> <span className="link-text">Dashboard</span>
						</NavLink>
					</li>
					<li onClick={collapseSideBar}>
						<NavLink to={`/user/${id}/result`}>
							<DotChartOutlined /> <span className="link-text">Results</span>
						</NavLink>
					</li>
					<li onClick={collapseSideBar}>
						<NavLink to={`/user/${id}/schedule`}>
							<CalendarOutlined /> <span className="link-text">Schedule</span>
						</NavLink>
					</li>
					<li onClick={collapseSideBar}>
						<NavLink to={`/user/${id}/account`}>
							<UserOutlined /> <span className="link-text">My Account</span>
						</NavLink>
					</li>
					<li onClick={collapseSideBar}>
						<NavLink to={`/user/${id}/faqs`}>
							<QuestionOutlined />
							<span className="link-text">FAQs</span>
						</NavLink>
					</li>
				</ul>
				<div id="auth-container">
					<button id="logout" onClick={handleLogout}>
						<DisconnectOutlined /> <span className="link-text">Logout</span>
					</button>
				</div>
			</aside>
		</>
	);
}
