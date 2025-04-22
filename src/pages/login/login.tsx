import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import styles from './styles'
import Logo from '../../assets/logo.svg';
import Google from '../../assets/google-37 1.svg'
import Facebook from '../../assets/facebook.svg'
import {themes} from '../../global/themes'
import { Input } from '../../components/Input';
import { Button } from '../../components/Button/button';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import { useNavigation } from "@react-navigation/native";

type NavigationProps = StackNavigationProp<RootStackParamList, 'Login', 'Main'>;
export default function LoginScreen() { 
    const [isPressed, setIsPressed] = useState(false);
    const navigation = useNavigation<NavigationProps>();

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

            <View style={styles.content}>
                <View style={[styles.boxTop, {margin:1}]}>
                    <Logo/>
                    <Text style={styles.title}>Faça seu login</Text>
                </View>

                <View>
                    <View style={{marginBottom:10}}>
                        <View style={{gap:1}}>
                            <Text style={[styles.label]}>E-mail</Text>
                            <Input
                                placeholder="Insira seu e-mail"
                                placeholderTextColor={themes.colors.textPlaceHolder}
                                width={320}
                                height={40}
                            />
                        </View>

                        <View style={{gap:1}}>
                            <Text style={styles.label}>Senha</Text>
                            <Input
                                placeholder="Insira sua senha"
                                placeholderTextColor={themes.colors.textPlaceHolder}
                                width={320}
                                height={40}
                                secureTextEntry
                            />
                        </View>
                    </View>

                    <View>
                        <Button 
                            text='Entrar'
                            width={320}
                            height={40}
                            onPress={() => navigation.navigate('Main')}
                        />
                    </View>

                    <View style={{flexDirection:'row', justifyContent:'center', marginTop:10 }}>
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

                    <View style={styles.buttonLogin}>
                        <TouchableOpacity style={styles.socialButtonGoogle}>
                            <View style={styles.iconWrapper}>
                                <Google/>
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
                <Text style={styles.textBottom}>Não tem uma conta </Text>

                <TouchableOpacity onPress={() => navigation.navigate('NomeDaTela')}>
                    <Text style={styles.textBottomClickHere}> Clique aqui</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
