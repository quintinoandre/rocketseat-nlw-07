import { createContext, useEffect, useState } from 'react';

import { api } from '../../services/api';
import { TAuthContextData, TAuthProvider, TAuthResponse, TUser } from './types';

const AuthContext = createContext({} as TAuthContextData);

function AuthProvider({ ...props }: TAuthProvider) {
	const [userState, setUserState] = useState<TUser | null>(null);

	const signInUrl = `${import.meta.env.VITE_GITHUB_SIGN_IN_URL}${
		import.meta.env.VITE_GITHUB_CLIENT_ID
	}`;

	async function signIn(githubCode: string) {
		const response = await api.post<TAuthResponse>('authenticate', {
			code: githubCode,
		});

		const { token, user } = response.data;

		localStorage.setItem('@dowhile:token', token);

		api.defaults.headers.common.authorization = `Bearer ${token}`;

		setUserState(user);
	}

	function signOut() {
		setUserState(null);

		localStorage.removeItem('@dowhile:token');
	}

	useEffect(() => {
		const token = localStorage.getItem('@dowhile:token');

		if (token) {
			api.defaults.headers.common.authorization = `Bearer ${token}`;

			api.get<TUser>('profile').then((response) => setUserState(response.data));
		}
	}, []);

	useEffect(() => {
		const url = window.location.href;

		const hasGithubCode = url.includes('code=');

		if (hasGithubCode) {
			const [urlWithoutCode, githubCode] = url.split('?code=');

			window.history.pushState({}, '', urlWithoutCode);

			signIn(githubCode);
		}
	}, []);

	return (
		// eslint-disable-next-line react/jsx-no-constructed-context-values
		<AuthContext.Provider value={{ signInUrl, user: userState, signOut }}>
			{props.children}
		</AuthContext.Provider>
	);
}

export { AuthProvider, AuthContext };
