import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../API';

interface Endereco {
    rua: string;
    numero: number;
    bairro: string;
    id_estado: string;
}
export async function fetchEstados() {
    const token = await AsyncStorage.getItem('userToken');
    const headers = { Authorization: `Bearer ${token}` };
    const { data } = await api.get('/estados/', { headers });
    return data;
}

export async function fetchEnderecos() {
    const token = await AsyncStorage.getItem('userToken');
    const headers = { Authorization: `Bearer ${token}` };
    const { data } = await api.get('/enderecos/', { headers });
    return data;
}

export async function adicionarEndereco(payload: {
    rua: string;
    numero: string;
    bairro: string;
    id_estado: string;
}) {
    const token = await AsyncStorage.getItem('userToken');
    const headers = { Authorization: `Bearer ${token}` };
    const { data } = await api.post('/enderecos/', payload, { headers });
    return data;
}

export async function removerEnderecoPorId(id: string) {
    const token = await AsyncStorage.getItem('userToken');
    const headers = { Authorization: `Bearer ${token}` };

    const response = await api.delete(`/enderecos/${id}`, { headers });
    return response; 
}

export async function salvarEnderecoPrioritario(id: string) {
    await AsyncStorage.setItem('enderecoSelecionadoId', id);
}

export async function carregarEnderecoPrioritario() {
    return await AsyncStorage.getItem('enderecoSelecionadoId');
}

export async function atualizarEndereco (id: string, enderecoAtualizado: Partial<Endereco>) {
    const token = await AsyncStorage.getItem('userToken');
    const headers = { Authorization: `Bearer ${token}` };
    const { data } = await api.put(`/enderecos/${id}`, enderecoAtualizado, { headers });
    return data;
}
