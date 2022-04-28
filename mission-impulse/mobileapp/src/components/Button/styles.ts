import { StyleSheet } from 'react-native';

import { ENUM_FONTS } from '../../theme';

const styles = StyleSheet.create({
	button: {
		height: 48,
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		fontSize: 14,
		fontFamily: ENUM_FONTS.BOLD,
	},
	icon: { marginRight: 12 },
});

export { styles };
