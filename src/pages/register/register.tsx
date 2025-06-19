import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
} from 'react-native';

import styles from './styles';
import { useBiometria } from '../../hooks/useBiometria';

import Logo from '../../assets/logo.svg';
import Google from '../../assets/google-37 1.svg';
import Facebook from '../../assets/facebook.svg';

import { themes } from '../../global/themes';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button/button';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import { useNavigation } from "@react-navigation/native";

import CustomDateTimePicker from '../../components/customDatePicker';

import api from '../../../API/index'; 

type NavigationProps = StackNavigationProp<RootStackParamList>;

export default function Register() {
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [birthDate, setBirthDate] = useState<Date | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { autenticarBiometria } = useBiometria();

    const navigation = useNavigation<NavigationProps>();
    
    const formatDate = (date: Date | null) => {
        if (!date) return '00/00/0000';
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

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
            const response = await api.post('/auth/registro', payload);

            if (response.status === 200 || response.status === 201) {
                Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
                navigation.navigate('Login');
            } else {
                const data = response.data;
                Alert.alert('Erro', data.message || 'Erro ao cadastrar');
            }
        } catch (error: any) {
            if (error.response && error.response.data && error.response.data.mensagem) {
                const msg = error.response.data.mensagem;
    
            if (msg === 'Usuário já existe.') {
                Alert.alert('Erro', 'Este e-mail já está cadastrado!');
            } else if (msg === 'A senha deve ter entre 6 e 8 caracteres.') {
                Alert.alert('Erro', 'A senha precisa ter entre 6 e 8 caracteres!');
            } else {
                Alert.alert('Erro', msg);
            }
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
                contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.container}>
                    <Logo />
                    <Text style={styles.title}>Faça seu Cadastro</Text>

                    <View>
                        <View style={styles.buttonLogin}>
                            <TouchableOpacity style={styles.socialButtonGoogle}>
                                <View style={styles.iconWrapper}>
                                    <Google />
                                </View>
                                <View style={styles.textWrapper}>
                                    <Text style={[styles.socialText, { color: '#000' }]}>
                                        Cadastre-se com o Google
                                    </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.socialButtonFacebook}>
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
