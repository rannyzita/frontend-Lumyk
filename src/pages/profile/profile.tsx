import React, { useState, useEffect, useRef} from "react";
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
7
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

    const [isNomeEditable, setIsNomeEditable] = useState(false);
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [isBirthEditable, setIsBirthEditable] = useState(false);
    const [isStreetEditable, setIsStreetEditable] = useState(false);
    const [isNumberEditable, setIsNumberEditable] = useState(false);
    const [isBairroEditable, setIsBairroEditable] = useState(false);
    const [isStateEditable, setIsStateEditable] = useState(false);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);


    const [userData, setUserData] = useState({
        nome: '',
        email: '',
        data_nascimento: '',
        rua: '',
        numero: '',
        bairro: '',
        estado: ''
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
                            editInput={isEmailEditable}
                            focusInput={isEmailEditable}
                            width={270}
                            height={40}
                        />
                        <TouchableOpacity onPress={()=> setIsEmailEditable(true)}>
                            <EditIcon width={22} height={22} style={styles.iconSmall}></EditIcon>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Senha */}
                <View style={{marginBottom:-20}}>
                    <Text style={styles.label}>Senha</Text>
                    <View style={styles.inputWithIcon}>
                        <Input
                            placeholder="********"
                            placeholderTextColor={themes.colors.textPlaceHolder}
                            secureTextEntry={isPasswordVisible}
                            width={270}
                            height={40}
                            editInput={false}
                            focusInput={false}

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
                {/* vai ser com o coisa da biblioteca de datetimerpicker */}
                <View style={{marginRight:'45%', marginBottom:-5}}>
                    <Text style={styles.label}>Data de Nascimento</Text>
                    <View style={styles.inputWithIcon}>
                        <Input
                            placeholder="XX/XX/XXXX"
                            width={120}
                            height={40}
                            editInput={isBirthEditable}
                            focusInput={isBirthEditable}
                        />
                        <TouchableOpacity onPress={()=> setIsBirthEditable(true)}>
                            <EditIcon width={22} height={22} style={styles.iconSmall}></EditIcon>
                        </TouchableOpacity>
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
                                value={userData.rua}
                                onChangeText={(text) => setUserData({...userData, rua: text})}
                                width={165}
                                height={40}
                                editInput={isStreetEditable}
                                focusInput={isStreetEditable}
                            />
                            <TouchableOpacity onPress={()=> setIsStreetEditable(true)}>
                                <EditIcon width={22} height={22} style={styles.iconSmall}></EditIcon>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{marginLeft:5}}>
                        <Text style={styles.label}>Número</Text>
                        <View style={styles.inputWithIcon}>
                            <Input
                                placeholder="XXX"
                                value={userData.numero}
                                onChangeText={(text) => setUserData({...userData, numero:text})}
                                width={70}
                                height={40}
                                editInput={isNumberEditable}
                                focusInput={isNumberEditable}
                            />
                            <TouchableOpacity onPress={() => setIsNumberEditable(true)}>
                                <EditIcon width={22} height={22} style={styles.iconSmall}></EditIcon>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={[styles.inputWithIcon, {marginBottom:-20, marginRight:'45%'}]}>
                    <View>
                        <Text style={styles.label}>Bairro</Text>
                        <View style={styles.inputWithIcon}>
                            <Input
                                placeholder="Seu bairro"
                                value={userData.bairro}
                                onChangeText={(text) => setUserData({...userData, bairro:text})}
                                width={135}
                                height={40}
                                editInput={isBairroEditable}
                                focusInput={isBairroEditable}
                            />
                            <TouchableOpacity onPress={() => setIsBairroEditable(true)}>
                                <EditIcon width={22} height={22} style={styles.iconSmall}></EditIcon>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <View style={[styles.inputWithIcon, {marginRight:'45%'}]}>
                    <View>
                        <Text style={styles.label}>Estado</Text>
                        <View style={styles.inputWithIcon}>
                            <Input
                                placeholder="Seu estado"
                                value={userData.estado}
                                onChangeText={(text) => setUserData({...userData, estado:text})}
                                width={135}
                                height={40}
                                editInput={isStateEditable}
                                focusInput={isStateEditable}
                            />
                            <TouchableOpacity onPress={() => setIsStateEditable(true)}>
                                <EditIcon width={22} height={22} style={styles.iconSmall}></EditIcon>
                            </TouchableOpacity>
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
