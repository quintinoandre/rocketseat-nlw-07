import { Router } from 'express';

const SignInRouter = Router();

SignInRouter.get('/callback', ({ query: { code } }, response) => {
	return response.json(code);
});

export { SignInRouter };
