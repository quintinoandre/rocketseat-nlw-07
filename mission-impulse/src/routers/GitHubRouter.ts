import { Router } from 'express';

const GitHubRouter = Router();

const {
	env: { GITHUB_URL_GET_CLIENT_CODE, GITHUB_CLIENT_ID },
} = process;

GitHubRouter.get('/', (request, response) => {
	response.redirect(`${GITHUB_URL_GET_CLIENT_CODE}${GITHUB_CLIENT_ID}`);
});

export { GitHubRouter };
