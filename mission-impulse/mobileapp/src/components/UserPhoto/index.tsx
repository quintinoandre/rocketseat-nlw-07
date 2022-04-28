import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image } from 'react-native';

import { avatarImg } from '../../assets';
import { ENUM_COLORS } from '../../theme';
import { styles } from './styles';
import { TProps } from './types';

const ENUM_SIZES = Object.freeze({
	SMALL: { containerSize: 32, avatarSize: 28 },
	NORMAL: { containerSize: 48, avatarSize: 42 },
});

const AVATAR_DEFAULT = Image.resolveAssetSource(avatarImg).uri;

function UserPhoto({ imageUri, sizes = 'NORMAL' }: TProps) {
	const { containerSize, avatarSize } = ENUM_SIZES[sizes];

	return (
		<LinearGradient
			style={[
				styles.container,
				{
					width: containerSize,
					height: containerSize,
					borderRadius: containerSize / 2,
				},
			]}
			colors={[ENUM_COLORS.PINK, ENUM_COLORS.YELLOW]}
			start={{ x: 0, y: 0.8 }}
			end={{ x: 0.9, y: 1 }}
		>
			<Image
				source={{ uri: imageUri || AVATAR_DEFAULT }}
				style={[
					styles.avatar,
					{
						width: avatarSize,
						height: avatarSize,
						borderRadius: avatarSize / 2,
					},
				]}
			/>
		</LinearGradient>
	);
}

export { UserPhoto };
