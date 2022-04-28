import { View, KeyboardAvoidingView, Platform } from 'react-native';

import { Header, MessageList, SignInBox } from '../../components';
import { SendMessageForm } from '../../components/SendMessageForm';
import { useAuth } from '../../hooks';
import { styles } from './styles';

function Home() {
	const { user } = useAuth();

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.OS === 'ios' ? 'padding' : undefined}
		>
			<View style={styles.container}>
				<Header />
				<MessageList />
				{user ? <SendMessageForm /> : <SignInBox />}
			</View>
		</KeyboardAvoidingView>
	);
}

export { Home };
