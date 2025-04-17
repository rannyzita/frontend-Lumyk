import React, { useState, forwardRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import {
    View,
    TextInput,
    Text,
    TextInputProps,
    TouchableOpacity,
    StyleProp,
    TextStyle
} from 'react-native';

import { themes } from "../../global/themes";
import { styles } from "./styles";

type IconComponent = typeof FontAwesomeIcon;

type Props = TextInputProps & {
    IconLeft?: IconComponent;
    IconRight?: IconComponent;
    IconLeftName?: string;
    iconRightName?: string;
    title?: string;
    onIconLeftPress?: () => void;
    onIconRightPress?: () => void;
    height?: number;
    width?: number | string;
    labelStyle?: StyleProp<TextStyle>;
};

export const Input = forwardRef((props: Props, ref) => {
    const {
        IconLeft,
        IconRight,
        IconLeftName,
        iconRightName,
        title,
        onIconLeftPress,
        onIconRightPress,
        labelStyle,
        height = 48,
        width = '100%',
        secureTextEntry,
        ...rest
    } = props;

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <>
            {title && <Text style={[styles.textInput, labelStyle]}>{title}</Text>}
            <View style={[styles.boxInput, { height, width }]}>
                <TextInput
                    style={[styles.input, { flex: 1 }]}
                    secureTextEntry={secureTextEntry && isPasswordVisible}
                    {...rest}
                />

                {secureTextEntry && (
                    <TouchableOpacity onPress={togglePasswordVisibility} style={styles.button}>
                        <FontAwesomeIcon
                            icon={isPasswordVisible ? faEyeSlash : faEye}
                            size={20}
                            color={themes.colors.textPlaceHolder}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </>
    );
});
