import { useEffect, useState } from 'react';
import io from 'socket.io-client';

import logoImg from '../../assets/logo.svg';
import { api } from '../../services/api';
import styles from './styles.module.scss';
import { TMessage } from './types';

const messagesQueue: Array<TMessage> = [];

const socket = io(import.meta.env.VITE_API_URL);

socket.on('new_message', (newMessage: TMessage) =>
	messagesQueue.push(newMessage)
);

function MessageList() {
	const [messages, setMessages] = useState<TMessage[]>([]);

	useEffect(() => {
		const timer = setInterval(() => {
			if (messagesQueue.length > 0) {
				setMessages((prevState) =>
					[messagesQueue[0], prevState[0], prevState[1]].filter(Boolean)
				);

				messagesQueue.shift();
			}
		}, 3000);

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		api
			.get<TMessage[]>('messages/lastThree')
			.then((response) => setMessages(response.data));
	}, []);

	return (
		<div className={styles.messageListWrapper}>
			<img src={logoImg} alt="DoWhile 2021" />
			<ul className={styles.messageList}>
				{messages.map((message) => {
					return (
						<li key={`${message.id}${message.text}`} className={styles.message}>
							<p className={styles.messageContent}>{message.text}</p>
							<div className={styles.messageUser}>
								<div className={styles.userImage}>
									<img src={message.user.avatar_url} alt={message.user.name} />
								</div>
								<span>{message.user.name}</span>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

export { MessageList };
