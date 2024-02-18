import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
} from "firebase/auth";
import firebase from "firebase/compat/app";

interface authContext {
	currentUser: any;
	signup: any;
	login: any;
	logout: any;
	resetPassword: any;
}

const AuthContext = createContext<authContext>({
	currentUser: null,
	signup: null,
	login: null,
	logout: null,
	resetPassword: null,
});

const useAuth = () => useContext(AuthContext);

function AuthProvider({ children }: any) {
	const [currentUser, setCurrentUser] = useState<firebase.User>();
	const signup = async (email: string, password: string) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			return user;
		} catch (error: any) {
			throw new Error(error.message);
		}
	};

	const login = async (email: string, password: string) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);
			const user = userCredential.user;
			return user;
		} catch (error: any) {
			alert(error.message);
			throw new Error(error.message);
		}
	};

	const logout = async () => {
		try {
			await auth.signOut();
		} catch (e: any) {
			alert(e.message);
			throw new Error(e.message);
		}
	};

	const resetPassword = async (email: string) => {
		return sendPasswordResetEmail(auth, email);
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user: any) => {
			setCurrentUser(user);
		});
		return unsubscribe;
	}, []);

	const value = {
		currentUser,
		signup,
		login,
		logout,
		resetPassword,
	};
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, useAuth };
