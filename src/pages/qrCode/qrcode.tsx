import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import * as Clipboard from 'expo-clipboard';

import NavigationHeader from "../../components/NavigationHeader/navigationHeader";
import CopyIcon from './assets/iconCopy.svg';
import styles from './styles';

export default function QrCode() {
    const pixCode = "b6f8e2c1-1234-4f9a-b234-9a9c1df...";

    const handleCopy = async () => {
        await Clipboard.setStringAsync(pixCode);
        alert("Código Pix copiado!");
    };

    return (
        <View style={styles.container}>
            <NavigationHeader iconArrow={true} />
            <View style={styles.qrContainer}>
                <View style={styles.qrBox}>
                    <QRCode value={pixCode} size={180} />
                    <Text style={styles.qrText}>
                        Por favor, escaneie o QR Code ou copie o código abaixo para efetuar o pagamento.
                    </Text>
                    <View style={styles.codeRow}>
                        <Text style={styles.codeText} numberOfLines={1}>{pixCode}</Text>
                        <TouchableOpacity onPress={handleCopy}>
                            <CopyIcon width={24} height={24} />
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity style={styles.confirmButton}>
                    <Text style={styles.confirmText}>CONFIRMAR</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
