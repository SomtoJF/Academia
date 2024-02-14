import Hero from "../../features/home/components/Hero";
import Support from "../../features/home/components/Support";
import "../styles/Home.styles.sass";

export default function Home() {
	return (
		<div id="home">
			<Hero />
			<Support />
		</div>
	);
}
