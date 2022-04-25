/* eslint-disable jsx-a11y/label-has-associated-control */
import { useContext, useState, FormEvent } from 'react';
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc';

import { AuthContext } from '../../contexts';
import { api } from '../../services/api';
import styles from './styles.module.scss';

function SendMessageForm() {
	const { user, signOut } = useContext(AuthContext);

	const [message, setMessage] = useState('');

	async function handleSendMessage(event: FormEvent) {
		event.preventDefault();

		if (!message.trim()) return;

		await api.post('messages', { message });

		setMessage('');
	}

	return (
		<div className={styles.sendMessageFormWrapper}>
			<button type="button" className={styles.signOutButton} onClick={signOut}>
				<VscSignOut size={32} />
			</button>
			<header className={styles.userInformation}>
				<div className={styles.userImage}>
					<img src={user?.avatar_url} alt={user?.name} />
				</div>
				<strong className={styles.userName}>{user?.name}</strong>
				<span className={styles.userGithub}>
					<VscGithubInverted size={16} />
					{user?.login}
				</span>
			</header>
			<form
				className={styles.sendMessageForm}
				onSubmit={(event) => handleSendMessage(event)}
			>
				<label htmlFor="message">Message</label>
				<textarea
					name="message"
					id="message"
					placeholder="What is your expectation for the event?"
					onChange={({ target: { value } }) => setMessage(value)}
					value={message}
				/>
				<button type="submit">Send message</button>
			</form>
		</div>
	);
}

export { SendMessageForm };
