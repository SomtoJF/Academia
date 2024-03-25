import { Link } from "react-router-dom";
import "./Navbar.styles.sass";
import { AiOutlineArrowRight } from "react-icons/ai";
import { gql, useQuery } from "@apollo/client";
import { useAuth } from "../../contexts/AuthContext";
import { LoadingOutlined } from "@ant-design/icons";
import CustomAvatar from "../avatar/CustomAvatar";
import NavDropdown from "./NavDropdown";

const NAV_INFO_QUERY = gql`
	query userQuery($id: ID!) {
		user(id: $id) {
			firstName
			lastName
			profilePicture
		}
	}
`;

const AuthButtons = () => (
	<div className="nav-auth-button-container">
		<Link to={"/login"}>
			Log In <AiOutlineArrowRight />
		</Link>

		<Link to={"/signup"}>
			Sign Up <AiOutlineArrowRight />
		</Link>
	</div>
);

export default function Navbar() {
	const { currentUser } = useAuth();
	const { loading, data } = useQuery(NAV_INFO_QUERY, {
		variables: { id: currentUser && currentUser.uid },
	});
	return (
		<nav id="home-nav">
			<div className="logo">ACADEMIA</div>
			{loading ? (
				<LoadingOutlined />
			) : currentUser ? (
				<NavDropdown>
					<CustomAvatar
						firstName={data.user.firstName}
						lastName={data.user.lastName}
						profilePicture={data.user.profilePicture}
					/>
				</NavDropdown>
			) : (
				<AuthButtons />
			)}
		</nav>
	);
}
