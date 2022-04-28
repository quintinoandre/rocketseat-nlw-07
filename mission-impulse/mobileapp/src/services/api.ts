import axios from 'axios';

import { REACT_APP_API_URL as API_URL } from '@env';

const api = axios.create({ baseURL: API_URL });

export { api };
