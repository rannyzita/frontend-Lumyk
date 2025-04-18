// components/DropdownFilter.tsx
import React from 'react';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    ViewStyle,
    FlatList,
    TextStyle
} from 'react-native';
import ArrowDownIcon from '../../assets/iconFilter.svg';
import CustomCheckbox from '../CustomCheckBox/checkBox';

interface DropdownFilterProps {
    title: string;
    isVisible: boolean;
    buttonWidth: number;
    items: string[];
    selectedItems: string[];
    onToggleItem: (item: string) => void;
    onPress: () => void;
    onLayout: (width: number) => void;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

export default function DropdownFilter({
    title,
    isVisible,
    buttonWidth,
    items,
    selectedItems,
    onToggleItem,
    onPress,
    onLayout,
    style,
    textStyle
    }: DropdownFilterProps) {
    return (
        <View style={{ alignItems: 'center' }}>
        <TouchableOpacity
            style={[styles.dropdownButton, style]}
            onPress={onPress}
            onLayout={(e) => onLayout(e.nativeEvent.layout.width)}
        >
            <View style={[styles.buttonContent]}>
            <Text style={[styles.dropdownButtonText, textStyle]}>{title}</Text>
            <ArrowDownIcon
                style={{
                marginLeft: 8,
                transform: [{ rotate: isVisible ? '180deg' : '0deg' }],
                }}
                width={14}
                height={14}
            />
            </View>
        </TouchableOpacity>

        {isVisible && (
            <View style={[styles.dropdownContent, { width: buttonWidth }]}>
            <FlatList
                data={items}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => onToggleItem(item)}
                >
                    <Text style={styles.dropdownItemText}>{item}</Text>
                    <CustomCheckbox
                    checked={selectedItems.includes(item)}
                    onPress={() => onToggleItem(item)}
                    />
                </TouchableOpacity>
                )}
            />
            </View>
        )}
        </View>
    );
    }

const styles = StyleSheet.create({
    dropdownButton: {
        backgroundColor: '#FFF',
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 4,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dropdownButtonText: {
        fontSize: 14,
        color: '#000',
    },
    dropdownContent: {
        marginTop: 4,
        backgroundColor: '#FFF',
        borderRadius: 4,
        paddingVertical: 4,
        maxHeight: 150,
    },
    dropdownItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 6,
        paddingHorizontal: 10,
    },
    dropdownItemText: {
        fontSize: 14,
        color: '#000',
    },
    });
