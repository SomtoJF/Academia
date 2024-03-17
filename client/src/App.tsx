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
import Account from "./pages/components/Account";
import Schedule from "./pages/components/Schedule";
import CreateExam from "./pages/components/CreateExam";
import ErrorPage from "./pages/components/ErrorPage";
import FAQs from "./pages/components/FAQs";
import Exam from "./pages/components/Exam";

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
		errorElement: <ErrorPage />,
		children: [
			{ path: "dashboard", element: <Dashboard /> },
			{ path: "account", element: <Account /> },
			{ path: "schedule", element: <Schedule /> },
			{ path: "exam", element: <Exam /> },
			{
				path: "create/exam",
				element: <CreateExam />,
				errorElement: <ErrorPage />,
			},
			{ path: "faqs", element: <FAQs /> },
		],
	},
	{ path: "/signup", element: <Signup /> },
]);

const client = new ApolloClient({
	uri: import.meta.env.VITE_REACT_APP_BACKEND_URL,
	cache: new InMemoryCache(),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</ApolloProvider>
	);
}

export default App;
