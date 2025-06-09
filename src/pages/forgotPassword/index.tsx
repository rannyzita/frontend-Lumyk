import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import { themes } from '../../global/themes';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button/button';

import Logo from '../../assets/logo.svg';
import NavigationHeader from '../../components/NavigationHeader/navigationHeader';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import { useNavigation } from "@react-navigation/native";

import ModalFeedback from '../../components/feedbackButton/feedbackButton';

import api from '../../../API/index'; // Ajuste conforme seu projeto

type NavigationProps = StackNavigationProp<RootStackParamList>;

const RedefinirSenha = () => {
    const navigation = useNavigation<NavigationProps>();
    const [email, setEmail] = useState('');
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [emailError, setEmailError] = useState(''); // texto de erro

    const handleEnviarCodigo = async () => {
        if (!email.trim()) {
            setEmailError('O campo de e-mail é obrigatório.');
            return;
        }

        try {
            await api.post('/usuarios/recuperar_senha', { email });

            setShowSuccessModal(true);
            setTimeout(() => setShowSuccessModal(false), 10000);

            // Limpa erro se houver
            setEmailError('');
        } catch (error: any) {
            if (error.response && error.response.status === 404) {
                setEmailError('E-mail não encontrado.');
            } else {
                setEmailError('Erro ao enviar o código. Tente novamente.');
            }
        }
    };

    const handleConfirmar = () => {
        if (!email.trim()) {
            setEmailError('O campo de e-mail é obrigatório.');
            return;
        }
        setEmailError('');
        navigation.navigate('VerifyCode');
    };

    const handleEmailChange = (text: string) => {
        setEmail(text);
        if (emailError) setEmailError(''); // limpa o erro quando o usuário digitar algo novo
    };

    return (
        <View style={styles.container}>
            <NavigationHeader iconArrow={true} />

            <View style={styles.content}>
                <Logo style={{ marginBottom: 50 }} />
                <View style={styles.separatorContainer}>
                    <View style={styles.line} />
                </View>

                <Text style={styles.title}>Redefinir Senha</Text>
                <Text style={styles.subtitle}>
                    Para redefinir sua senha, informe o e-mail cadastrado na sua conta e lhe enviaremos um código.
                </Text>

                <View style={styles.separatorContainer}>
                    <View style={styles.line} />
                </View>

                <Text style={styles.label}>E-mail</Text>
                <Input
                    placeholder="Insira seu e-mail aqui"
                    placeholderTextColor={themes.colors.textPlaceHolder}
                    width={320}
                    height={38}
                    value={email}
                    onChangeText={handleEmailChange}
                />

                {/* Texto de erro em vermelho embaixo do input */}
                {!!emailError && (
                    <Text style={{ color: 'red', marginTop: 3, marginBottom: 8 }}>
                        {emailError}
                    </Text>
                )}

                <TouchableOpacity style={{ marginTop: 10 }}>
                    <Button
                        text="Enviar Código"
                        width={320}
                        height={38}
                        onPress={handleEnviarCodigo}
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
            </View>

            {showSuccessModal && (
                <ModalFeedback
                    title='Código enviado com sucesso!'
                    closeModal={() => setShowSuccessModal(false)}
                    style={{ marginRight: 15 }}
                />
            )}
        </View>
    );
};

export default RedefinirSenha;
