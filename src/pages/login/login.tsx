import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert
} from 'react-native';

import styles from './styles';
import Logo from '../../assets/logo.svg';
import Google from '../../assets/google-37 1.svg';
import Facebook from '../../assets/facebook.svg';
import { themes } from '../../global/themes';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button/button';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import { useNavigation } from "@react-navigation/native";

import api from '../../../API';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
    const [isPressed, setIsPressed] = useState(false);
    const navigation = useNavigation<NavigationProps>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        const checkLogin = async () => {
            const token = await AsyncStorage.getItem('userToken');
            if (token) {
                navigation.navigate('Main');
            }
        };
        checkLogin();
    }, []);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Preencha o e-mail e a senha!');
            return;
        }

        try {
            const response = await api.post('/auth/login', {
                email,
                senha: password,
            });

            if (response.status === 200 || response.status === 201) {
                const { token, IdUsuario } = response.data;

                // Armazena o token e o ID do usuário
                await AsyncStorage.setItem('userToken', token);
                await AsyncStorage.setItem('userId', IdUsuario);

                Alert.alert('Sucesso', 'Login realizado com sucesso!');
                navigation.navigate('Main');
            } else {
                Alert.alert('Erro', 'E-mail ou senha incorretos.');
            }
        } catch (error: any) {
            if (error.response?.status === 401) {
                Alert.alert('Erro', error.response.data.message || 'Credenciais inválidas');
            } else {
                Alert.alert('Erro', 'Erro ao conectar com o servidor');
            }
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <View style={styles.content}>
                        <View style={[styles.boxTop, { margin: 1 }]}>
                            <Logo />
                            <Text style={styles.title}>Faça seu login</Text>
                        </View>

                        <View>
                            <View style={{ marginBottom: 10 }}>
                                <View style={{ gap: 1 }}>
                                    <Text style={[styles.label]}>E-mail</Text>
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
                                        value={password}
                                        onChangeText={setPassword}
                                        secureTextEntry
                                    />
                                </View>
                            </View>

                            <View>
                                <Button
                                    text='Entrar'
                                    width={320}
                                    height={40}
                                    onPress={handleLogin}
                                />
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                                <Text style={styles.textBottom}>Esqueceu sua senha?</Text>

                                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                                    <Text style={styles.textBottomClickHere}> Clique aqui</Text>
                                </TouchableOpacity>
                            </View>

                            <View style={styles.separatorContainer}>
                                <View style={styles.line} />
                                <Text style={styles.separatorText}>     Ou     </Text>
                                <View style={styles.line} />
                            </View>

                            <View style={styles.buttonLogin}>
                                <TouchableOpacity style={styles.socialButtonGoogle}>
                                    <View style={styles.iconWrapper}>
                                        <Google />
                                    </View>

                                    <View style={styles.textWrapper}>
                                        <Text style={[styles.socialText, { color: '#000' }]}>
                                            Entrar com o Google
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.socialButtonFacebook}>
                                    <View style={styles.iconWrapper}>
                                        <Facebook />
                                    </View>

                                    <View style={styles.textWrapper}>
                                        <Text style={[styles.socialText, { color: '#fff' }]}>
                                            Entrar com o Facebook
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.textBottom}>Não tem uma conta? </Text>

                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.textBottomClickHere}>Cadastre-se</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
