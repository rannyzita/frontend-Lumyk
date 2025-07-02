import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
  ActivityIndicator,
  InteractionManager,
} from 'react-native';

import styles from './styles';
import NavigationHeader from '../../components/NavigationHeader/navigationHeader';
import Trash from './assets/Trash.svg';
import Close from './assets/Close.svg';
import { themes } from '../../global/themes';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../API';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Estado {
  id: string;
  nome: string;
}

interface Endereco {
  id: string;
  rua: string;
  bairro: string;
  numero: string;
  id_estado: string;
}

export default function Address() {
  const navigation = useNavigation();
  const route = useRoute<any>(); // tipar corretamente se quiser mais seguro

  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loadingEstados, setLoadingEstados] = useState(false);
  const [loadingEnderecos, setLoadingEnderecos] = useState(false);

  const [bairro, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [estadoSearch, setEstadoSearch] = useState('');
  const [estadoSelecionado, setEstadoSelecionado] = useState<Estado | null>(null);

  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [estados, setEstados] = useState<Estado[]>([]);

  const [enderecoPrioritarioId, setEnderecoPrioritarioId] = useState<string | null>(null);

  const dropdownButtonRef = useRef<View>(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [dropdownWidth, setDropdownWidth] = useState(0);

  useEffect(() => {
    const fetchEstados = async () => {
      try {
        setLoadingEstados(true);
        const token = await AsyncStorage.getItem('userToken');
        const headers = { Authorization: `Bearer ${token}` };
        const { data } = await api.get('/estados/', { headers });
        setEstados(data);
      } catch (error) {
        console.error('Erro ao buscar estados:', error);
      } finally {
        setLoadingEstados(false);
      }
    };

    fetchEstados();
  }, []);

  useEffect(() => {
    const fetchEnderecos = async () => {
      try {
        setLoadingEnderecos(true);
        const token = await AsyncStorage.getItem('userToken');
        const headers = { Authorization: `Bearer ${token}` };
        const { data } = await api.get('/enderecos/', { headers });

        setEnderecos(data);
      } catch (error) {
        console.error('Erro ao buscar endereços:', error);
      } finally {
        setLoadingEnderecos(false);
      }
    };

    fetchEnderecos();
  }, []);

  useEffect(() => {
    const carregarEnderecoSelecionadoId = async () => {
      try {
        const idSalvo = await AsyncStorage.getItem('enderecoSelecionadoId');
        if (idSalvo) {
          setEnderecoPrioritarioId(idSalvo);
        }
      } catch (error) {
        console.error('Erro ao carregar endereço selecionado:', error);
      }
    };
  
    carregarEnderecoSelecionadoId();
  }, []);

  const abrirDropdown = () => {
    setDropdownVisible(true);
    InteractionManager.runAfterInteractions(() => {
      dropdownButtonRef.current?.measureInWindow((x, y, width, height) => {
        setDropdownTop(y + height);
        setDropdownLeft(x);
        setDropdownWidth(width);
      });
    });
  };

  const adicionarEndereco = async () => {
    if (!bairro || !rua || !numero || !estadoSelecionado) return;

    try {
      const token = await AsyncStorage.getItem('userToken');
      const headers = { Authorization: `Bearer ${token}` };

      const payload = {
        rua,
        numero: Number(numero),
        bairro,
        id_estado: estadoSelecionado.id,
      };

      const { data } = await api.post('/enderecos/', payload, { headers });

      setEnderecos((prev) => [...prev, data]);

      setModalVisible(false);
      setBairro('');
      setRua('');
      setNumero('');
      setEstadoSearch('');
      setEstadoSelecionado(null);
    } catch (error) {
      console.error('Erro ao adicionar endereço:', error);
    }
  };

  const removerEndereco = async (index: number) => {
    const enderecoParaRemover = enderecos[index];
    if (!enderecoParaRemover) return;

    try {
      const token = await AsyncStorage.getItem('userToken');
      const headers = { Authorization: `Bearer ${token}` };

      await api.delete(`/enderecos/${enderecoParaRemover.id}`, { headers });

      const copia = [...enderecos];
      copia.splice(index, 1);
      setEnderecos(copia);

      if (enderecoPrioritarioId === enderecoParaRemover.id) {
        setEnderecoPrioritarioId(null);
      }
    } catch (error) {
      console.error('Erro ao remover endereço:', error);
    }
  };

  const formatarEndereco = (end: Endereco) => {
    const partes = [
      end.rua?.trim(),
      end.numero?.toString(),
      end.bairro?.trim(),
      estados.find((e) => e.id === end.id_estado)?.nome,
    ].filter(Boolean);

    return partes.join(', ');
  };

  const selecionarEnderecoPrioritario = async (id: string) => {
    setEnderecoPrioritarioId(id);
    try {
      await AsyncStorage.setItem('enderecoSelecionadoId', id);
    } catch (error) {
      console.error('Erro ao salvar endereço selecionado:', error);
    }
  };  

  return (
    <>
      <ScrollView contentContainerStyle={{ ...styles.container, flexGrow: 1 }}>
        <NavigationHeader title="ENDEREÇOS" iconArrow={true} />

        <View style={{ width: '90%', marginTop: 20 }}>
          {loadingEnderecos ? (
            <ActivityIndicator color={themes.colors.primary} />
          ) : (
            <>
            <Text style={{color: themes.colors.purpleDark}}>Selecione um endereço padrão:</Text>
            <View style={styles.separatorContainer}>
                <View style={styles.line} />
            </View>
              {enderecos.length === 0 ? (
                <Text style={{ color: '#999', fontStyle: 'italic' }}>Nenhum endereço cadastrado.</Text>
              ) : (
                enderecos.map((end, index) => (
                  <View key={end.id} style={styles.enderecoItem}>
                    {/* Checkbox ampliado */}
                    <TouchableOpacity
                      onPress={() => selecionarEnderecoPrioritario(end.id)}
                      style={[
                        styles.checkbox,
                        { width: 28, height: 28, marginRight: 10 },
                        enderecoPrioritarioId === end.id && styles.checkboxSelected,
                      ]}
                    />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.enderecoText}>{formatarEndereco(end)}</Text>
                    </View>
                    <TouchableOpacity onPress={() => removerEndereco(index)}>
                      <Trash width={20} height={20} />
                    </TouchableOpacity>
                  </View>
                ))
              )}
              <View style={styles.separatorContainer}>
                <View style={styles.line} />
              </View>
              <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginTop: 15 }}>
                <Text style={styles.adicionarTexto}>Adicionar Endereço</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      {/* Modal principal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior="padding" style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Close width={20} height={20} />
              </TouchableOpacity>

              <Text style={styles.modalTitle}>Criando Novo Endereço</Text>

              <TextInput
                placeholder="Seu bairro"
                style={styles.input}
                value={bairro}
                onChangeText={setBairro}
              />

              <View style={styles.row}>
                <TextInput
                  placeholder="Sua rua"
                  style={[styles.input, { flex: 2 }]}
                  value={rua}
                  onChangeText={setRua}
                />
                <TextInput
                  placeholder="Nº"
                  style={[styles.input, { flex: 1, marginLeft: 10 }]}
                  value={numero}
                  onChangeText={setNumero}
                  keyboardType="numeric"
                />
              </View>

              <TouchableOpacity
                ref={dropdownButtonRef}
                style={styles.dropdownButton}
                onPress={abrirDropdown}
                activeOpacity={0.8}
              >
                <Text style={styles.dropdownText}>
                  {estadoSelecionado?.nome || 'Estado'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.salvarButton} onPress={adicionarEndereco}>
                <Text style={styles.salvarButtonText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal de estados */}
      <Modal visible={dropdownVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.dropdownModalOverlay}>
            <View
              style={[
                styles.dropdownModalContent,
                {
                  top: dropdownTop,
                  left: dropdownLeft,
                  width: dropdownWidth,
                },
              ]}
            >
              {/* X preto */}
              <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={() => setDropdownVisible(false)}>
                  <Text style={{ fontSize: 20, color: '#000', fontWeight: 'bold', marginBottom: 5 }}>X</Text>
                </TouchableOpacity>
              </View>

              {loadingEstados ? (
                <ActivityIndicator color={themes.colors.primary} />
              ) : (
                <>
                  <TextInput
                    style={styles.dropdownSearchInput}
                    placeholder="UF de envio..."
                    placeholderTextColor={themes.colors.textInput}
                    value={estadoSearch}
                    onChangeText={(text) => {
                      setEstadoSearch(text);
                      setEstadoSelecionado(null);
                    }}
                    autoFocus
                  />
                  <FlatList
                    data={estados.filter((e) =>
                      e.nome.toLowerCase().includes(estadoSearch.toLowerCase())
                    )}
                    keyExtractor={(item) => item.id}
                    keyboardShouldPersistTaps="handled"
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          setEstadoSelecionado(item);
                          setEstadoSearch(item.nome);
                          setDropdownVisible(false);
                        }}
                        style={styles.dropdownItem}
                      >
                        <Text style={{ flex: 1 }}>{item.nome}</Text>
                        <View style={styles.checkbox}>
                          {estadoSelecionado?.id === item.id && <View style={styles.checkboxSelectedInner} />}
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                  <TouchableOpacity
                    style={[styles.salvarButton, { marginTop: 12 }]}
                    onPress={() => setDropdownVisible(false)}
                  >
                    <Text style={styles.salvarButtonText}>Selecionar</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
