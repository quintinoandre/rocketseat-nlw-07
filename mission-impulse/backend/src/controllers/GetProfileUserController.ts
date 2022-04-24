import { Request, Response } from 'express';

import { GetProfileUserService } from '@services';

class GetProfileUserController {
	async handle({ user_id }: Request, response: Response) {
		const service = new GetProfileUserService();

		const result = await service.execute(user_id);

		return response.json(result);
	}
}

export { GetProfileUserController };
