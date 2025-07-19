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
import ArrowDown from '../assets/ArrowDown.svg';

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
    modoEdicao: boolean;
}

export default function ModalEndereco({
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
    modoEdicao
}: Props) {

    
    return (
        <Modal visible={visible} transparent animationType='fade'>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior='padding' style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                            <Close width={20} height={20} />
                        </TouchableOpacity>

                        <Text style={styles.modalTitle}>
                            {modoEdicao ? 'Editando Endereço' : 'Criando Novo Endereço'}
                        </Text>
                        
                        <Text>Bairro:</Text>
                        <TextInput
                            placeholder='Seu bairro'
                            style={styles.input}
                            value={bairro}
                            onChangeText={onChangeBairro}
                        />
                        
                        <View style={styles.row}>
                            <View style={{ flex: 2, marginRight: 8 }}>
                                <Text>Nome da Rua:</Text>
                                <TextInput
                                    placeholder='Sua rua'
                                    style={styles.input}
                                    value={rua}
                                    onChangeText={onChangeRua}
                                />
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text>Número:</Text>
                                <TextInput
                                    placeholder='XXX'
                                    style={styles.input}
                                    value={numero}
                                    onChangeText={onChangeNumero}
                                    keyboardType='numeric'
                                />
                            </View>
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
