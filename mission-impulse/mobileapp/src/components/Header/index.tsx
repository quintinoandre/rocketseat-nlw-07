import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { LogoSvg } from '../../assets';
import { useAuth } from '../../hooks';
import { UserPhoto } from '../UserPhoto';
import { styles } from './styles';

function Header() {
	const { user, signOut } = useAuth();

	return (
		<View style={styles.container}>
			<LogoSvg />
			<View style={styles.logoutButton}>
				{user ? (
					<TouchableOpacity onPress={signOut}>
						<Text style={styles.logoutText}>Exit</Text>
					</TouchableOpacity>
				) : (
					<></>
				)}
				<UserPhoto imageUri={user?.avatar_url} />
			</View>
		</View>
	);
}

export { Header };
