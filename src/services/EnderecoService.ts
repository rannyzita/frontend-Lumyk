import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../API';

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
    numero: number;
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
    await api.delete(`/enderecos/${id}`, { headers });
}
