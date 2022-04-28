import { StyleSheet } from 'react-native';

import { ENUM_COLORS, ENUM_FONTS } from '../../theme';

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20,
	},
	logoutButton: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	logoutText: {
		fontSize: 15,
		fontFamily: ENUM_FONTS.REGULAR,
		color: ENUM_COLORS.WHITE,
		marginRight: 20,
	},
});

export { styles };
