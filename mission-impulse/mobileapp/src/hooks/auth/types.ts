import { ReactNode } from 'react';

type TUser = {
	id: string;
	avatar_url: string;
	name: string;
	login: string;
};

type TAuthContextData = {
	user: TUser | null;
	isSigningIn: boolean;
	signIn: () => Promise<void>;
	signOut: () => Promise<void>;
};

type TAuthProviderProps = {
	children: ReactNode;
};

type TAuthResponse = {
	token: string;
	user: TUser;
};

type TAuthorizationResponse = {
	params: {
		code?: string;
		error?: string;
	};
	type?: string;
};

export type {
	TUser,
	TAuthContextData,
	TAuthProviderProps,
	TAuthResponse,
	TAuthorizationResponse,
};
