import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity, KeyboardAvoidingView, Platform,
    ScrollView, Alert,
} from 'react-native';

import styles from './styles';
import Logo from '../../assets/logo.svg';

import { themes } from '../../global/themes';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button/button';

import CustomDateTimePicker from '../../components/customDatePicker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as WebBrowser from 'expo-web-browser';

import api from '../../../API/index';
import { useBiometria } from '../../hooks/useBiometria';

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

    const getFormattedDateForBackend = (date: Date | null) => {
        if (!date) return '';
        return date.toISOString().split('T')[0];
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
            console.log('Enviando para o backend:', payload);
            const response = await api.post('/auth/registro', payload);
            console.log('oie')
            if (response.status === 200 || response.status === 201) {
                Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
                navigation.navigate('Login');
            } else {
                Alert.alert('Erro', response.data.message || 'Erro ao cadastrar');
            }
        } catch (error:any) {
            console.log('Erro no registro:', error?.response?.data || error.message || error);
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
