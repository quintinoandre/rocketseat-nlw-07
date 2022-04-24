import 'dotenv/config';

import { serverHttp } from './app';

const {
	env: { PORT },
} = process;

serverHttp.listen(PORT, () =>
	console.log(`🚀 Server is running on port ${PORT}`)
);
