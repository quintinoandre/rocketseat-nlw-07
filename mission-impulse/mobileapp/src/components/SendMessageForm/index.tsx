import React, { useState } from 'react';
import { View, TextInput, Keyboard, Alert } from 'react-native';

import { api } from '../../services';
import { ENUM_COLORS } from '../../theme';
import { Button } from '../Button';
import { styles } from './styles';

function SendMessageForm() {
	const [message, setMessage] = useState('');
	const [sendingMessage, setSendingMessage] = useState(false);

	async function handleMessageSubmit() {
		const messageFormatted = message.trim();

		if (messageFormatted.length < 1)
			return Alert.alert('Write the message to send.');

		setSendingMessage(true);

		await api.post('/messages', { message: messageFormatted });

		setMessage('');

		Keyboard.dismiss();

		setSendingMessage(false);

		Alert.alert('Message sent successfully.');
	}

	return (
		<View style={styles.container}>
			<TextInput
				keyboardAppearance="dark"
				placeholder="What is your expectation for the event"
				placeholderTextColor={ENUM_COLORS.GRAY_PRIMARY}
				multiline
				maxLength={140}
				style={styles.input}
				value={message}
				editable={!sendingMessage}
				onChangeText={setMessage}
			/>
			<Button
				title="SEND MESSAGE"
				backgroundColor={ENUM_COLORS.PINK}
				color={ENUM_COLORS.WHITE}
				isLoading={sendingMessage}
				onPress={handleMessageSubmit}
			/>
		</View>
	);
}

export { SendMessageForm };
