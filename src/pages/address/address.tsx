import React, { useState, useRef } from 'react';
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
} from 'react-native';

import styles from './styles';
import NavigationHeader from '../../components/NavigationHeader/navigationHeader';
import Trash from './assets/Trash.svg';
import ArrowDown from './assets/arrowdown.svg';
import Close from './assets/Close.svg';
import { themes } from '../../global/themes';   

export default function Address() {
  const [modalVisible, setModalVisible] = useState(false);
  const [estadoDropdownVisible, setEstadoDropdownVisible] = useState(false);

  const [bairro, setBairro] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [estado, setEstado] = useState('');
  const [estadoSearch, setEstadoSearch] = useState('');
  const [enderecos, setEnderecos] = useState<string[]>([]);

  const estados = ['Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará'];

  const dropdownButtonRef = useRef<View>(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [dropdownWidth, setDropdownWidth] = useState(0);

  const abrirDropdown = () => {
    dropdownButtonRef.current?.measureInWindow((x, y, width, height) => {
      setDropdownTop(y + height);
      setDropdownLeft(x);
      setDropdownWidth(width);
      setEstadoDropdownVisible(true);
    });
  };

  const adicionarEndereco = () => {
    if (!bairro || !rua || !numero || !estado) return;

    const novo = `${rua}, ${numero}, ${bairro}, ${estado}`;
    setEnderecos([...enderecos, novo]);
    setModalVisible(false);
    setBairro('');
    setRua('');
    setNumero('');
    setEstado('');
    setEstadoSearch('');
  };

  const removerEndereco = (index: number) => {
    const copia = [...enderecos];
    copia.splice(index, 1);
    setEnderecos(copia);
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ ...styles.container, flexGrow: 1 }}>
        <NavigationHeader title="MEU ENDEREÇO E ESTADO" iconArrow={true} />

        <View style={{ width: '90%', marginTop: 20 }}>
          {enderecos.map((end, index) => (
            <View key={index} style={styles.enderecoItem}>
              <View style={{ flex: 1 }}>
                <Text style={styles.enderecoText}>{end}</Text>
              </View>
              <TouchableOpacity onPress={() => removerEndereco(index)}>
                <Trash width={20} height={20} />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.adicionarTexto}>Adicionar Endereço</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal principal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.modalOverlay}>
            <KeyboardAvoidingView behavior="padding" style={styles.modalContent}>
              {/* Botão de fechar */}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
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
                  placeholder="XXX"
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
                <Text style={styles.dropdownText}>{estado || 'Estado'}</Text>
                <ArrowDown
                  style={{
                    transform: [{ rotate: estadoDropdownVisible ? '180deg' : '0deg' }],
                  }}
                  width={16}
                  height={16}
                />
              </TouchableOpacity>

              <TouchableOpacity style={styles.salvarButton} onPress={adicionarEndereco}>
                <Text style={styles.salvarButtonText}>Salvar</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Dropdown modal separado */}
      <Modal visible={estadoDropdownVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={() => setEstadoDropdownVisible(false)}>
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
              <TextInput
                style={styles.dropdownSearchInput}
                placeholder="UF de envio..."
                placeholderTextColor={themes.colors.textInput}
                value={estadoSearch}
                onChangeText={setEstadoSearch}
                autoFocus
              />
              <FlatList
                data={estados.filter((nome) =>
                  nome.toLowerCase().includes(estadoSearch.toLowerCase())
                )}
                keyExtractor={(item) => item}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setEstado(item); // apenas seta, não fecha o modal
                    }}
                    style={styles.dropdownItem}
                  >
                    <Text style={{ flex: 1 }}>{item}</Text>
                    <View
                      style={[
                        styles.checkbox,
                        estado === item && styles.checkboxSelected,
                      ]}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
}
