import "./Hero.styles.sass";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function Hero() {
	return (
		<section id="hero">
			<h1>Go beyond multiple choice with Academia.</h1>
			<p>
				Automated AI Grading for Rich, Open-Ended Answers. Experience the
				flexibility and precision of online examination processes.
			</p>
			<button>
				<Link to={"/signup"}>
					Get Started <AiOutlineArrowRight />
				</Link>
			</button>
		</section>
	);
}
