import { StyleSheet } from 'react-native';

import { ENUM_COLORS, ENUM_FONTS } from '../../theme';

const styles = StyleSheet.create({
	container: { width: '100%', marginBottom: 36 },
	message: {
		fontSize: 15,
		fontFamily: ENUM_FONTS.REGULAR,
		color: ENUM_COLORS.WHITE,
		lineHeight: 20,
		marginBottom: 12,
	},
	footer: { width: '100%', flexDirection: 'row', alignItems: 'center' },
	userName: {
		fontSize: 15,
		fontFamily: ENUM_FONTS.REGULAR,
		color: ENUM_COLORS.WHITE,
		marginLeft: 16,
	},
});

export { styles };
