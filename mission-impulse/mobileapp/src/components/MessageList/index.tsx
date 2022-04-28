import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { io } from 'socket.io-client';

import { api } from '../../services';
import { MESSAGES_EXAMPLE } from '../../utils';
import { Message } from '../Message';
import { TMessageProps } from '../Message/types';
import { styles } from './styles';

const messagesQueue: Array<TMessageProps> = MESSAGES_EXAMPLE;

const socket = io(String(api.defaults.baseURL));

socket.on('new_message', (newMessage) => messagesQueue.push(newMessage));

function MessageList() {
	const [currentMessages, setCurrentMessages] = useState<TMessageProps[]>([]);

	useEffect(() => {
		(async function fetchMessages() {
			const messagesResponse = await api.get<TMessageProps[]>(
				'messages/lastThree'
			);

			setCurrentMessages(messagesResponse.data);
		})();
	}, []);

	useEffect(() => {
		const timer = setInterval(() => {
			if (messagesQueue.length > 0) {
				setCurrentMessages((prevState) =>
					[messagesQueue[0], prevState[0], prevState[1]].filter(Boolean)
				);

				messagesQueue.shift();
			}
		}, 3000);

		return () => clearInterval(timer);
	}, []);

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.content}
			keyboardShouldPersistTaps="never"
		>
			{currentMessages.map((message) => (
				<Message key={`${message.id}${message.text}`} data={message} />
			))}
		</ScrollView>
	);
}

export { MessageList };
