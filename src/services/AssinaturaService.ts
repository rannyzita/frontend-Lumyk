import api from '../../API/index'; 
export async function buscarAssinatura(token: string) {
    const { data } = await api.get('/assinaturas/', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
}
