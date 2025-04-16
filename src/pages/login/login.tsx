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
import styles from './styles'
import Logo from '../../assets/logo.svg';
import {themes} from '../../global/themes'
import { Input } from '../../components/Input';
import { Button } from '../../components/Button';

export default function LoginScreen() { 
    const [isPressed, setIsPressed] = useState(false);

    // async function getLogin() {
    //     try {
    //         setLaoding(true);
    //         // Simula um delay para demonstrar carregamento
    //         if (!email || !password) {
    //             return Alert.alert('Atenção','Preencha todos os campos.');
    //         }

    //         if(email == 'fs.vitoria.soares@gmail.com' && password == '123'){
    //             Alert.alert('Logado com sucesso!');
    //             return Navigation.reset({routes:[{name:'BottomRoutes'}]});
    //         }else{
    //             Alert.alert('Atenção', 'Campos Inválidos')
    //         }
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setLaoding(false);
    //     }
    // }

    return (
        <View style={styles.container}>

            <View style={styles.boxTop}>
                <Logo/>
                <Text style={styles.title}>Faça seu login</Text>
            </View>

            <View style={{gap:10}}>
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

                <View>
                    <Button 
                        text='Entrar'
                        width={320}
                        height={45}
                    />
                </View>

                <View style={{flexDirection:'row', justifyContent:'center', }}>
                    <Text style={styles.textBottom}>Esqueceu sua senha?</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('NomeDaTela')}>
                        <Text style={styles.textBottomClickHere}> Clique aqui</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.separatorContainer}>
                    <View style={styles.line} />
                    <Text style={styles.separatorText}>     Ou     </Text>
                    <View style={styles.line} />
                </View>
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
