import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import QRCode from "react-native-qrcode-svg";
import * as Clipboard from 'expo-clipboard';

import NavigationHeader from "../../components/NavigationHeader/navigationHeader";
import CopyIcon from './assets/iconCopy.svg';
import styles from './styles';


import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import { useNavigation } from "@react-navigation/native";

import ModalFeedback from '../../components/feedbackButton/feedbackButton';

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function QrCode() {
    const pixCode = "b6f8e2c1-1234-4f9a-b234-9a9c1df...";
    const [showModal, setShowModal] = useState(false);
    const navigation = useNavigation<NavigationProps>();

    return (
        <View style={styles.container}>
            <NavigationHeader iconArrow={true} />
            <View style={styles.qrContainer}>
                <View style={styles.qrBox}>
                    <View style={styles.qrCode}>
                        <QRCode value={pixCode} size={180} />
                    </View>

                    <Text style={styles.qrText}>
                        Por favor, escaneie o QR Code ou copie o código abaixo para efetuar o pagamento.
                    </Text>
                    <View style={styles.codeRow}>
                        <Text style={styles.codeText} numberOfLines={1}>{pixCode}</Text>
                        <TouchableOpacity onPress={() => setShowModal(true)}>
                            <CopyIcon width={24} height={24} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.confirmButton} onPress={() => navigation.navigate('PaymentConcluded')}>
                    <Text style={styles.confirmText}>CONFIRMAR</Text>
                </TouchableOpacity>
            </View>

            {showModal && (
                <ModalFeedback
                    title='Código copiado com sucesso'
                    closeModal={() => setShowModal(false)}
                    style={{ marginRight: 15 }}
                />
            )}
        </View>
    );
}
