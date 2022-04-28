import * as AuthSessions from 'expo-auth-session';
import React, { createContext, useContext, useState, useEffect } from 'react';

import {
	REACT_APP_GITHUB_CLIENT_ID as CLIENT_ID,
	REACT_APP_GITHUB_SCOPE as SCOPE,
	REACT_APP_SIGN_IN_URL as SIGN_IN_URL,
} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { api } from '../../services';
import {
	TAuthContextData,
	TAuthorizationResponse,
	TAuthProviderProps,
	TAuthResponse,
	TUser,
} from './types';

const USER_STORAGE = '@nlwheat:user';
const TOKEN_STORAGE = '@nlwheat:token';

const AuthContext = createContext({} as TAuthContextData);

function AuthProvider({ children }: TAuthProviderProps) {
	const [isSigningIn, setIsSigningIn] = useState(true);
	const [userState, setUserState] = useState<TUser | null>(null);

	async function signIn() {
		try {
			setIsSigningIn(true);

			const authUrl = `${SIGN_IN_URL}${CLIENT_ID}${SCOPE}`;

			const authSessionResponse = (await AuthSessions.startAsync({
				authUrl,
			})) as TAuthorizationResponse;

			if (
				authSessionResponse.type === 'success' &&
				authSessionResponse.params.error !== 'access_denied'
			) {
				const authResponse = await api.post<TAuthResponse>('authenticate', {
					code: authSessionResponse.params.code,
				});

				const { user, token } = authResponse.data;

				api.defaults.headers.common.Authorization = `Bearer ${token}`;

				await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
				await AsyncStorage.setItem(TOKEN_STORAGE, token);

				setUserState(user);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setIsSigningIn(false);
		}
	}

	async function signOut() {
		setUserState(null);

		await AsyncStorage.removeItem(USER_STORAGE);
		await AsyncStorage.removeItem(TOKEN_STORAGE);
	}

	useEffect(() => {
		(async function loadUserStorageData() {
			const userStorage = await AsyncStorage.getItem(USER_STORAGE);
			const tokenStorage = await AsyncStorage.getItem(TOKEN_STORAGE);

			if (userStorage && tokenStorage) {
				api.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;

				setUserState(JSON.parse(userStorage));
			}

			setIsSigningIn(false);
		})();
	}, []);

	return (
		<AuthContext.Provider
			value={{ signIn, signOut, user: userState, isSigningIn }}
		>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);

	return context;
}

export { AuthProvider, useAuth };
