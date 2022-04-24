import { Request, Response } from 'express';

import { CreateMessageService } from '../services';

class CreateMessageController {
	async handle({ body: { message }, user_id }: Request, response: Response) {
		const service = new CreateMessageService();

		try {
			const result = await service.execute(message, user_id);

			return response.json(result);
		} catch (err) {
			return response.json({ error: err.message });
		}
	}
}

export { CreateMessageController };
