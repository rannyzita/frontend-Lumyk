import React, { useEffect, useState } from 'react';
import {
    View, Text, TouchableOpacity, KeyboardAvoidingView, Platform,
    ScrollView, Alert,
} from 'react-native';

import styles from './styles';
import Logo from '../../assets/logo.svg';
import Google from '../../assets/google-37 1.svg';
import Facebook from '../../assets/facebook.svg';

import { themes } from '../../global/themes';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button/button';

import CustomDateTimePicker from '../../components/customDatePicker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as GoogleAuth from 'expo-auth-session/providers/google';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as FacebookAuth from 'expo-facebook';

import api from '../../../API/index';
import { useBiometria } from '../../hooks/useBiometria';

import { ID_CLIENT, ID_FACEBOOK, redirectUri } from '@env';

WebBrowser.maybeCompleteAuthSession();

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function Register() {
    const navigation = useNavigation<NavigationProps>();

    const [showDatePicker, setShowDatePicker] = useState(false);
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { autenticarBiometria } = useBiometria();

    console.log('Redirect URI vai:', redirectUri); 

    // Google Auth
    const [googleRequest, googleResponse, googlePromptAsync] = GoogleAuth.useAuthRequest({
        androidClientId: ID_CLIENT,
        scopes: ['openid', 'profile', 'email'],
        redirectUri,
    });

    useEffect(() => {
        if (googleResponse) {
            console.log('Google Response:', googleResponse);

            if (googleResponse.type === 'success') {
                const { authentication } = googleResponse;
                console.log('AccessToken:', authentication?.accessToken);
                handleGoogleLogin(authentication?.accessToken);
            } else if (googleResponse.type === 'error') {
                console.log('Erro no Google Auth:', googleResponse);
                Alert.alert('Erro', 'Erro na autenticação com Google');
            }
        }
    }, [googleResponse]);

    const handleGoogleLogin = async (accessToken: string | undefined) => {
        if (!accessToken) {
            console.log('handleGoogleLogin: accessToken indefinido');
            return;
        }

        try {
            console.log('Buscando userinfo com accessToken:', accessToken);
            const res = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });

            console.log('Resposta userinfo status:', res.status);
            const user = await res.json();
            console.log('Dados do usuário Google:', user);

            await handleSocialRegister({
                nome: user.name,
                email: user.email,
            });

        } catch (error) {
            console.error('Erro no handleGoogleLogin:', error);
            Alert.alert('Erro', 'Falha ao autenticar com Google');
        }
    };

    // Facebook Auth
    const handleFacebookLogin = async () => {
        try {
            await FacebookAuth.initializeAsync({
                appId: ID_FACEBOOK,
            });

            const result = await FacebookAuth.logInWithReadPermissionsAsync({
                permissions: ['public_profile', 'email'],
            });

            if (result.type === 'success') {
                const res = await fetch(
                    `https://graph.facebook.com/me?fields=id,name,email&access_token=${result.token}`
                );
                const user = await res.json();

                await handleSocialRegister({
                    nome: user.name,
                    email: user.email,
                });
            } else {
                Alert.alert('Cancelado', 'Login com Facebook foi cancelado');
            }
        } catch (error) {
            Alert.alert('Erro', 'Falha ao autenticar com Facebook');
        }
    };

    const getFormattedDateForBackend = (date: Date | null) => {
        if (!date) return '';
        return date.toISOString().split('T')[0];
    };

    const generateRandomPassword = () => {
        return Math.random().toString(36).slice(-10);
    };

    const handleSocialRegister = async (dados: { nome: string, email: string }) => {
        if (!birthDate) {
            Alert.alert('Preencha somente o campo de data de nascimento antes!');
            return;
        }

        const payload = {
            nome: dados.nome,
            email: dados.email,
            senha: generateRandomPassword(),
            data_nascimento: getFormattedDateForBackend(birthDate),
        };

        console.log('Payload para registro social:', payload);

        try {
            const response = await api.post('/auth/registro', payload);

            console.log('Resposta do backend registro social:', response.data);

            if (response.status === 200 || response.status === 201) {
                await AsyncStorage.setItem('userToken', response.data.token);
                await AsyncStorage.setItem('userId', response.data.usuario.id.toString());

                Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
                navigation.navigate('Main');
            } else {
                Alert.alert('Erro', response.data.message || 'Erro ao cadastrar');
            }
        } catch (error:any) {
            console.error('Erro no handleSocialRegister:', error.response || error.message || error);
            Alert.alert('Erro', 'Erro ao conectar com o servidor');
        }
    };

    const handleRegister = async () => {
        if (!name || !email || !password || !birthDate) {
            Alert.alert('Erro', 'Preencha todos os campos!');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Erro', 'Digite um e-mail válido!');
            return;
        }

        const sucesso = await autenticarBiometria();
        if (!sucesso) {
            Alert.alert('Erro', 'Biometria não foi autenticada!');
            return;
        }

        const payload = {
            nome: name,
            email,
            senha: password,
            data_nascimento: getFormattedDateForBackend(birthDate),
        };

        try {
            const response = await api.post('/auth/registro', payload);

            if (response.status === 200 || response.status === 201) {
                Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
                navigation.navigate('Login');
            } else {
                Alert.alert('Erro', response.data.message || 'Erro ao cadastrar');
            }
        } catch (error) {
            Alert.alert('Erro', 'Erro ao conectar com o servidor');
        }
    };

    const formatDate = (date: Date | null) => {
        if (!date) return '00/00/0000';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <Logo />
                    <Text style={styles.title}>Faça seu Cadastro</Text>

                    <View>
                        <View style={styles.buttonLogin}>
                            <TouchableOpacity
                                style={styles.socialButtonGoogle}
                                onPress={() => googlePromptAsync()}
                            >
                                <View style={styles.iconWrapper}>
                                    <Google />
                                </View>
                                <View style={styles.textWrapper}>
                                    <Text style={[styles.socialText, { color: '#000' }]}>
                                        Cadastre-se com o Google
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.socialButtonFacebook}
                                onPress={handleFacebookLogin}
                            >
                                <View style={styles.iconWrapper}>
                                    <Facebook />
                                </View>
                                <View style={styles.textWrapper}>
                                    <Text style={[styles.socialText, { color: '#fff' }]}>
                                        Cadastre-se com o Facebook
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.separatorContainer}>
                            <View style={styles.line} />
                            <Text style={styles.separatorText}>     Ou     </Text>
                            <View style={styles.line} />
                        </View>

                        <View style={{ marginBottom: 10 }}>
                            <View style={{ gap: 1 }}>
                                <Text style={styles.label}>Nome Completo</Text>
                                <Input
                                    placeholder="Insira seu nome completo"
                                    placeholderTextColor={themes.colors.textPlaceHolder}
                                    width={320}
                                    height={40}
                                    value={name}
                                    onChangeText={setName}
                                />
                            </View>

                            <View style={{ gap: 1 }}>
                                <Text style={styles.label}>Data de Nascimento</Text>
                                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                                    <Input
                                        placeholder="00/00/0000"
                                        placeholderTextColor={themes.colors.textPlaceHolder}
                                        width={135}
                                        height={40}
                                        value={formatDate(birthDate)}
                                        editable={false}
                                        iconRightName="IconCalendar"
                                        onIconRightPress={() => setShowDatePicker(true)}
                                    />
                                </TouchableOpacity>
                                <CustomDateTimePicker
                                    type="date"
                                    show={showDatePicker}
                                    setShow={setShowDatePicker}
                                    onDateChange={setBirthDate}
                                    date={birthDate}
                                />
                            </View>

                            <View style={{ gap: 1 }}>
                                <Text style={styles.label}>E-mail</Text>
                                <Input
                                    placeholder="Insira seu e-mail"
                                    placeholderTextColor={themes.colors.textPlaceHolder}
                                    width={320}
                                    height={40}
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>

                            <View style={{ gap: 1 }}>
                                <Text style={styles.label}>Senha</Text>
                                <Input
                                    placeholder="Insira sua senha"
                                    placeholderTextColor={themes.colors.textPlaceHolder}
                                    width={320}
                                    height={40}
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', marginLeft: 130, marginBottom: 20 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.textBottomClickHere}>Voltar</Text>
                        </TouchableOpacity>

                        <View style={{ marginLeft: 40 }}>
                            <Button
                                text="Cadastrar-se"
                                width={110}
                                height={35}
                                onPress={handleRegister}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
