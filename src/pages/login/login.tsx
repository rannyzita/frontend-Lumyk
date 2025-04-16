import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    TouchableOpacity,
    Pressable,
    StyleSheet,
} from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import styles from './styles'
import Logo from '../../assets/logo.svg';
import {themes} from '../../global/themes'
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export default function LoginScreen() { 
    const [isPressed, setIsPressed] = useState(false);

    return (
        <View style={styles.container}>

            <View style={styles.boxTop}>
                <Logo/>
                <Text style={styles.title}>Faça seu login</Text>
            </View>

            <View>
                <Text style={styles.label}>E-mail</Text>
                <Input
                    placeholder="Insira seu e-mail"
                    placeholderTextColor={themes.colors.textPlaceHolder}
                    width={320}
                    height={45}
                />

                <Text style={styles.label}>Senha</Text>
                <Input
                    placeholder="Insira sua senha"
                    placeholderTextColor={themes.colors.textPlaceHolder}
                    width={320}
                    height={45}
                    secureTextEntry
                />
            </View>

            <View style={styles.boxBottom}>
                <Button 
                    text='Entrar'
                    width={320}
                    height={45}
                />
            </View>

            {/*<Pressable
                style={({ pressed }) => [
                    styles.button,
                    { backgroundColor: pressed ? '#7b2cbf' : '#a259ff' },
            ]}
            >
            <Text style={styles.buttonText}>Entrar</Text>
            </Pressable>

            <Text style={styles.forgotPassword}>
                Esqueceu sua senha? <Text style={styles.link}>Clique aqui</Text>
            </Text>

            <View style={styles.separatorContainer}>
                <View style={styles.separator} />
                <Text style={styles.ou}>Ou</Text>
                <View style={styles.separator} />
            </View>

            <TouchableOpacity style={styles.socialButton}>
                <FontAwesome name="google" size={20} color="#DB4437" style={{ marginRight: 8 }} />
                <Text style={styles.socialText}>Entrar com o Google</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#1877f2' }]}>
                <FontAwesome name="facebook" size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={[styles.socialText, { color: '#fff' }]}>Entrar com o Facebook</Text>
            </TouchableOpacity> */}
        </View>
    );
}
