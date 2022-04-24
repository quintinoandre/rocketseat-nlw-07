import { Router } from 'express';

import {
	CreateMessageController,
	GetLastThreeMessagesController,
} from '@controllers';
import { EnsureAuthenticatedMiddleware } from '@middlewares';

const MessagesRouter = Router();

MessagesRouter.post(
	'/',
	EnsureAuthenticatedMiddleware,
	new CreateMessageController().handle
);
MessagesRouter.get('/lastthree', new GetLastThreeMessagesController().handle);

export { MessagesRouter };
