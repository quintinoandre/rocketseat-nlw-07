import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { ENUM_COLORS } from '../../theme';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: ENUM_COLORS.BLACK_SECONDARY,
		paddingTop: getStatusBarHeight() + 17,
	},
});

export { styles };
