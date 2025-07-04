import React from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Modal,
    ActivityIndicator,
    TouchableWithoutFeedback,
} from 'react-native';
import styles from '../styles';
import { themes } from '../../../global/themes';

interface Estado {
    id: string;
    nome: string;
}

interface Props {
    visible: boolean;
    onClose: () => void;
    estados: Estado[];
    loading: boolean;
    search: string;
    onChangeSearch: (text: string) => void;
    estadoSelecionado: Estado | null;
    onSelecionar: (estado: Estado) => void;
    position: { top: number; left: number; width: number };
}

export default function DropdownEstados({
    visible,
    onClose,
    estados,
    loading,
    search,
    onChangeSearch,
    estadoSelecionado,
    onSelecionar,
    position,
}: Props) {
    return (
        <Modal visible={visible} transparent animationType='fade'>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.dropdownModalOverlay}>
                    <View
                        style={[
                            styles.dropdownModalContent,
                            {
                                top: position.top,
                                left: position.left,
                                width: position.width,
                            },
                        ]}
                    >
                        <View style={{ alignItems: 'flex-end' }}>
                            <TouchableOpacity onPress={onClose}>
                                <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold', marginBottom: 5 }}>X</Text>
                            </TouchableOpacity>
                        </View>

                        {loading ? (
                            <ActivityIndicator color={themes.colors.primary} />
                        ) : (
                        <>
                            <TextInput
                                style={styles.dropdownSearchInput}
                                placeholder='UF de envio...'
                                placeholderTextColor={themes.colors.textInput}
                                value={search}
                                onChangeText={onChangeSearch}
                                autoFocus
                            />
                            <FlatList
                                data={estados.filter((e) =>
                                    e.nome.toLowerCase().includes(search.toLowerCase())
                                )}
                                keyExtractor={(item) => item.id}
                                keyboardShouldPersistTaps='handled'
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => onSelecionar(item)}
                                        style={styles.dropdownItem}
                                    >
                                        <Text style={{ flex: 1 }}>{item.nome}</Text>
                                        <View style={styles.checkbox}>
                                            {estadoSelecionado?.id === item.id && <View style={styles.checkboxSelectedInner} />}
                                        </View>
                                    </TouchableOpacity>
                                )}
                            />
                            <TouchableOpacity
                                style={[styles.salvarButton, { marginTop: 12 }]}
                                onPress={onClose}
                            >
                                <Text style={styles.salvarButtonText}>Selecionar</Text>
                            </TouchableOpacity>
                        </>
                        )}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
