import { useContext } from 'react';

import styles from './App.module.scss';
import { LoginBox, MessageList, SendMessageForm } from './components';
import { AuthContext } from './contexts';

function App() {
	const { user } = useContext(AuthContext);

	return (
		<main
			className={`${styles.contentWrapper} ${user ? styles.contentSigned : ''}`}
		>
			<MessageList />
			{user ? <SendMessageForm /> : <LoginBox />}
		</main>
	);
}

export { App };
