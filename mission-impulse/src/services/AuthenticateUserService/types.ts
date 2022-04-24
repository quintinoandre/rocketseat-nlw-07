interface IAccessTokenResponse {
	access_token: string;
}

interface IUserResponse {
	id: number;
	avatar_url: string;
	login: string;
	name: string;
}

export { IAccessTokenResponse, IUserResponse };
