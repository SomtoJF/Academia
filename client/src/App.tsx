import "./App.sass";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/components/Home";
import Login from "./pages/components/Login";
import Signup from "./pages/components/Signup";
import HomeLayout from "./layouts/HomeLayout";
import { AuthProvider } from "./contexts/AuthContext";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeLayout />,
		children: [{ path: "/", element: <Home /> }],
	},
	{
		path: "/login",
		element: <Login />,
	},
	{ path: "/signup", element: <Signup /> },
]);

function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
		</AuthProvider>
	);
}

export default App;
