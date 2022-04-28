import React from 'react';
import { View } from 'react-native';

import { useAuth } from '../../hooks/auth';
import { ENUM_COLORS } from '../../theme';
import { Button } from '../Button';
import { styles } from './styles';

function SignInBox() {
	const { signIn, isSigningIn } = useAuth();

	return (
		<View style={styles.container}>
			<Button
				title="ENTER WITH GITHUB"
				color={ENUM_COLORS.BLACK_PRIMARY}
				backgroundColor={ENUM_COLORS.YELLOW}
				icon="github"
				onPress={signIn}
				isLoading={isSigningIn}
			/>
		</View>
	);
}

export { SignInBox };
