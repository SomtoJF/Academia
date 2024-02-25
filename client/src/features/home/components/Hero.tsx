import "./Hero.styles.sass";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useAuth } from "../../../contexts/AuthContext";

export default function Hero() {
	const { currentUser } = useAuth();
	return (
		<section id="hero">
			<h1>Go beyond multiple choice with Academia.</h1>
			<p>
				Automated AI Grading for Rich, Open-Ended Answers. Experience the
				flexibility and precision of online examination processes.
			</p>
			<button>
				<Link
					to={currentUser ? `/user/${currentUser.uid}/dashboard` : "/signup"}
				>
					Get Started <AiOutlineArrowRight />
				</Link>
			</button>
		</section>
	);
}
