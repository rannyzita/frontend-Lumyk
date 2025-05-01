import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';

import styles from './styles';

import Logo from '../../assets/logo.svg';
import Google from '../../assets/google-37 1.svg';
import Facebook from '../../assets/facebook.svg';

import {themes} from '../../global/themes';
import { Input } from '../../components/Input';
import { Button } from '../../components/Button/button';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import { useNavigation } from "@react-navigation/native";

type NavigationProps = StackNavigationProp<RootStackParamList, 'Login', 'Main'>;
export default function Register() { 
    return (
        <View style={styles.container}> 
            <Logo/>
            <Text style={styles.title}>Faça seu Cadastro</Text>

            <View>

                    <View style={styles.buttonLogin}>
                        <TouchableOpacity style={styles.socialButtonGoogle}>
                            <View style={styles.iconWrapper}>
                                <Google/>
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

                <View style={{marginBottom:10}}>
                    <View style={{gap:1}}>
                        <Text style={[styles.label]}>Nome Completo</Text>
                        <Input
                            placeholder="Insira seu nome completo"
                            placeholderTextColor={themes.colors.textPlaceHolder}
                            width={320}
                            height={40}
                        />
                    </View>

                    <View style={{gap:1}}>
                        <Text style={styles.label}>Idade</Text>
                        <Input
                            placeholder="Insira sua idade"
                            placeholderTextColor={themes.colors.textPlaceHolder}
                            width={135}
                            height={40}
                        />
                    </View>
                    
                    <View style={{gap:1}}>
                        <Text style={styles.label}>Data de Nascimento</Text>
                        <TouchableOpacity onPress={}>
                            <Input
                                placeholder="00/00/0000"
                                placeholderTextColor={themes.colors.textPlaceHolder}
                                width={135}
                                height={40}
                                iconRightName='IconCalendar'
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={{gap:1}}>
                        <Text style={styles.label}>E-mail</Text>
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
            </View>

        </View>
    );
}
