import { ComponentProps } from 'react';
import { ColorValue, TouchableOpacityProps } from 'react-native';

import { AntDesign } from '@expo/vector-icons';

type TProps = TouchableOpacityProps & {
	title: string;
	color: ColorValue;
	backgroundColor: ColorValue;
	icon?: ComponentProps<typeof AntDesign>['name'];
	isLoading?: boolean;
};

export { TProps };
