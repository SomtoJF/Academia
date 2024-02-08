import Hero from "../../features/home/components/Hero";
import Navbar from "../../features/home/components/Navbar";
import "../styles/Home.styles.sass";

export default function Home() {
	return (
		<div id="home">
			<Navbar />
			<Hero />
		</div>
	);
}
