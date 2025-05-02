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

    return (
        <View style={styles.container}>
            <NavigationHeader
            />

            <View style={[styles.content, {marginBottom:95}]}>
                <Logo style={{marginBottom: 50}} />
                <View style={styles.separatorContainer}>
                    <View style={styles.line} />
                </View>

                <Text style={styles.title}>Inserindo o Código</Text>
                <Text style={styles.subtitle}>
                    Para redefinir sua senha, informe o código que enviamos ao seu e-mail. Caso não tenha enviado, volte para a página anterior e aperte em enviar novamente.
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
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>


                    <View style={{ marginTop: 50, flexDirection: 'row', alignItems: 'center', marginLeft:140 }}>
                        
                        <View style={{ marginRight: 20 }}>
                            <TouchableOpacity style={{ marginRight: 20 }}>
                                <Text onPress={() => navigation.navigate('ForgotPassword')}>Anterior</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Button
                            text="Confirmar"
                            width={110}
                            height={40}
                            onPress={() => navigation.navigate('ResetPassword')}
                            />
                        </View>

                    </View>
                </View>
        </View>
    );
};

export default verifyCode;
