import React, { RefObject } from 'react';
import {
    Modal,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import Close from '../assets/Close.svg'; 
import styles from '../styles';

interface Props {
    visible: boolean;
    onClose: () => void;
    bairro: string;
    rua: string;
    numero: string;
    estadoSelecionadoNome?: string;
    onChangeBairro: (text: string) => void;
    onChangeRua: (text: string) => void;
    onChangeNumero: (text: string) => void;
    onOpenDropdown: () => void;
    onSalvar: () => void;
    dropdownButtonRef: RefObject<View | null>;
}

export default function ModalNovoEndereco({
    visible,
    onClose,
    bairro,
    rua,
    numero,
    estadoSelecionadoNome,
    onChangeBairro,
    onChangeRua,
    onChangeNumero,
    onOpenDropdown,
    onSalvar,
    dropdownButtonRef,
}: Props) {
    return (
        <Modal visible={visible} transparent animationType='fade'>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior='padding' style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Close width={20} height={20} />
                        </TouchableOpacity>

                        <Text style={styles.modalTitle}>Criando Novo Endereço</Text>
                        
                        <Text>Bairro:</Text>
                        <TextInput
                            placeholder='Seu bairro'
                            style={styles.input}
                            value={bairro}
                            onChangeText={onChangeBairro}
                        />
                        
                        <Text>Nome da Rua:</Text>
                        <View style={styles.row}>
                            <TextInput
                                placeholder='Sua rua'
                                style={[styles.input, { flex: 2 }]}
                                value={rua}
                                onChangeText={onChangeRua}
                            />

                            <Text>Número:</Text>
                            <TextInput
                                placeholder='XXX'
                                style={[styles.input, { flex: 1, marginLeft: 10 }]}
                                value={numero}
                                onChangeText={onChangeNumero}
                                keyboardType='numeric'
                            />
                        </View>

                        <TouchableOpacity
                            ref={dropdownButtonRef}
                            style={styles.dropdownButton}
                            onPress={onOpenDropdown}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.dropdownText}>
                                {estadoSelecionadoNome || 'Estado'}
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.salvarButton} onPress={onSalvar}>
                            <Text style={styles.salvarButtonText}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </Modal>
    );
}
