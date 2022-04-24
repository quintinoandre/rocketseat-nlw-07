import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import http from 'http';
import morgan from 'morgan';
import { Server } from 'socket.io';

import {
	AuthenticateRouter,
	GitHubRouter,
	MessagesRouter,
	ProfileRouter,
	SignInRouter,
} from '@routers';

const app = express();

app.use(helmet());

app.use(express.json());

app.use(morgan('dev'));

app.use(cors());

const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
	cors: {
		origin: '*',
	},
});

io.on('connection', (socket) => {
	console.log(`User connected to socket ${socket.id}`);
});

app.use('/github', GitHubRouter);
app.use('/signin', SignInRouter);
app.use('/authenticate', AuthenticateRouter);
app.use('/messages', MessagesRouter);
app.use('/profile', ProfileRouter);

export { serverHttp, io };
