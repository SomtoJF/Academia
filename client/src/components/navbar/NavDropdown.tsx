import { LogoutOutlined, SettingOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps, message } from "antd";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

interface Props {
	children: ReactElement;
}

export default function NavDropdown({ children }: Props) {
	const { currentUser, logout } = useAuth();
	const [messageApi, contextHandler] = message.useMessage();

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

	const handleLogout = async () => {
		try {
			await logout();
			success("Logged out successfully");
		} catch (err: any) {
			error(err.message);
			throw err;
		}
	};

	const items: MenuProps["items"] = [
		{
			label: <Link to={`/user/${currentUser.uid}/account`}>Settings</Link>,
			icon: <SettingOutlined />,
			key: "0",
		},
		{
			type: "divider",
		},
		{
			label: <span onClick={handleLogout}>Logout</span>,
			icon: <LogoutOutlined />,
			danger: true,
			key: "3",
		},
	];

	return (
		<>
			{contextHandler}
			<Dropdown menu={{ items }} trigger={["click"]} placement="bottom">
				<a onClick={(e) => e.preventDefault()}>{children}</a>
			</Dropdown>
		</>
	);
}
