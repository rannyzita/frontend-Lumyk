import React, { useState, forwardRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';  // Importação dos ícones com o prefixo fa
import { View, TextInput, Text, TextInputProps, TouchableOpacity, StyleProp, TextStyle } from 'react-native';

import { themes } from "../../global/themes";
import { styles } from "./styles";

type IconComponent =
    | typeof FontAwesomeIcon;

type Props = TextInputProps & {
    IconLeft?: IconComponent;
    IconRight?: IconComponent;
    IconLeftName?: string;
    iconRightName?: string;
    title?: string;
    onIconLeftPress?: () => void;
    onIconRightPress?: () => void;
    height?: number;
    labelStyle?: StyleProp<TextStyle>;
    width?: number | string;
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
        height,
        ...rest
    } = props;

    const [isPasswordVisible, setIsPasswordVisible] = useState(false); 

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const calculateSizeWidth = () => {
        if (IconLeft && IconRight) return '80%';
        if (IconLeft || IconRight) return '90%';
        return '100%';
    };

    const calculatePaddingLeft = () => {
        if (IconLeft && IconRight) return 0;
        if (IconLeft || IconRight) return 10;
        return 20;
    };

    return (
        <>
        {title && <Text style={[styles.textInput, labelStyle]}>{title}</Text>}
        <View style={[styles.boxInput, { paddingLeft: calculatePaddingLeft(), height: height || 40 }]}>
            {IconLeft && IconLeftName && (
            <TouchableOpacity onPress={onIconLeftPress} style={styles.button}>
                <IconLeft name={IconLeftName as any} size={20} color={themes.colors.gray} style={styles.icon} />
            </TouchableOpacity>
            )}

            <TextInput
                ref={ref}
                style={[styles.input, { width: calculateSizeWidth(), height: '100%' }]}
                secureTextEntry={!isPasswordVisible} // Muda entre senha oculta e visível
                {...rest}
            />

            {/* Ícone de olho, alternando entre aberto e fechado */}
            <TouchableOpacity onPress={togglePasswordVisibility} style={styles.button}>
                <FontAwesomeIcon
                    icon={isPasswordVisible ? faEyeSlash : faEye}  // Alterna entre faEye e faEyeSlash
                    size={20}
                    color={themes.colors.gray}
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>
        </>
    );
});
