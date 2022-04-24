import { Router } from 'express';

import { GetProfileUserController } from '../controllers';
import { EnsureAuthenticatedMiddleware } from '../middlewares';

const ProfileRouter = Router();

ProfileRouter.get(
	'/',
	EnsureAuthenticatedMiddleware,
	new GetProfileUserController().handle
);

export { ProfileRouter };
