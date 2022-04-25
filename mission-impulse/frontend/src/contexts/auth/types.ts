import { ReactNode } from 'react';

type TUser = {
	id: string;
	name: string;
	login: string;
	avatar_url: string;
};

type TAuthContextData = {
	user: TUser | null;
	signInUrl: string;
	signOut: () => void;
};

type TAuthProvider = {
	children: ReactNode;
};

type TAuthResponse = {
	token: string;
	user: {
		id: string;
		avatar_url: string;
		name: string;
		login: string;
	};
};

export type { TUser, TAuthContextData, TAuthProvider, TAuthResponse };
