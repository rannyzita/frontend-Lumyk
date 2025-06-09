import React, { useState } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import styles from './styles';
import { themes } from '../../global/themes';

import { Input } from '../../components/Input';
import { Button } from '../../components/Button/button';

import Logo from '../../assets/logo.svg';
import NavigationHeader from '../../components/NavigationHeader/navigationHeader';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";

import ModalFeedback from '../../components/feedbackButton/feedbackButton';
import api from '../../../API/index'; // Certifique-se de que isso está configurado

type NavigationProps = StackNavigationProp<RootStackParamList>;
type RouteProps = RouteProp<RootStackParamList, 'ResetPassword'>;

const ResetPassword = () => {
    const navigation = useNavigation<NavigationProps>();
    const route = useRoute<RouteProps>();

    const [showModal, setShowModal] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmerPassword, setConfirmerPassword] = useState('');
    const [apiMessage, setApiMessage] = useState('');
    const [isError, setIsError] = useState(false);

    const codigoRecebido = route.params?.codigo ?? '';

    const handleConfirmar = async () => {
        setApiMessage('');
        setIsError(false);

        if (newPassword !== confirmerPassword) {
            setApiMessage('As senhas não coincidem.');
            setIsError(true);
            return;
        }

        setShowLoading(true);

        try {
            await api.put('/usuarios/atualizar_senha', {
                codigo: codigoRecebido,
                new_password: newPassword,
                confirm_password: confirmerPassword
            });

            setShowLoading(false);
            setIsError(false);
            setApiMessage('Senha atualizada com sucesso!');
            setShowModal(true);

            setTimeout(() => {
                setShowModal(false);
                navigation.navigate('Login');
            }, 4000);
        } catch (error: any) {
            setShowLoading(false);
            setIsError(true);

            if (error.response && error.response.data && error.response.data.mensagem) {
                setApiMessage(error.response.data.mensagem);
            } else {
                setApiMessage('Erro ao atualizar a senha. Tente novamente.');
            }
        }
    };

    return (
        <View style={styles.container}>
            <NavigationHeader />

            <View style={[styles.content, { marginBottom: 99 }]}>
                <Logo style={{ marginBottom: 50 }} />
                <View style={styles.separatorContainer}>
                    <View style={styles.line} />
                </View>

                <Text style={styles.title}>Atualizar senha</Text>

                <Text style={styles.label}>Senha</Text>
                <View style={{ alignItems: 'flex-start', width: '100%' }}>
                    <Input
                        placeholder="Insira a nova senha"
                        placeholderTextColor={themes.colors.textPlaceHolder}
                        width={324}
                        height={38}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                    />
                </View>

                <Text style={styles.label}>Senha</Text>
                <View style={{ alignItems: 'flex-start', width: '100%' }}>
                    <Input
                        placeholder="Confirme a senha"
                        placeholderTextColor={themes.colors.textPlaceHolder}
                        width={324}
                        height={38}
                        value={confirmerPassword}
                        onChangeText={setConfirmerPassword}
                        secureTextEntry
                    />
                </View>

                {/* 🔴 Mensagem de erro ou sucesso */}
                {apiMessage !== '' && (
                    <Text style={{
                        color: isError ? 'red' : 'green',
                        marginTop: 10,
                        fontSize: 13,
                        height: 20,
                        textAlign: 'left',
                        alignSelf: 'flex-start'
                    }}>
                        {apiMessage}
                    </Text>
                )}

                <View style={{ marginTop: 50, flexDirection: 'row', alignItems: 'center', marginLeft: 140 }}>
                    <View style={{ marginRight: 20 }}>
                        <TouchableOpacity>
                            <Text onPress={() => navigation.navigate('VerifyCode')}>Anterior</Text>
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Button
                            text="Confirmar"
                            width={110}
                            height={40}
                            onPress={handleConfirmar}
                        />
                    </View>
                </View>
            </View>

            {showModal && (
                <ModalFeedback
                    title='Senha atualizada com sucesso!'
                    closeModal={() => setShowModal(false)}
                    style={{ marginRight: 15 }}
                />
            )}

            {showLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size={70} color={themes.colors.primary} />
                </View>
            )}
        </View>
    );
};

export default ResetPassword;
