import Hero from "../../features/home/components/Hero";
import Navbar from "../../features/home/components/Navbar";
import Support from "../../features/home/components/Support";
import "../styles/Home.styles.sass";

export default function Home() {
	return (
		<div id="home">
			<Navbar />
			<Hero />
			<Support />
		</div>
	);
}
