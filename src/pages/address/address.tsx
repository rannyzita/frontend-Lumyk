import React, { useState, useEffect, useRef } from 'react';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  InteractionManager,
} from 'react-native';

import styles from './styles';
import NavigationHeader from '../../components/NavigationHeader/navigationHeader';
import { themes } from '../../global/themes';

import ModalNovoEndereco from './components/ModalEndereco';
import EnderecoItem from './components/EnderecoItem';
import DropdownEstados from './components/DropdownEstados';

import { formatarEndereco } from '../../utils/formatarEndereco';

import {
  fetchEstados,
  fetchEnderecos,
  adicionarEndereco,
  carregarEnderecoPrioritario,
  salvarEnderecoPrioritario,
  removerEnderecoPorId,
  atualizarEndereco
} from '../../services/EnderecoService'; 

import ArrowDown from './assets/ArrowDown.svg';

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

  const [modoEdicao, setModoEdicao] = useState(false);
  const [enderecoSendoEditado, setEnderecoSendoEditado] = useState<Endereco | null>(null);

  const dropdownButtonRef = useRef<View>(null);
  const [dropdownTop, setDropdownTop] = useState(0);
  const [dropdownLeft, setDropdownLeft] = useState(0);
  const [dropdownWidth, setDropdownWidth] = useState(0);

  const [dropdownAberto, setDropdownAberto] = useState(false);

  useEffect(() => {
    const carregarEstados = async () => {
      try {
        setLoadingEstados(true);
        const data = await fetchEstados();
        setEstados(data);
      } catch (error) {
        console.error('Erro ao buscar estados:', error);
      } finally {
        setLoadingEstados(false);
      }
    };
  
    carregarEstados();
  }, []);

  useEffect(() => {
    const carregarEnderecos = async () => {
      try {
        setLoadingEnderecos(true);
        const data = await fetchEnderecos();
        setEnderecos(data);
      } catch (error) {
        console.error('Erro ao buscar endereços:', error);
      } finally {
        setLoadingEnderecos(false);
      }
    };
  
    carregarEnderecos();
  }, []);

  useEffect(() => {
    const carregarPrioritario = async () => {
      const id = await carregarEnderecoPrioritario();
      if (id) setEnderecoPrioritarioId(id);
    };
  
    carregarPrioritario();
  }, []);

  const abrirDropdown = () => {
    setDropdownAberto(prev => !prev);
    InteractionManager.runAfterInteractions(() => {
      dropdownButtonRef.current?.measureInWindow((x, y, width, height) => {
        setDropdownTop(y + height);
        setDropdownLeft(x);
        setDropdownWidth(width);
      });
    });
  };

  const adicionarEnderecoHandler = async () => {
    if (!bairro || !rua || !numero || !estadoSelecionado) return;
  
    try {
      if (modoEdicao && enderecoSendoEditado) {
        const enderecoAtualizado = {
          ...enderecoSendoEditado,
          rua,
          numero: numero,
          bairro,
          id_estado: estadoSelecionado.id,
        };
  
        await atualizarEndereco(enderecoSendoEditado.id, { ...enderecoAtualizado, numero: Number(numero) });
  
        setEnderecos((prev) =>
          prev.map((e) => (e.id === enderecoSendoEditado.id ? enderecoAtualizado : e))
        );
      } else {
        const novoEndereco = await adicionarEndereco({
          rua,
          numero: numero,
          bairro,
          id_estado: estadoSelecionado.id,
        });
  
        setEnderecos((prev) => [...prev, novoEndereco]);
      }
  
      setModalVisible(false);
      setModoEdicao(false);
      setEnderecoSendoEditado(null);
      setBairro('');
      setRua('');
      setNumero('');
      setEstadoSearch('');
      setEstadoSelecionado(null);
    } catch (error) {
      console.error('Erro ao salvar endereço:', error);
    }
  };  

  const removerEndereco = async (index: number) => {
    const enderecoParaRemover = enderecos[index];
    if (!enderecoParaRemover) return;
  
    try {
      const response = await removerEnderecoPorId(enderecoParaRemover.id);
      
      alert(response.data.mensagem || 'Endereço removido com sucesso');

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

  const selecionarEnderecoPrioritario = async (id: string) => {
    setEnderecoPrioritarioId(id);
    try {
      await salvarEnderecoPrioritario(id);
    } catch (error) {
      console.error('Erro ao salvar endereço selecionado:', error);
    }
  };

  const editarEndereco = (endereco: Endereco) => {
    setModoEdicao(true);
    setEnderecoSendoEditado(endereco);
    setBairro(endereco.bairro);
    setRua(endereco.rua);
    setNumero(endereco.numero.toString());
    const estado = estados.find(e => e.id === endereco.id_estado);
    if (estado) {
      setEstadoSelecionado(estado);
      setEstadoSearch(estado.nome);
    }
    setModalVisible(true);
  };  

  return (
    <>
      <ScrollView contentContainerStyle={{ ...styles.container, flexGrow: 1 }}>
        <NavigationHeader title='ENDEREÇOS' iconArrow={true} />

        <View style={{ width: '90%', marginTop: 20 }}>
          {loadingEnderecos ? (
            <ActivityIndicator color={themes.colors.primary} />
          ) : (
            <>
            <Text style={{
              color: themes.colors.purpleDark, 
              fontWeight: 'bold',
              marginBottom: 4,
            }}>
              Selecione um endereço padrão:
            </Text>
            
            <View style={styles.separatorContainer}>
                <View style={styles.line} />
            </View>
              {enderecos.length === 0 ? (
                <Text style={{ color: themes.colors.purpleDark, fontStyle: 'italic' }}>Nenhum endereço cadastrado.</Text>
              ) : (
                enderecos.map((end, index) => (
                  <EnderecoItem
                    key={end.id}
                    id={end.id}
                    texto={formatarEndereco(end, estados)}
                    selecionado={enderecoPrioritarioId === end.id}
                    onSelecionar={() => selecionarEnderecoPrioritario(end.id)}
                    onRemover={() => removerEndereco(index)}
                    onEditar={() => editarEndereco(end)}
                  />
                ))
              )}
              <View style={{marginTop: -10, marginBottom: 15}}>
                <View style={styles.line} />
              </View>

              <TouchableOpacity onPress={() => setModalVisible(true)} style={{ marginTop: 15 }}>
                <Text style={styles.adicionarTexto}>Adicionar Endereço</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      <ModalNovoEndereco
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setModoEdicao(false);
          setEnderecoSendoEditado(null);
        }}
        bairro={bairro}
        rua={rua}
        numero={numero}
        estadoSelecionadoNome={estadoSelecionado?.nome}
        onChangeBairro={setBairro}
        onChangeRua={setRua}
        onChangeNumero={setNumero}
        onOpenDropdown={abrirDropdown}
        onSalvar={adicionarEnderecoHandler}
        dropdownButtonRef={dropdownButtonRef}
        modoEdicao={modoEdicao}
      />

      <DropdownEstados
        visible={dropdownVisible}
        onClose={() => setDropdownVisible(false)}
        estados={estados}
        loading={loadingEstados}
        search={estadoSearch}
        onChangeSearch={(text) => {
          setEstadoSearch(text);
          setEstadoSelecionado(null);
        }}
        estadoSelecionado={estadoSelecionado}
        onSelecionar={(estado) => {
          setEstadoSelecionado(estado);
          setEstadoSearch(estado.nome);
          setDropdownVisible(false);
        }}
        position={{ top: dropdownTop, left: dropdownLeft, width: dropdownWidth }}
      />
    </>
  );
}
