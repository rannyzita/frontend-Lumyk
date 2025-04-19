import React from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    ViewStyle,
    TextStyle
} from 'react-native';
import CustomCheckbox from '../CustomCheckBox/checkBox';
import { styles as stylesModal } from './styles';

interface DropdownFilterProps {
    isVisible: boolean;
    buttonWidth: number;
    items: string[];
    selectedItems: string[];
    onToggleItem: (item: string) => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export default function DropdownFilter({
    isVisible,
    buttonWidth,
    items,
    selectedItems,
    onToggleItem,
    style,
    textStyle
}: DropdownFilterProps) {
    if (!isVisible) return null;

    return (
        <View style={[stylesModal.dropdownContent, { width: buttonWidth }, style]}>
            <FlatList
                data={items}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={stylesModal.dropdownItem}
                        onPress={() => onToggleItem(item)}
                    >
                        <Text style={[stylesModal.dropdownItemText, textStyle]}>{item}</Text>
                        <CustomCheckbox
                            checked={selectedItems.includes(item)}
                            onPress={() => onToggleItem(item)}
                        />
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
