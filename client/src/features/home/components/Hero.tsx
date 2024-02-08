import "./Hero.styles.sass";
import { Link } from "react-router-dom";
import heroillustration from "../../../assets/hero-illustration.svg";

export default function Hero() {
	return (
		<section id="hero">
			<div id="welcome-message">
				<h1>
					Bridging the gap between traditional and online examination processes
				</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste vel
					doloribus optio fugit? Sapiente rem ex, repellendus alias error
					explicabo quis, necessitatibus illum eius perferendis ad. Temporibus
					maxime molestiae ipsa facilis error nesciunt, necessitatibus
					voluptatibus, saepe officiis id quo ipsam ab, consequuntur possimus
					animi minima repellat rem a nulla itaque pariatur inventore velit!
				</p>
				<div id="auth-button-container">
					<button>
						<Link to={"/login"}>Login</Link>
					</button>
					<button>
						<Link to={"/signup"}>Signup</Link>
					</button>
				</div>
			</div>
			<div id="hero-image">
				<img src={heroillustration} alt="hero-illustration" />
			</div>
		</section>
	);
}
