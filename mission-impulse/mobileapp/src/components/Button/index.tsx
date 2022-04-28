import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import { styles } from './styles';
import { TProps } from './types';

function Button({
	title,
	color,
	backgroundColor,
	icon,
	isLoading = false,
	...rest
}: TProps) {
	return (
		<TouchableOpacity
			style={[styles.button, { backgroundColor }]}
			activeOpacity={0.7}
			disabled={isLoading}
			{...rest}
		>
			{isLoading ? (
				<ActivityIndicator color={color} />
			) : (
				<>
					<AntDesign name={icon} size={24} style={styles.icon} />
					<Text style={[styles.title, { color }]}>{title}</Text>
				</>
			)}
		</TouchableOpacity>
	);
}

export { Button };
