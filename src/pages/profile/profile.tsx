import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from 'react-native';

import NavigationHeader from "../../components/NavigationHeader/navigationHeader";
import { Input } from '../../components/Input';

import { themes } from '../../global/themes';
import styles from './styles';

import IconProfile from '../../assets/profile/iconProfile.svg';
import EditIcon from '../../assets/profile/EditorCampoCinza.svg';
import EditIconPurple from '../../assets/profile/EditorCampoRoxo.svg';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types/navigation';
import { useNavigation } from "@react-navigation/native";

import api from "../../../API";
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProps = StackNavigationProp<RootStackParamList>;

// aqui vai pegar o token que ta armazenado do async, pra poder 
// filtrar as informações pro profile
const getTokenAndUserId = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('userId');

        return { token, userId };
    } catch (error) {
        console.error('Erro ao recuperar token e ID do usuário:', error);
        return { token: null, userId: null };
    }
};  

export default function Profile() {
    const [password, setPassword] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [street, setStreet] = useState('');
    const [number, setNumber] = useState('');
    const [neighborhood, setNeighborhood] = useState('');
    const [state, setState] = useState('');
    const [userData, setUserData] = useState({
        nome: '',
        email: '',
        data_nascimento: '',
    });

    const [isEditing, setIsEditing] = useState({
        nome: false,
        email: false,
        data_nascimento: false,
    });

    const navigation = useNavigation<NavigationProps>();

    useEffect(() => {
        const fetchUserData = async () => {
            const { token, userId } = await getTokenAndUserId();
            if (token && userId) {
                try {
                    const response = await api.get(`/usuarios/${userId}`, {
                        headers: {
                        Authorization: `Bearer ${token}`,
                        },
                    });
                    setUserData(response.data);
                } catch (error) {
                    console.error('Erro ao buscar dados do usuário:', error);
                }
            }
        };
        fetchUserData();
    }, []);

    const toggleEdit = (field) => {
        setIsEditing((prevState) => ({
            ...prevState,
            [field]: !prevState[field],
        }));
    };

    return (
        <View style={styles.container}>
            <NavigationHeader iconArrow={true} />

            <View style={styles.profileContent}>
                <IconProfile style={styles.profileIcon}></IconProfile>

                <View style={styles.nameRow}>
                    <Text style={styles.profileName}>Seu nome</Text>
                    <TouchableOpacity>
                        <EditIconPurple width={30} height={30} style={styles.iconSmall}></EditIconPurple>
                    </TouchableOpacity>
                </View>

                <View style={styles.separatorContainer}>
                    <View style={styles.line} />
                </View>

                {/* Email */}
                <View style={[styles.section, {marginTop:10}]}>
                    <Text style={styles.label}>E-mail</Text>
                    <View style={styles.inputWithIcon}>
                        <Input
                            placeholder="E-mail"
                            value={userData.email}
                            onChangeText={(text) => setUserData({...userData, email:text})}
                            editable={isEditing.email}
                            width={270}
                            height={40}
                        />
                        <EditIcon width={22} height={22} style={styles.iconSmall}></EditIcon>
                    </View>
                </View>

                {/* Senha */}
                <View style={{marginBottom:-20}}>
                    <Text style={styles.label}>Senha</Text>
                    <View style={styles.inputWithIcon}>
                        <Input
                            placeholder="Insira sua senha"
                            placeholderTextColor={themes.colors.textPlaceHolder}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            width={270}
                            height={40}
                        />
                        <TouchableOpacity>
                            <EditIcon 
                                width={22} 
                                height={22} 
                                style={styles.iconSmall}
                                onPress={()=> navigation.navigate('ForgotPassword')}
                            >   
                            </EditIcon>
                        </TouchableOpacity>
                    </View>
                </View>
                
                {/* Data de Nascimento */}
                <View style={{marginRight:'45%', marginBottom:-5}}>
                    <Text style={styles.label}>Data de Nascimento</Text>
                    <View style={styles.inputWithIcon}>
                        <Input
                            placeholder="XX/XX/XXXX"
                            value={birthDate}
                            onChangeText={setBirthDate}
                            width={120}
                            height={40}
                        />
                        <EditIcon width={22} height={22} style={styles.iconSmall}></EditIcon>
                    </View>
                </View>
                
                {/* Endereço */}
                <Text style={styles.addressTitle}>Endereço</Text>

                <View style={styles.separatorContainer}>
                    <View style={styles.line} />
                </View>

                <View style={[styles.row, {marginBottom:-20}]}>
                    <View>
                        <Text style={styles.label}>Rua</Text>
                        <View style={styles.inputWithIcon}>
                            <Input
                                placeholder="Sua Rua"
                                value={birthDate}
                                onChangeText={setBirthDate}
                                width={165}
                                height={40}
                            />
                            <EditIcon width={22} height={22} style={styles.iconSmall}></EditIcon>
                        </View>
                    </View>

                    <View style={{marginLeft:5}}>
                        <Text style={styles.label}>Número</Text>
                        <View style={styles.inputWithIcon}>
                            <Input
                                placeholder="XXX"
                                value={birthDate}
                                onChangeText={setBirthDate}
                                width={70}
                                height={40}
                            />
                            <EditIcon width={22} height={22} style={styles.iconSmall}></EditIcon>
                        </View>
                    </View>
                </View>

                <View style={[styles.inputWithIcon, {marginBottom:-20, marginRight:'45%'}]}>
                    <View>
                        <Text style={styles.label}>Bairro</Text>
                        <View style={styles.inputWithIcon}>
                            <Input
                                placeholder="Seu bairro"
                                value={birthDate}
                                onChangeText={setBirthDate}
                                width={135}
                                height={40}
                            />
                            <EditIcon width={22} height={22} style={styles.iconSmall}></EditIcon>
                        </View>
                    </View>
                </View>

                <View style={[styles.inputWithIcon, {marginRight:'45%'}]}>
                    <View>
                        <Text style={styles.label}>Estado</Text>
                        <View style={styles.inputWithIcon}>
                            <Input
                                placeholder="Seu estado"
                                value={birthDate}
                                onChangeText={setBirthDate}
                                width={135}
                                height={40}
                            />
                            <EditIcon width={22} height={22} style={styles.iconSmall}></EditIcon>
                        </View>
                    </View>
                </View>

                {/* Botões */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.deleteButton}>
                        <Text style={styles.deleteText}>Excluir Conta</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.logoutText}>Sair da Conta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
