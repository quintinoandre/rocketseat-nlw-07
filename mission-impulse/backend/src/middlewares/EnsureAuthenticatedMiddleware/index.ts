import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { IPayload } from './types';

function EnsureAuthenticatedMiddleware(
	request: Request,
	response: Response,
	next: NextFunction
) {
	const {
		headers: { authorization: authToken },
	} = request;

	if (!authToken) return response.status(401).json({ error: 'Token invalid' });

	const token = authToken.replace('Bearer ', '').trim();

	const {
		env: { JWT_SECRET },
	} = process;

	try {
		const { sub } = verify(token, JWT_SECRET) as IPayload;

		request.user_id = sub;

		return next();
	} catch (err) {
		return response.status(401).json({ error: 'Token expired' });
	}
}

export { EnsureAuthenticatedMiddleware };
