import { Link } from "react-router-dom";
import "./Navbar.styles.sass";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function Navbar() {
	return (
		<nav id="home-nav">
			<div className="logo">ACADEMIA</div>
			<div className="nav-auth-button-container">
				<button>
					<Link to={"/login"}>
						Log In <AiOutlineArrowRight />
					</Link>
				</button>
				<button>
					<Link to={"/signup"}>
						Sign Up <AiOutlineArrowRight />
					</Link>
				</button>
			</div>
		</nav>
	);
}
