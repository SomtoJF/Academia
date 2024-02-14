import { Link } from "react-router-dom";
import "./Navbar.styles.sass";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function Navbar() {
	return (
		<nav id="home-nav">
			<div className="logo">ACADEMIA</div>
			<div className="nav-auth-button-container">
				<Link to={"/login"}>
					Log In <AiOutlineArrowRight />
				</Link>

				<Link to={"/signup"}>
					Sign Up <AiOutlineArrowRight />
				</Link>
			</div>
		</nav>
	);
}
