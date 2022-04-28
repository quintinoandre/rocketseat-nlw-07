import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import { ENUM_COLORS } from '../../theme';

const styles = StyleSheet.create({
	container: {
		width: '100%',
		height: 184,
		backgroundColor: ENUM_COLORS.BLACK_TERTIARY,
		paddingBottom: getBottomSpace() + 16,
		paddingTop: 16,
		paddingHorizontal: 24,
	},
	input: {
		width: '100%',
		height: 88,
		textAlignVertical: 'top',
		color: ENUM_COLORS.WHITE,
	},
});

export { styles };
