import { Link } from "react-router-dom";
import logoImage from "../../assets/logo-image.png";
import "./Logo.styles.sass";

export default function Logo() {
	return (
		<div id="logo">
			<Link to={"/"}>
				<img src={logoImage} alt="logo" />
				Academia
			</Link>
		</div>
	);
}
