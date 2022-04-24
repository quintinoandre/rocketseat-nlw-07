import { Request, Response } from 'express';

import { AuthenticateUserService } from '../services';

class AuthenticateUserController {
	async handle({ body: { code } }: Request, response: Response) {
		const service = new AuthenticateUserService();

		try {
			const result = await service.execute(code);

			return response.json(result);
		} catch (err) {
			return response.json({ error: err.message });
		}
	}
}

export { AuthenticateUserController };
