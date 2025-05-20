import React, { useState, useEffect, useRef} from "react";
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, SafeAreaView, Platform } from 'react-native';

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

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type UserData = {
    nome: string;
    email: string;
    data_nascimento: string;
    rua: string;
    numero: string;
    bairro: string;
    id_estado: string;
    id_usuario: string;
    id_endereco: string;
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
        id_estado: '',
        id_usuario: '',
        id_endereco: ''
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

    const handleUpdateUserData = async (updatedUserData: typeof userData) => {
        const { token, userId } = await getTokenAndUserId();
    
        try {
            // Atualiza dados do usuário
            await api.put(`/usuarios/${userId}/atualizar`, {
                nome: updatedUserData.nome,
                email: updatedUserData.email,
                data_nascimento: updatedUserData.data_nascimento,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
    
            // Monta os dados do endereço
            const enderecoData = {
                id_estado: updatedUserData.id_estado,
                id_usuario: userId,
                numero: parseInt(updatedUserData.numero),
                bairro: updatedUserData.bairro,
                rua: updatedUserData.rua,
            };
    
            if (updatedUserData.id_endereco) {
                // Atualiza endereço existente
                await api.put(`/enderecos/${updatedUserData.id_endereco}`, enderecoData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                // Cria novo endereço
                const response = await api.post('/enderecos/', enderecoData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                const novoEnderecoId = response.data.id; 
    
                updatedUserData.id_endereco = novoEnderecoId;
            }
    
            setOriginalData({ ...updatedUserData });
    
        } catch (error) {
            console.error('Erro ao atualizar dados e endereço:', error);
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
    
    const handleEditNome = () => {
        setIsEditable(prev => ({ ...prev, nome: true }));
        setTimeout(() => {
            nomeRef.current?.focus();
        }, 300);
    };

    const handleCancelEditNome = () => {
        setIsEditable(prev => ({ ...prev, nome: false }));
        setUserData(prev => ({
            ...prev,
            nome: originalData.nome
        }));
    };

    const handleConfirmEditNome = () => {
        handleUpdateUserData({
            ...userData,
            nome: userData.nome
        });
        setIsEditable(prev => ({ ...prev, nome: false }));
    };

    const handleEditEmail = (): void => {
        setIsEditable(prev => ({ ...prev, email: true }));
        setTimeout(() => {
            emailRef.current?.focus(); 
        }, 300);
    };

    const handleCancelEditEmail = () => {
        setIsEditable(prev => ({ ...prev, email: false }));
        setUserData(prev => ({
            ...prev,
            email: originalData.email 
        }));
    };

    const handleConfirmEditEmail = () => {
        handleUpdateUserData({
            ...userData,
            email: userData.email,
        });
        setIsEditable(prev => ({ ...prev, email: false }));
    };

        // RUA
    const handleEditRua = () => {
        setIsEditable(prev => ({ ...prev, rua: true }));
        setTimeout(() => {
            ruaRef.current?.focus();
        }, 300);
    };

    const handleCancelEditRua = () => {
        setIsEditable(prev => ({ ...prev, rua: false }));
        setUserData(prev => ({
            ...prev,
            rua: originalData.rua
        }));
    };

    const handleConfirmEditRua = () => {
        handleUpdateUserData(userData);
        setIsEditable(prev => ({ ...prev, rua: false }));
    };

    // NÚMERO
    const handleEditNumero = () => {
        setIsEditable(prev => ({ ...prev, numero: true }));
        setTimeout(() => {
            ruaRef.current?.focus();
        }, 300);
    };

    const handleCancelEditNumero = () => {
        setIsEditable(prev => ({ ...prev, numero: false }));
        setUserData(prev => ({
            ...prev,
            numero: originalData.numero
        }));
    };

    const handleConfirmEditNumero = () => {
        handleUpdateUserData(userData);
        setIsEditable(prev => ({ ...prev, numero: false }));
    };

    // BAIRRO
    const handleEditBairro = () => {
        setIsEditable(prev => ({ ...prev, bairro: true }));
        setTimeout(() => {
            ruaRef.current?.focus();
        }, 300);
    };

    const handleCancelEditBairro = () => {
        setIsEditable(prev => ({ ...prev, bairro: false }));
        setUserData(prev => ({
            ...prev,
            bairro: originalData.bairro
        }));
    };

    const handleConfirmEditBairro = () => {
        handleUpdateUserData(userData);
        setIsEditable(prev => ({ ...prev, bairro: false }));
    };

    // ESTADO
    const handleEditEstado = () => {
        setIsEditable(prev => ({ ...prev, estado: true }));
        setTimeout(() => {
            ruaRef.current?.focus();
        }, 300);
    };

    const handleCancelEditEstado = () => {
        setIsEditable(prev => ({ ...prev, estado: false }));
        setUserData(prev => ({
            ...prev,
            id_estado: originalData.id_estado
        }));
    };

    const handleConfirmEditEstado = () => {
        handleUpdateUserData(userData);
        setIsEditable(prev => ({ ...prev, estado: false }));
    };

    return (
        <SafeAreaView style={styles.safeArea}>

            <NavigationHeader iconArrow={true} />
        
            <KeyboardAvoidingView 
                style={styles.keyboardView}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -30}
            >
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={true}
                    keyboardDismissMode="on-drag"
                    enableOnAndroid={true}
                >
                    <View style={styles.container}>
                        <View style={styles.profileContent}>
                            <IconProfile style={styles.profileIcon}></IconProfile>

                            <View style={styles.nameRow}>
                                {isEditable.nome ? (
                                    <>
                                        <TextInput
                                            ref={nomeRef}
                                            style={[
                                                styles.profileName,
                                            {
                                                flexShrink: 1,
                                                borderBottomWidth: 1,
                                                borderColor: '#ccc',
                                                padding: 0,
                                                backgroundColor: 'transparent',
                                            },
                                                ]}
                                            value={userData.nome}
                                            onChangeText={(text) => setUserData({ ...userData, nome: text })}
                                            editable={true}
                                        />
                                        <TouchableOpacity onPress={handleCancelEditNome}>
                                            <CalcelAlteration width={30} height={30} />
                                        </TouchableOpacity>

                                        <View style={{marginLeft: 10}}>
                                            <TouchableOpacity onPress={handleConfirmEditNome}>
                                                <ConfirmAlteration width={30} height={30} />
                                            </TouchableOpacity>
                                        </View>
                                    </>
                                ) : (
                                    <>
                                        <Text style={styles.profileName}>{userData.nome || 'Seu nome'}</Text>
                                        <TouchableOpacity onPress={handleEditNome}>
                                            <EditIconPurple style={{marginBottom:3}} width={30} height={30} />
                                        </TouchableOpacity>
                                    </>
                                )}
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
                                        height={38}
                                    />

                                    {!isEditable.email ? (
                                        <TouchableOpacity
                                            onPress={handleEditEmail}
                                        >
                                            <EditIcon width={22} height={22} style={styles.iconSmall} />
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
                                        height={38}
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
                                            height={38}
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
                            
                            <View style={[styles.section, {marginTop:10}]}>
                                <Text style={styles.label}>Rua</Text>
                                <View style={styles.inputWithIcon}>
                                    <Input
                                        ref={ruaRef}
                                        placeholder="Sua rua"
                                        value={userData.rua}
                                        onChangeText={(text) => setUserData({...userData, rua:text})}
                                        width={230}
                                        height={38}
                                        editInput={isEditable.rua}
                                        focusInput={isEditable.rua}
                                    />

                                    {!isEditable.rua ? (
                                        <TouchableOpacity
                                            onPress={handleEditRua}
                                        >
                                            <EditIcon width={22} height={22} style={styles.iconSmall} />
                                        </TouchableOpacity>
                                        ) : (
                                        <View style={{ flexDirection: 'row', marginBottom:10, marginRight: 15}}>
                                            <View>
                                                <TouchableOpacity onPress={handleCancelEditRua}>
                                                    <CalcelAlteration width={30} height={30} />
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{marginLeft: 10}}>
                                                <TouchableOpacity onPress={handleConfirmEditRua}>
                                                    <ConfirmAlteration width={30} height={30} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        )}
                                </View>
                            </View>

                            <View style={[styles.section, {marginTop:10}]}>
                                <Text style={styles.label}>Número</Text>
                                <View style={styles.inputWithIcon}>
                                    <Input
                                        ref={numeroRef}
                                        placeholder="Seu número"
                                        value={userData.numero}
                                        onChangeText={(text) => setUserData({...userData, numero:text})}
                                        width={150}
                                        height={38}
                                        editInput={isEditable.numero}
                                        focusInput={isEditable.numero}
                                    />

                                    {!isEditable.numero ? (
                                        <TouchableOpacity
                                            onPress={handleEditNumero}
                                        >
                                            <EditIcon width={22} height={22} style={[styles.iconSmall, {marginRight:150}]} />
                                        </TouchableOpacity>
                                        ) : (
                                        <View style={{ flexDirection: 'row', marginBottom:10, marginRight: 80}}>
                                            <View>
                                                <TouchableOpacity onPress={handleCancelEditNumero}>
                                                    <CalcelAlteration width={30} height={30}/>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{marginLeft: 10}}>
                                                <TouchableOpacity onPress={handleConfirmEditNumero}>
                                                    <ConfirmAlteration width={30} height={30}/>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        )}
                                </View>
                            </View>

                            <View style={[styles.section, {marginTop:10}]}>
                                <Text style={styles.label}>Bairro</Text>
                                <View style={styles.inputWithIcon}>
                                    <Input
                                        ref={bairroRef}
                                        placeholder="Seu bairro"
                                        value={userData.bairro}
                                        onChangeText={(text) => setUserData({...userData, bairro:text})}
                                        width={150}
                                        height={38}
                                        editInput={isEditable.bairro}
                                        focusInput={isEditable.bairro}
                                    />

                                    {!isEditable.bairro ? (
                                        <TouchableOpacity
                                            onPress={handleEditBairro}
                                        >
                                            <EditIcon width={22} height={22} style={[styles.iconSmall, {marginRight:150}]} />
                                        </TouchableOpacity>
                                        ) : (
                                        <View style={{ flexDirection: 'row', marginBottom:10, marginRight: 80}}>
                                            <View>
                                                <TouchableOpacity onPress={handleCancelEditBairro}>
                                                    <CalcelAlteration width={30} height={30}/>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{marginLeft: 10}}>
                                                <TouchableOpacity onPress={handleConfirmEditBairro}>
                                                    <ConfirmAlteration width={30} height={30}/>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        )}
                                </View>
                            </View>

                            <View style={[styles.section, {marginTop:10}]}>
                                <Text style={styles.label}>Estado</Text>
                                <View style={styles.inputWithIcon}>
                                    <Input
                                        ref={estadoRef}
                                        placeholder="Seu estado"
                                        value={userData.id_estado}
                                        onChangeText={(text) => setUserData({...userData, id_estado:text})}
                                        width={150}
                                        height={38}
                                        editInput={isEditable.estado}
                                        focusInput={isEditable.estado}
                                    />

                                    {!isEditable.estado ? (
                                        <TouchableOpacity
                                            onPress={handleEditEstado}
                                        >
                                            <EditIcon width={22} height={22} style={[styles.iconSmall, {marginRight:150}]} />
                                        </TouchableOpacity>
                                        ) : (
                                        <View style={{ flexDirection: 'row', marginBottom:10, marginRight: 80}}>
                                            <View>
                                                <TouchableOpacity onPress={handleCancelEditEstado}>
                                                    <CalcelAlteration width={30} height={30}/>
                                                </TouchableOpacity>
                                            </View>

                                            <View style={{marginLeft: 10}}>
                                                <TouchableOpacity onPress={handleConfirmEditEstado}>
                                                    <ConfirmAlteration width={30} height={30}/>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        )}
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
                    <View style={{ height: 50 }} />
                </KeyboardAwareScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
