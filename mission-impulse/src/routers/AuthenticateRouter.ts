import { Router } from 'express';

import { AuthenticateUserController } from '../controllers';

const AuthenticateRouter = Router();

AuthenticateRouter.post('/', new AuthenticateUserController().handle);

export { AuthenticateRouter };
