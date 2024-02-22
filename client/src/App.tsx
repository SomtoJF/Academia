import "./App.sass";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/components/Home";
import Login from "./pages/components/Login";
import Signup from "./pages/components/Signup";
import HomeLayout from "./layouts/HomeLayout";
import { AuthProvider } from "./contexts/AuthContext";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import ProtectedLayout from "./layouts/ProtectedLayout";
import Dashboard from "./pages/components/Dashboard";

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
	{
		path: "/user/:id",
		element: <ProtectedLayout />,
		children: [{ path: "dashboard", element: <Dashboard /> }],
	},
	{ path: "/signup", element: <Signup /> },
]);

const client = new ApolloClient({
	uri: import.meta.env.VITE_REACT_APP_BACKEND_URL,
	cache: new InMemoryCache(),
});

function App() {
	return (
		<AuthProvider>
			<ApolloProvider client={client}>
				<RouterProvider router={router} />
			</ApolloProvider>
		</AuthProvider>
	);
}

export default App;
