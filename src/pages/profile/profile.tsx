import React, { useState, useEffect, useRef} from "react";
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';

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
import DateTimePicker from '@react-native-community/datetimepicker';

import ConfirmAlteration from '../../assets/profile/circle-check-solid.svg';
import CalcelAlteration from '../../assets/profile/xmark-solid.svg';

import api from "../../../API";
import AsyncStorage from '@react-native-async-storage/async-storage';

type NavigationProps = StackNavigationProp<RootStackParamList>;

import { DeleteAccountModal } from '../../components/DeleteAccount/deleteAccount';

type UserData = {
    nome: string;
    email: string;
    data_nascimento: string;
    rua: string;
    numero: string;
    bairro: string;
    estado: string;
};
// aqui vai pegar o token que ta armazenado do async, pra poder 
// filtrar as informações pro profile
const getTokenAndUserId = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken');
        const userId = await AsyncStorage.getItem('userId');

        return { token, userId };
    } catch (error) {
        console.error('Erro ao recuperar token e ID do usuário:', error);
        return { token: null, userId: null };
    }
};  

export default function Profile() {

    const nomeRef = useRef<TextInput>(null);
    const emailRef = useRef<TextInput>(null);
    const ruaRef = useRef<TextInput>(null);
    const numeroRef = useRef<TextInput>(null);
    const bairroRef = useRef<TextInput>(null);
    const estadoRef = useRef<TextInput>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [isEditable, setIsEditable] = useState({
        nome: false,
        email: false,
        rua: false,
        numero: false,
        bairro: false,
        estado: false,
        data_nascimento: false
    });
    
    const [userData, setUserData] = useState<UserData>({
        nome: '',
        email: '',
        data_nascimento: '',
        rua: '',
        numero: '',
        bairro: '',
        estado: ''
    });

    const [dateOfBirth, setDateOfBirth] = useState(parseDateAsLocal(userData.data_nascimento));

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const [originalData, setOriginalData] = useState<UserData>(userData);

    const navigation = useNavigation<NavigationProps>();

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const formatDate = (date: string) => {
        if (!date) return '';

        const isoDate = date.split('T')[0]; 
        const [year, month, day] = isoDate.split('-');
        return `${day}/${month}/${year}`;
    };

    const handleUpdateUserData = async (updatedUserData: typeof userData) => {
        const { token, userId } = await getTokenAndUserId();

        try {
            await api.put(`/usuarios/${userId}/atualizar`, {
                nome: updatedUserData.nome,
                email: updatedUserData.email,  
                data_nascimento: updatedUserData.data_nascimento,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            setOriginalData({
                ...originalData,
                nome: updatedUserData.nome,
                email: updatedUserData.email,
                data_nascimento: updatedUserData.data_nascimento,
            });
            
        } catch (error) {
            console.error('Erro ao atualizar dados:', error);
        }
    };
    
    function parseDateAsLocal(dateString: string): Date {
        const [year, month, day] = dateString.split("-").map(Number);
        return new Date(year, month - 1, day); 
    }

    const handleDateChange = (event: any, selectedDate: Date | undefined) => {
        const currentDate = selectedDate || dateOfBirth;
        setShowDatePicker(false);
        setDateOfBirth(currentDate);

        const localDate = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000);

        const newDataNascimento = localDate.toISOString().split('T')[0];
        
        setUserData(prev => {
            const updatedData = {
                ...prev,
                data_nascimento: newDataNascimento,
            };
            
            // Garante que os dados atualizados são enviados
            handleUpdateUserData(updatedData);
            
            setIsEditable(prev => ({ ...prev, data_nascimento: false }));
            return updatedData;
        });
    };
    
    const handleDeleteAccount = async () => {
        const { token, userId } = await getTokenAndUserId();

        try {
            await api.delete(`/usuarios/${userId}/deletar`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
    
            await AsyncStorage.clear();
            navigation.navigate('AccountDeleting');
        } catch (error) {
            console.error("Erro ao excluir conta:", error);
        }
    };
    
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
                    setOriginalData(response.data);
                    setDateOfBirth(new Date(response.data.data_nascimento));
                } catch (error) {
                    console.error('Erro ao buscar dados do usuário:', error);
                }
            }
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        if (isEditable.nome && nomeRef.current) {
            nomeRef.current.focus();
        }
        if (isEditable.email && emailRef.current) {
            emailRef.current.focus();
        }
        if (isEditable.rua && ruaRef.current) {
            ruaRef.current.focus();
        }
        if (isEditable.numero && numeroRef.current) {
            numeroRef.current.focus();
        }
        if (isEditable.bairro && bairroRef.current) {
            bairroRef.current.focus();
        }
        if (isEditable.estado && estadoRef.current) {
            estadoRef.current.focus();
        }
    }, [isEditable]);

    // const handleConfirm = (field: keyof UserData) => {
    //     if (field === 'data_nascimento' as keyof UserData) {
    //         handleUpdateUserData(); 
    //     } else {
    //         setIsEditable(prev => ({ ...prev, [field]: false }));
    //         setOriginalData(prev => ({
    //             ...prev,
    //             [field]: userData[field] as string,
    //         }));
    //     }        
    // };

    // const handleCancel = (field: Campo) => {
    //     setUserData(prev => ({ ...prev, [field]: originalData[field] }));
    //     setIsEditable(prev => ({ ...prev, [field]: false }));
    // };

    const handleEditEmail = (): void => {
        setIsEditable(prev => ({ ...prev, email: true }));
        setTimeout(() => {
          emailRef.current?.focus(); // foca no campo
        }, 100);
      };

      const handleCancelEditEmail = () => {
        setIsEditable(prev => ({ ...prev, email: false }));
        setUserData(prev => ({
          ...prev,
          email: originalData.email // volta ao original
        }));
      };
      
      const handleConfirmEditEmail = () => {
        handleUpdateUserData({
          ...userData,
          email: userData.email,
        });
        setIsEditable(prev => ({ ...prev, email: false }));
      };
      
    return (
        <View style={styles.container}>
            <NavigationHeader iconArrow={true} />

            <View style={styles.profileContent}>
                <IconProfile style={styles.profileIcon}></IconProfile>

                <View style={styles.nameRow}>
                <Text style={styles.profileName}>{userData.nome || 'Seu nome'}</Text>
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
                            ref={emailRef}
                            placeholder="E-mail"
                            value={userData.email}
                            onChangeText={(text) => setUserData({...userData, email:text})}
                            editInput={isEditable.email}
                            focusInput={isEditable.email}
                            width={230}
                            height={40}
                        />

                        {!isEditable.email ? (
                            <TouchableOpacity
                                onPress={handleEditEmail}
                            >
                                <EditIcon width={22} height={22} style={[styles.iconSmall, {marginRight: 50}]} />
                            </TouchableOpacity>
                            ) : (
                            <View style={{ flexDirection: 'row', marginBottom:10, marginRight: 15}}>
                                <View>
                                    <TouchableOpacity onPress={handleCancelEditEmail}>
                                        <CalcelAlteration width={30} height={30} />
                                    </TouchableOpacity>
                                </View>

                                <View style={{marginLeft: 10}}>
                                    <TouchableOpacity onPress={handleConfirmEditEmail}>
                                        <ConfirmAlteration width={30} height={30} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            )}
                    </View>
                </View>

                {/* Senha */}
                <View style={{marginBottom:-20, width:'100%'}}>
                    <Text style={styles.label}>Senha</Text>
                    <View style={styles.inputWithIcon}>
                        <Input
                            placeholder="********"
                            placeholderTextColor={themes.colors.textPlaceHolder}
                            secureTextEntry={isPasswordVisible}
                            width={120}
                            height={40}
                            editInput={false}
                            focusInput={false}

                        />
                        <TouchableOpacity>
                            <EditIcon 
                                width={22} 
                                height={22} 
                                style={[styles.iconSmall, {marginRight: 190}]}
                                onPress={()=> navigation.navigate('ForgotPassword')}
                            >   
                            </EditIcon>
                        </TouchableOpacity>
                    </View>
                </View>
                
                {/* Data de Nascimento */}
                <View style={{ marginBottom: -5, width:'100%' }}> 
                    <Text style={styles.label}>Data de Nascimento</Text>
                        <View style={styles.inputWithIcon}>
                            <Input
                                placeholder="XX/XX/XXXX"
                                value={formatDate(userData.data_nascimento)}
                                width={120}
                                height={40}
                                editInput={false}
                                focusInput={false}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    setShowDatePicker(true);
                                    setIsEditable(prev => ({ ...prev, data_nascimento: true }));
                                }}
                            >
                                <EditIcon width={22} height={22} style={[styles.iconSmall, {marginRight: 190}]} />
                            </TouchableOpacity>
                        </View>
                        
                        {showDatePicker && (
                            <DateTimePicker
                                value={dateOfBirth}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
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
                                editInput={isEditable.rua}
                                focusInput={isEditable.rua}
                            />
                            <TouchableOpacity onPress={()=> setIsEditable(prev => ({...prev, rua:true}))}>
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
                                editInput={isEditable.numero}
                                focusInput={isEditable.numero}
                            />
                            <TouchableOpacity onPress={() => setIsEditable(prev => ({...prev, numero:true}))}>
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
                                editInput={isEditable.bairro}
                                focusInput={isEditable.bairro}
                            />
                            <TouchableOpacity onPress={() => setIsEditable(prev => ({...prev, bairro:true}))}>
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
                                editInput={isEditable.estado}
                                focusInput={isEditable.estado}
                            />
                            <TouchableOpacity onPress={() => setIsEditable(prev => ({...prev, estado:true}))}>
                                <EditIcon width={22} height={22} style={styles.iconSmall}></EditIcon>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Botões */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.deleteButton} onPress={() => setShowDeleteModal(true)}>
                        <Text style={styles.deleteText}>Excluir Conta</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.logoutText}>Sair da Conta</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <DeleteAccountModal
                visible={showDeleteModal}
                onCancel={() => setShowDeleteModal(false)}
                onConfirm={() => {
                    setShowDeleteModal(false);
                    handleDeleteAccount();
                }}
            />
        </View>
    );
}
