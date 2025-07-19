import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/types/navigation";
import { StackScreenProps } from "@react-navigation/stack";
import styles from "./styles";
import NavigationHeader from "../../components/NavigationHeader/navigationHeader";
import { Button } from "../../components/Button/button";
import ModalFeedback from "../../components/feedbackButton/feedbackButton";

type Props = StackScreenProps<RootStackParamList>;

const EmailVerification: React.FC<Props> = () => {
    const route = useRoute();
    const { type = 'cadastro', email = '*********@gmail.com' } = route.params || {};

    const titulo = type === 'login' ? 'Autenticar E-mail' : 'Verificar E-mail';
    const descricao = type === 'login'
        ? `Para concluir o login, insira o código que enviamos ao e-mail ${email}. Isso ajuda a proteger sua conta e confirmar que é você mesmo tentando acessar.`
        : `Para finalizar o cadastro, insira o código que enviamos ao e-mail ${email}. Isso garante que o e-mail realmente pertence a você e ativa sua conta com segurança.`;

    const [codigo, setCodigo] = useState("");
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleValidarCodigo = () => {
        // Substituir com lógica real
        if (codigo === "123456") {
        Alert.alert("Sucesso", "Código verificado com sucesso!");
        } else {
        Alert.alert("Erro", "Código inválido.");
        }
    };

    const handleEnviarCodigo = () => {
        // Substituir com lógica real de envio
        setShowSuccessModal(true);
    };

    const handleConfirmar = () => {

        if (!codigo.trim()) {
            Alert.alert("Erro", "O campo de código é obrigatório.");
            return;
        }

        setLoading(true);

        // Simular envio de código
        setTimeout(() => {
            setLoading(false);
            setShowSuccessModal(true);
            setCodigo(""); // Limpar o campo após o envio
        }, 2000); // Simula um atraso de 2 segundos para o envio
    };


    return (
        <View style={styles.container}>
            <NavigationHeader />
            <Text style={styles.title}>{titulo}</Text>
            <Text style={styles.description}>{descricao}</Text>

            <TextInput
                style={styles.input}
                placeholder="Digite o código"
                keyboardType="numeric"
                maxLength={6}
                value={codigo}
                onChangeText={setCodigo}
            />

            <TouchableOpacity style={{ marginTop: 10 }}>
                <Button
                    text={loading ? 'Enviando código...' : 'Reenviar Código'}
                    width={320}
                    height={38}
                    onPress={handleEnviarCodigo}
                    disabled={loading}
                />
            </TouchableOpacity>

            <View style={{ marginTop: 50, flexDirection: 'row' }}>
                <Button
                    text="Confirmar"
                    width={110}
                    height={40}
                    onPress={handleConfirmar}
                    style={{ marginLeft: 207 }}
                />
            </View>

            {showSuccessModal && (
                <ModalFeedback
                    title="Código reenviado com sucesso!"
                    closeModal={() => setShowSuccessModal(false)}
                />
            )}
        </View>
    );
};

export default EmailVerification;
