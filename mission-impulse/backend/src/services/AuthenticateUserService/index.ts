import axios from 'axios';
import { sign } from 'jsonwebtoken';

import { prismaClient } from '@prisma';

import { IAccessTokenResponse, IUserResponse } from './types';

class AuthenticateUserService {
	async execute(code: string) {
		const {
			env: {
				GITHUB_URL_GET_ACCESS_TOKEN,
				GITHUB_CLIENT_ID,
				GITHUB_CLIENT_SECRET,
				GITHUB_URL_GET_USER_DATA,
				JWT_SECRET,
				JWT_EXPIRES,
			},
		} = process;

		const { data: accessTokenResponse } =
			await axios.post<IAccessTokenResponse>(
				GITHUB_URL_GET_ACCESS_TOKEN,
				{},
				{
					params: {
						client_id: GITHUB_CLIENT_ID,
						client_secret: GITHUB_CLIENT_SECRET,
						code,
					},
					headers: { 'Accept': 'application/json' },
				}
			);

		const response = await axios.get<IUserResponse>(GITHUB_URL_GET_USER_DATA, {
			headers: {
				authorization: `Bearer ${accessTokenResponse.access_token}`,
			},
		});

		const { login, id, avatar_url, name } = response.data;

		let user = await prismaClient.user.findFirst({
			where: { github_id: id },
		});

		if (!user)
			user = await prismaClient.user.create({
				data: { github_id: id, login, avatar_url, name },
			});

		const token = sign(
			{ user: { mame: user.name, avatar_url: user.avatar_url, id: user.id } },
			JWT_SECRET,
			{ subject: user.id, expiresIn: JWT_EXPIRES }
		);

		return { token, user };
	}
}

export { AuthenticateUserService };
