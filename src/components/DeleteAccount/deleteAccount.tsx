import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import Alert from '../../assets/profile/Alert.svg';

interface DeleteAccountModalProps {
    visible: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

export const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({ visible, onCancel, onConfirm,
}) => {
    return (
        <Modal
            transparent
            animationType="fade"
            visible={visible}
            onRequestClose={onCancel}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <View style={styles.iconWrapper}>
                            <Alert width={50} height={50} />
                        </View>

                        <View>
                            <Text style={styles.title}>
                                Tem certeza de que deseja excluir sua conta?
                            </Text>

                            <Text style={styles.description}>
                                Esta ação é permanente e todos os seus dados serão apagados.
                                Esta operação não pode ser desfeita.
                            </Text>
                        </View>

                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.cancelText}>Não</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                            <Text style={styles.confirmText}>Sim</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        </Modal>
    );
};
