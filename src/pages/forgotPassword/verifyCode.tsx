import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
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

type NavigationProps = StackNavigationProp<RootStackParamList>;

const verifyCode = () => {
    const navigation = useNavigation<NavigationProps>();
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleEnviarCodigo = () => {
        setShowModal(true);
        setTimeout(() => setShowModal(false), 10000);
    };

    return (
        <View style={styles.container}>
            <NavigationHeader
                iconArrow={true}
                onBack={() => navigation.navigate('Login')}
            />

            <View style={styles.content}>
                <Logo style={{marginBottom: 50}} />
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
                    onChangeText={setEmail}
                />

                <TouchableOpacity style={{marginTop:10}}>
                    <Button
                        text="Enviar Código"
                        width={320}
                        height={38}
                        onPress={handleEnviarCodigo}
                    />
                </TouchableOpacity>

                <View style={{marginTop:50, flexDirection: 'row'}}></View>
                    <Button
                        text="Confirmar"
                        width={110}
                        height={35}
                        onPress={() => navigation.navigate('VerifyCode')}
                        style={{marginLeft:207}}
                    />
                </View>

            {showModal && (
                <ModalFeedback
                    title='Código enviado com sucesso!'
                    closeModal={() => setShowModal(false)} style={{ marginRight: 15 }}
                />
            )}
        </View>
    );
};

export default verifyCode;
