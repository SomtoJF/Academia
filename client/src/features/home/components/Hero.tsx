import "./Hero.styles.sass";
import { Link } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function Hero() {
	return (
		<section id="hero">
			<h1>
				Bridging the gap between traditional and online examination processes.
			</h1>
			<p>
				The aim of online examination processes has always been to make
				examinations faster and more efficient. However, one major issue poses a
				challenge to the realization of that goal --that is the inability of
				most platforms to automatically grade open-ended questions. Academia
				seeks to solve this problem...
			</p>
			<button>
				<Link to={"/signup"}>
					Get Started <AiOutlineArrowRight />
				</Link>
			</button>
		</section>
	);
}
