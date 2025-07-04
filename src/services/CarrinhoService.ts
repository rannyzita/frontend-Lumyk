
import api from '../../API/index'; 

export async function criarCarrinho(token: string) {
    return await api.post('/carrinhos/', {}, {
        headers: { Authorization: `Bearer ${token}` },
    });
}

export async function buscarCarrinho(token: string) {
    const { data } = await api.get('/carrinhos/', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data[0]; 
}