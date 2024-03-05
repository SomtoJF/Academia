import { Link, useParams } from "react-router-dom";
import "../styles/ErrorPage.styles.sass";
import errorIllustration from "../../assets/error-illustration.svg";

export default function ErrorPage() {
	const { id } = useParams();
	return (
		<div id="error-page">
			<h1>Uh Oh!</h1>
			<p>
				Something went wrong. It could be for a number of reasons but be rest
				assured we're working to fix it.
			</p>
			<div id="routing-container">
				<button type="button">
					<Link to={`/user/${id}/dashboard`}>To Dashboard</Link>
				</button>
				<button type="button">
					<Link to={"/"}>Go Home</Link>
				</button>
			</div>
			<img src={errorIllustration} alt="errorIlluistration" />
		</div>
	);
}
