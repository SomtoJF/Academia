import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
	return (
		<div className="page">
			<Navbar />
			<Outlet />
		</div>
	);
}
