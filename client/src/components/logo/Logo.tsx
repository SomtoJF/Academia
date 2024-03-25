import { Link } from "react-router-dom";
import "./Logo.styles.sass";

export default function Logo() {
	return (
		<div id="logo">
			<Link to={"/"}>ACADEMIA</Link>
		</div>
	);
}
