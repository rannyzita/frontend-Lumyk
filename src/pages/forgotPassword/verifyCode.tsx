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

import api from '../../../API/index';
import { useRedefinirSenha } from '../../context/RedefinirSenhaContext';

type NavigationProps = StackNavigationProp<RootStackParamList>;

const VerifyCode = () => {
    const navigation = useNavigation<NavigationProps>();
    const { email } = useRedefinirSenha(); 
    const [codigo, setCodigo] = useState('');
    const [loading, setLoading] = useState(false);
    const [apiMessage, setApiMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const confirmarCodigo = async () => {
        if (!codigo.trim()) {
            setApiMessage('Por favor, insira o código.');
            setIsError(true);
            return;
        }

        setLoading(true);
        setApiMessage('');
        setIsError(false);

        try {
            await api.put('/usuarios/atualizar_senha', { codigo }); 
            setApiMessage('Código confirmado com sucesso.');
            setIsError(false);
            navigation.navigate('ResetPassword', { codigo }); 
        } catch (error: any) {
            setIsError(true);
            if (error.response && error.response.status === 404) {
                setApiMessage('Código inválido.');
            } else {
                setApiMessage('Erro ao confirmar o código. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <NavigationHeader />

            <View style={[styles.content, { marginBottom: 95 }]}>
                <Logo style={{ marginBottom: 50 }} />
                <View style={styles.separatorContainer}>
                    <View style={styles.line} />
                </View>

                <Text style={styles.title}>Inserindo o Código</Text>
                <Text style={styles.subtitle}>
                    Para redefinir sua senha, informe o código que enviamos ao e-mail.
                    Caso não tenha enviado, volte para a página anterior e aperte em enviar novamente.
                </Text>

                <View style={styles.separatorContainer}>
                    <View style={styles.line} />
                </View>

                <Text style={styles.label}>Código de Verificação</Text>
                <View style={{ alignItems: 'flex-start', width: '100%' }}>
                    <Input
                        placeholder="Insira seu código aqui"
                        placeholderTextColor={themes.colors.textPlaceHolder}
                        width={200}
                        height={38}
                        value={codigo}
                        onChangeText={setCodigo}
                    />
                </View>

                {!!apiMessage && (
                    <Text style={{ color: isError ? 'red' : 'green', marginTop: 5 }}>
                        {apiMessage}
                    </Text>
                )}

                <View style={{ marginTop: 50, flexDirection: 'row', alignItems: 'center', marginLeft: 140 }}>
                    <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.goBack()}>
                        <Text>Anterior</Text>
                    </TouchableOpacity>

                    <Button
                        text={loading ? 'Carregando...' : 'Confirmar'}
                        width={110}
                        height={40}
                        disabled={loading}
                        onPress={confirmarCodigo}
                    />
                </View>
            </View>
        </View>
    );
};

export default VerifyCode;
