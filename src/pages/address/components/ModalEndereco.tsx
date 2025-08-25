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
import { themes } from '../../../global/themes';

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
    dropdownVisible: boolean;
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
    modoEdicao,
    dropdownVisible
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
                        
                        <View style={styles.row}>
                            <View style={{ flex: 2, marginRight: 8 }}>
                                <Text style={styles.titleBox}>Nome da Rua:</Text>
                                <TextInput 
                                    placeholderTextColor={themes.colors.purpleDark}
                                    placeholder='Sua rua'
                                    style={styles.input}
                                    value={rua}
                                    onChangeText={onChangeRua}
                                />
                            </View>

                            <View style={{ flex: 1 }}>
                                <Text style={styles.titleBox}>Número:</Text>
                                <TextInput
                                    placeholderTextColor={themes.colors.purpleDark}
                                    placeholder='XXX'
                                    style={{...styles.input, width: '75%'}}
                                    value={numero}
                                    onChangeText={onChangeNumero}
                                    keyboardType='numeric'
                                />
                            </View>
                        </View>

                        <Text style={styles.titleBox}>Bairro:</Text>
                        <TextInput
                            placeholderTextColor={themes.colors.purpleDark}
                            placeholder='Seu bairro'
                            style={{...styles.input, width: '50%'}}
                            value={bairro}
                            onChangeText={onChangeBairro}
                        />

                        <Text style={{...styles.titleBox, marginTop: 12}}>Selecione o estado:</Text>
                        <TouchableOpacity
                            ref={dropdownButtonRef}
                            style={{...styles.dropdownButton, width: '50%'}}
                            onPress={onOpenDropdown}
                            activeOpacity={0.8}
                        >
                            <View style={stylesDropDown.buttonContent}>
                                <Text style={stylesDropDown.dropdownButtonText}>
                                    {estadoSelecionadoNome || 'Estado'}
                                </Text>

                                {/* Ícone que gira */}
                                <ArrowDown
                                    width={16}
                                    height={16}
                                    style={{
                                        transform: [{ rotate: dropdownVisible ? '180deg' : '0deg' }],
                                    }}
                                />
                            </View>
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
