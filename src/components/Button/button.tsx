import React from "react";
import {
    TouchableOpacityProps,
    TouchableOpacity,
    ActivityIndicator,
    Text,
    ViewStyle,
    StyleProp,
    DimensionValue
} from 'react-native';
import { styles } from "./styles";

type Props = TouchableOpacityProps & {
    text: string;
    loading?: boolean;
    height?: DimensionValue;
    width?: DimensionValue;
    style?: StyleProp<ViewStyle>;
};

export function Button({ text, loading, height = 45, width = '100%', style, ...rest }: Props) {
    return (
        <TouchableOpacity
            style={[styles.button, { height, width }, style]}
            {...rest}
            activeOpacity={0.6}
        >
            {loading ? (
                <ActivityIndicator />
            ) : (
                <Text style={styles.textButton}>{text}</Text>
            )}
        </TouchableOpacity>
    );
};
