import React from 'react';
import {
    View,
    FlatList,
    TouchableOpacity,
    Text,
    ViewStyle,
    TextStyle,
} from 'react-native';
import CustomCheckbox from '../CustomCheckBox/checkBox';
import { stylesDropDown } from './styles'; // importa normalmente agora

interface DropdownFilterProps {
    isVisible: boolean;
    buttonWidth: number;
    items: string[];
    selectedItems: string[];
    onToggleItem: (item: string) => void;
    placeholder?: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
    scrollable?: boolean;
};

export default function DropdownFilter({
    isVisible,
    buttonWidth,
    items,
    selectedItems,
    onToggleItem,
    placeholder,
    style,
    textStyle,
    scrollable = false,
}: DropdownFilterProps) {
    if (!isVisible) return null;

    return (
        <View style={[stylesDropDown.dropdownContent, { width: buttonWidth }, style]}>
            {selectedItems.length === 0 && placeholder && (
                <Text style={[stylesDropDown.placeholderText, textStyle]}>{placeholder}</Text>
            )}

            <FlatList
                data={items}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={stylesDropDown.dropdownItem}
                        onPress={() => onToggleItem(item)}
                    >
                        <Text style={[stylesDropDown.dropdownItemText, textStyle]}>{item}</Text>
                        <CustomCheckbox
                            checked={selectedItems.includes(item)}
                            onPress={() => onToggleItem(item)}
                        />
                    </TouchableOpacity>
                )}
                scrollEnabled={scrollable}
                style={scrollable ? stylesDropDown.scrollableList : undefined}
            />
        </View>
    );
};
